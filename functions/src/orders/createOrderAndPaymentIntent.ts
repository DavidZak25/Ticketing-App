import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { db } from "../lib/firestore";
import { MAX_TICKETS_PER_ORDER } from "../lib/constants";
import Stripe from "stripe";

type SelectedItemInput = {
  ticketTypeId?: unknown;
  quantity?: unknown;
};

type CreateOrderInput = {
  eventId?: unknown;
  selectedItems?: unknown;
};

const MAX_SELECTED_ITEMS = 20;

// For MVP we assume event ticket prices are stored in major currency units
// (e.g. 49.9 ILS). Stripe requires amounts in the smallest currency unit
// (e.g. 4990 agorot), so we explicitly convert by multiplying by 100.
const STRIPE_AMOUNT_MULTIPLIER = 100;

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  // In production you should configure this env var.
  console.warn("STRIPE_SECRET_KEY is not set. Stripe calls will fail.");
}

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    })
  : null;

export const createOrderAndPaymentIntent = functions.https.onCall(
  async (data: CreateOrderInput, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "You must be authenticated to create an order."
      );
    }

    const uid = context.auth.uid;

    if (typeof data !== "object" || data === null) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Data must be an object."
      );
    }

    if (typeof data.eventId !== "string") {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "eventId is required and must be a string."
      );
    }
    const eventId = data.eventId.trim();
    if (!eventId) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "eventId must be a non-empty string."
      );
    }

    if (!Array.isArray(data.selectedItems) || data.selectedItems.length === 0) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "selectedItems must be a non-empty array."
      );
    }

    const selectedItems = data.selectedItems as SelectedItemInput[];
    if (selectedItems.length > MAX_SELECTED_ITEMS) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        `selectedItems must contain at most ${MAX_SELECTED_ITEMS} items.`
      );
    }

    // Validate selectedItems structure
    const seenTicketTypeIds = new Set<string>();
    const normalizedSelectedItems = selectedItems.map((item, index) => {
      const indexLabel = `selectedItems[${index}]`;

      if (typeof item !== "object" || item === null) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          `${indexLabel} must be an object.`
        );
      }

      if (typeof item.ticketTypeId !== "string") {
        throw new functions.https.HttpsError(
          "invalid-argument",
          `${indexLabel}.ticketTypeId is required and must be a string.`
        );
      }
      const ticketTypeId = item.ticketTypeId.trim();
      if (!ticketTypeId) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          `${indexLabel}.ticketTypeId must be a non-empty string.`
        );
      }
      if (seenTicketTypeIds.has(ticketTypeId)) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          `Duplicate ticketTypeId '${ticketTypeId}' is not allowed.`
        );
      }
      seenTicketTypeIds.add(ticketTypeId);

      if (
        typeof item.quantity !== "number" ||
        !Number.isInteger(item.quantity) ||
        item.quantity <= 0
      ) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          `${indexLabel}.quantity must be a positive integer.`
        );
      }

      return {
        ticketTypeId,
        quantity: item.quantity,
      };
    });

    // Load event and ensure it's published
    const eventSnap = await db.collection("events").doc(eventId).get();
    if (!eventSnap.exists) {
      throw new functions.https.HttpsError(
        "not-found",
        "Event does not exist."
      );
    }

    const eventData = eventSnap.data() as any;
    if (eventData.status !== "published") {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Only published events can be purchased."
      );
    }

    const organizerProfileId = eventData.organizerProfileId as string | undefined;
    if (!organizerProfileId || typeof organizerProfileId !== "string") {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Event has an invalid organizerProfileId."
      );
    }

    const ticketTypes = eventData.ticketTypes as any[];
    if (!Array.isArray(ticketTypes) || ticketTypes.length === 0) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Event has no ticket types."
      );
    }

    const ticketTypeMap = new Map<string, any>();
    for (const tt of ticketTypes) {
      if (tt && typeof tt.id === "string") {
        ticketTypeMap.set(tt.id, tt);
      }
    }

    // Validate selected ticket types against event and calculate totals
    let ticketsCount = 0;
    let amountTotalMajorUnits = 0;
    let currency: string | null = null;

    const orderItems = normalizedSelectedItems.map((item, index) => {
      const indexLabel = `selectedItems[${index}]`;
      const tt = ticketTypeMap.get(item.ticketTypeId);
      if (!tt) {
        throw new functions.https.HttpsError(
          "failed-precondition",
          `${indexLabel}.ticketTypeId '${item.ticketTypeId}' does not exist on this event.`
        );
      }

      if (tt.status !== "active") {
        throw new functions.https.HttpsError(
          "failed-precondition",
          `${indexLabel}.ticketTypeId '${item.ticketTypeId}' is not active.`
        );
      }

      const capacity = typeof tt.capacity === "number" ? tt.capacity : 0;
      const sold = typeof tt.sold === "number" ? tt.sold : 0;
      if (capacity - sold < item.quantity) {
        throw new functions.https.HttpsError(
          "failed-precondition",
          `Not enough capacity for ticket type '${item.ticketTypeId}'.`
        );
      }

      if (
        typeof tt.price !== "number" ||
        !isFinite(tt.price) ||
        tt.price < 0
      ) {
        throw new functions.https.HttpsError(
          "failed-precondition",
          `Ticket type '${item.ticketTypeId}' has an invalid price.`
        );
      }

      if (typeof tt.currency !== "string" || !tt.currency.trim()) {
        throw new functions.https.HttpsError(
          "failed-precondition",
          `Ticket type '${item.ticketTypeId}' has an invalid currency.`
        );
      }

      const ttCurrency = tt.currency.trim();
      if (currency === null) {
        currency = ttCurrency;
      } else if (currency !== ttCurrency) {
        throw new functions.https.HttpsError(
          "failed-precondition",
          "Selected ticket types must use the same currency."
        );
      }

      const unitPrice = tt.price; // major units (e.g. 49.9 ILS)
      const lineTickets = item.quantity;
      const lineAmountMajor = unitPrice * lineTickets;

      ticketsCount += lineTickets;
      amountTotalMajorUnits += lineAmountMajor;

      return {
        ticketTypeId: item.ticketTypeId,
        ticketTypeName: tt.name as string,
        quantity: lineTickets,
        unitPrice,
        currency: ttCurrency,
      };
    });

    const remainingTickets = eventData.remainingTickets;
    if (
      typeof remainingTickets !== "number" ||
      remainingTickets < ticketsCount
    ) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Not enough tickets available for this event."
      );
    }

    if (ticketsCount > MAX_TICKETS_PER_ORDER) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        `Order cannot exceed ${MAX_TICKETS_PER_ORDER} tickets per order.`
      );
    }
    if (ticketsCount <= 0 || amountTotalMajorUnits <= 0 || !currency) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Order must have a positive total amount and ticket count."
      );
    }

    // Convert to smallest currency unit for Stripe.
    const amountForStripe = Math.round(
      amountTotalMajorUnits * STRIPE_AMOUNT_MULTIPLIER
    );
    if (amountForStripe <= 0) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Calculated Stripe amount must be greater than zero."
      );
    }

    const now = admin.firestore.FieldValue.serverTimestamp();

    // Create order document with paymentIntentId = null
    const orderDoc = {
      userId: uid,
      eventId,
      organizerProfileId,
      orderStatus: "awaiting_payment" as const,
      paymentStatus: "pending" as const,
      amountTotal: amountTotalMajorUnits,
      currency,
      ticketsCount,
      items: orderItems,
      paymentProvider: "stripe" as const,
      paymentIntentId: null as string | null,
      createdAt: now,
      updatedAt: now,
    };

    const orderRef = await db.collection("orders").add(orderDoc);

    if (!stripe) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Stripe is not configured on the server."
      );
    }

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountForStripe,
      currency,
      metadata: {
        orderId: orderRef.id,
        eventId,
        userId: uid,
      },
    });

    await orderRef.update({
      paymentIntentId: paymentIntent.id,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return {
      orderId: orderRef.id,
      paymentProvider: "stripe" as const,
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
    };
  }
);

