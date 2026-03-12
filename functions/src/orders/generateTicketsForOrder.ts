import * as crypto from "crypto";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { db } from "../lib/firestore";
import { MAX_TICKETS_PER_ORDER } from "../lib/constants";

function generateQrToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

type OrderItem = {
  ticketTypeId: string;
  ticketTypeName: string;
  quantity: number;
};

type OrderData = {
  orderStatus?: string;
  paymentStatus?: string;
  userId?: string;
  eventId?: string;
  organizerProfileId?: string;
  ticketsCount?: number;
  items?: OrderItem[];
};

type EventTicketType = {
  id: string;
  name?: string;
  capacity?: number;
  sold?: number;
  [key: string]: unknown;
};

type EventData = {
  remainingTickets?: number;
  ticketTypes?: EventTicketType[];
};

/**
 * Internal helper: creates ticket documents and updates event aggregates for a
 * completed order. Idempotent (skips if tickets for this order already exist).
 * Not exposed as callable/HTTP.
 */
export async function generateTicketsForOrder(orderId: string): Promise<void> {
  await db.runTransaction(async (transaction) => {
    const orderRef = db.collection("orders").doc(orderId);
    const orderSnap = await transaction.get(orderRef);
    if (!orderSnap.exists) {
      functions.logger.info("generateTicketsForOrder: order not found", {
        orderId,
      });
      return;
    }

    const orderData = orderSnap.data() as OrderData;
    if (
      orderData.orderStatus !== "completed" ||
      orderData.paymentStatus !== "succeeded"
    ) {
      functions.logger.info(
        "generateTicketsForOrder: order not in completed/succeeded state",
        { orderId, orderStatus: orderData.orderStatus, paymentStatus: orderData.paymentStatus }
      );
      return;
    }

    const ticketsQuery = db
      .collection("tickets")
      .where("orderId", "==", orderId)
      .limit(1);
    const existingTicketsSnap = await transaction.get(ticketsQuery);
    if (!existingTicketsSnap.empty) {
      functions.logger.info(
        "generateTicketsForOrder: tickets already exist for order (idempotent skip)",
        { orderId }
      );
      return;
    }

    const userId = orderData.userId;
    const eventId = orderData.eventId;
    const organizerProfileId = orderData.organizerProfileId;
    const items = orderData.items;

    if (
      typeof userId !== "string" ||
      !userId ||
      typeof eventId !== "string" ||
      !eventId ||
      typeof organizerProfileId !== "string" ||
      !organizerProfileId
    ) {
      throw new Error(
        `generateTicketsForOrder: order missing required fields (orderId=${orderId})`
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      throw new Error(
        `generateTicketsForOrder: order has no items or empty items (orderId=${orderId})`
      );
    }

    const totalQty = items.reduce(
      (sum, item) => sum + (Number.isInteger(item.quantity) ? item.quantity : 0),
      0
    );
    if (totalQty <= 0) {
      throw new Error(
        `generateTicketsForOrder: order total quantity is 0 (orderId=${orderId})`
      );
    }
    if (totalQty > MAX_TICKETS_PER_ORDER) {
      throw new Error(
        `generateTicketsForOrder: order exceeds ${MAX_TICKETS_PER_ORDER} tickets (orderId=${orderId}, count=${totalQty})`
      );
    }

    const eventRef = db.collection("events").doc(eventId);
    const eventSnap = await transaction.get(eventRef);
    if (!eventSnap.exists) {
      throw new Error(
        `generateTicketsForOrder: event not found (orderId=${orderId}, eventId=${eventId})`
      );
    }

    const eventData = eventSnap.data() as EventData;
    const remainingTickets = eventData.remainingTickets;
    const ticketTypes = eventData.ticketTypes;

    if (
      typeof remainingTickets !== "number" ||
      remainingTickets < 0 ||
      !Array.isArray(ticketTypes)
    ) {
      throw new Error(
        `generateTicketsForOrder: event missing or invalid remainingTickets/ticketTypes (orderId=${orderId}, eventId=${eventId})`
      );
    }

    if (remainingTickets < totalQty) {
      throw new Error(
        `generateTicketsForOrder: insufficient remaining tickets (orderId=${orderId}, eventId=${eventId}, remaining=${remainingTickets}, required=${totalQty})`
      );
    }

    const ticketTypeMap = new Map<string, EventTicketType>();
    for (const tt of ticketTypes) {
      if (tt && typeof tt.id === "string") {
        ticketTypeMap.set(tt.id, tt);
      }
    }

    for (const item of items) {
      const tt = ticketTypeMap.get(item.ticketTypeId);
      if (!tt) {
        throw new Error(
          `generateTicketsForOrder: ticket type not found on event (orderId=${orderId}, eventId=${eventId}, ticketTypeId=${item.ticketTypeId})`
        );
      }
      const qty = Number.isInteger(item.quantity) ? item.quantity : 0;
      const capacity = typeof tt.capacity === "number" ? tt.capacity : 0;
      const sold = typeof tt.sold === "number" ? tt.sold : 0;
      if (sold + qty > capacity) {
        throw new Error(
          `generateTicketsForOrder: ticket type capacity exceeded (orderId=${orderId}, eventId=${eventId}, ticketTypeId=${item.ticketTypeId}, sold=${sold}, qty=${qty}, capacity=${capacity})`
        );
      }
    }

    const now = admin.firestore.FieldValue.serverTimestamp();
    const ticketsRef = db.collection("tickets");

    const newTicketTypes = ticketTypes.map((tt) => {
      const item = items.find((i) => i.ticketTypeId === tt.id);
      if (!item || !Number.isInteger(item.quantity) || item.quantity <= 0) {
        return tt;
      }
      const currentSold = typeof tt.sold === "number" ? tt.sold : 0;
      return { ...tt, sold: currentSold + item.quantity };
    });

    const newRemainingTickets = remainingTickets - totalQty;

    for (const item of items) {
      const ticketTypeId = item.ticketTypeId;
      const ticketTypeName =
        typeof item.ticketTypeName === "string" ? item.ticketTypeName : "";
      const qty = Number.isInteger(item.quantity) ? item.quantity : 0;
      for (let i = 0; i < qty; i++) {
        const ticketDoc = {
          orderId,
          eventId,
          organizerProfileId,
          userId,
          ticketTypeId,
          ticketTypeName,
          status: "valid",
          qrToken: generateQrToken(),
          createdAt: now,
          usedAt: null as null,
          cancelledAt: null as null,
        };
        transaction.set(ticketsRef.doc(), ticketDoc);
      }
    }

    transaction.update(eventRef, {
      remainingTickets: newRemainingTickets,
      ticketTypes: newTicketTypes,
      updatedAt: now,
    });

    functions.logger.info("generateTicketsForOrder: created tickets for order", {
      orderId,
      eventId,
      ticketCount: totalQty,
    });
  });
}

/**
 * Firestore trigger: when an order document is updated to completed/succeeded,
 * generate tickets and update event aggregates. Idempotent.
 */
export const generateTicketsOnOrderCompleted = functions.firestore
  .document("orders/{orderId}")
  .onUpdate(async (change, context) => {
    const after = change.after.data() as OrderData;
    if (after.orderStatus !== "completed" || after.paymentStatus !== "succeeded") {
      return;
    }
    const orderId = context.params.orderId as string;
    try {
      await generateTicketsForOrder(orderId);
    } catch (err) {
      functions.logger.error(
        "generateTicketsOnOrderCompleted: failed",
        { orderId, error: err }
      );
      throw err;
    }
  });
