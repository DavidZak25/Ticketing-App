import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import Stripe from "stripe";
import { db } from "../lib/firestore";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripe =
  stripeSecretKey && stripeWebhookSecret
    ? new Stripe(stripeSecretKey, {
        apiVersion: "2023-10-16",
      })
    : null;

/**
 * HTTP webhook endpoint for Stripe payment events.
 * Verifies signature, locates the order by paymentIntentId, and updates
 * orderStatus/paymentStatus on success or failure.
 * Does not generate tickets.
 */
export const stripeWebhook = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const signature = req.headers["stripe-signature"];
  if (!signature || typeof signature !== "string") {
    res.status(401).send("Missing Stripe-Signature header");
    return;
  }

  // Use rawBody for signature verification (required by Stripe).
  // Firebase Functions may provide rawBody; if not, body must be unparsed.
  const rawBody = (req as any).rawBody;
  if (!rawBody) {
    functions.logger.error("Webhook raw body not available");
    res.status(500).send("Webhook configuration error");
    return;
  }

  if (!stripe || !stripeWebhookSecret) {
    functions.logger.error("Stripe or STRIPE_WEBHOOK_SECRET not configured");
    res.status(500).send("Server configuration error");
    return;
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      stripeWebhookSecret
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    functions.logger.warn("Webhook signature verification failed", { message });
    res.status(401).send(`Webhook Error: ${message}`);
    return;
  }

  const eventType = event.type;

  // Only handle payment_intent events for MVP
  if (
    eventType !== "payment_intent.succeeded" &&
    eventType !== "payment_intent.payment_failed" &&
    eventType !== "payment_intent.canceled"
  ) {
    res.status(200).send("OK");
    return;
  }

  const paymentIntent = event.data.object as Stripe.PaymentIntent;
  const paymentIntentId = paymentIntent.id;

  if (!paymentIntentId) {
    functions.logger.warn("PaymentIntent id missing in event", { eventType });
    res.status(200).send("OK");
    return;
  }

  // Find order by paymentIntentId
  const ordersSnap = await db
    .collection("orders")
    .where("paymentIntentId", "==", paymentIntentId)
    .limit(2)
    .get();

  if (ordersSnap.empty) {
    functions.logger.info("No order found for PaymentIntent", {
      paymentIntentId,
      eventType,
    });
    res.status(200).send("OK");
    return;
  }

  if (ordersSnap.size > 1) {
    functions.logger.error("Multiple orders for same PaymentIntent", {
      paymentIntentId,
    });
    res.status(500).send("Internal error");
    return;
  }

  const orderDoc = ordersSnap.docs[0];
  const orderRef = orderDoc.ref;
  const orderData = orderDoc.data();

  if (eventType === "payment_intent.succeeded") {
    const orderStatus = orderData.orderStatus;
    const paymentStatus = orderData.paymentStatus;

    if (orderStatus === "completed" && paymentStatus === "succeeded") {
      res.status(200).send("OK");
      return;
    }

    const validPrePayment =
      (orderStatus === "created" || orderStatus === "awaiting_payment") &&
      paymentStatus === "pending";

    if (!validPrePayment) {
      functions.logger.info("Order not in valid pre-payment state, skipping", {
        orderId: orderDoc.id,
        orderStatus,
        paymentStatus,
      });
      res.status(200).send("OK");
      return;
    }

    await orderRef.update({
      paymentStatus: "succeeded",
      orderStatus: "completed",
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).send("OK");
    return;
  }

  // payment_intent.payment_failed or payment_intent.canceled
  if (orderData.paymentStatus === "failed") {
    res.status(200).send("OK");
    return;
  }
  // Do not overwrite an already successful order (e.g. delayed failure webhook)
  if (
    orderData.orderStatus === "completed" &&
    orderData.paymentStatus === "succeeded"
  ) {
    res.status(200).send("OK");
    return;
  }

  await orderRef.update({
    paymentStatus: "failed",
    orderStatus: "cancelled",
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  res.status(200).send("OK");
});
