import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { db } from "../lib/firestore";

type PublishEventInput = {
  eventId?: unknown;
};

export const publishEvent = functions.https.onCall(
  async (data: PublishEventInput, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "You must be authenticated to publish an event."
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

    // Verify producer role
    const userSnap = await db.collection("users").doc(uid).get();
    if (!userSnap.exists) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "User document does not exist."
      );
    }
    const userData = userSnap.data() as { roles?: { producer?: boolean } };
    if (!userData.roles || userData.roles.producer !== true) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Only users with producer role can publish events."
      );
    }

    // Load existing event
    const eventRef = db.collection("events").doc(eventId);
    const eventSnap = await eventRef.get();
    if (!eventSnap.exists) {
      throw new functions.https.HttpsError(
        "not-found",
        "Event does not exist."
      );
    }

    const eventData = eventSnap.data() as any;

    // Ensure event is a draft
    if (eventData.status !== "draft") {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Only draft events can be published."
      );
    }

    const organizerProfileId = eventData.organizerProfileId as string | undefined;
    if (!organizerProfileId || typeof organizerProfileId !== "string") {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Event has an invalid organizerProfileId."
      );
    }

    // Verify organizer ownership
    const organizerSnap = await db
      .collection("organizerProfiles")
      .doc(organizerProfileId)
      .get();
    if (!organizerSnap.exists) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Organizer profile does not exist."
      );
    }
    const organizerData = organizerSnap.data() as { ownerUserId?: string };
    if (organizerData.ownerUserId !== uid) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "You do not own this organizer profile."
      );
    }

    // Validate required public fields (non-empty strings)
    const ensureExistingNonEmptyString = (fieldName: string) => {
      const value = eventData[fieldName];
      if (typeof value !== "string" || !value.trim()) {
        throw new functions.https.HttpsError(
          "failed-precondition",
          `Event field '${fieldName}' is required and must be a non-empty string.`
        );
      }
    };

    ensureExistingNonEmptyString("title");
    ensureExistingNonEmptyString("description");
    ensureExistingNonEmptyString("category");
    ensureExistingNonEmptyString("city");
    ensureExistingNonEmptyString("venueName");
    ensureExistingNonEmptyString("address");
    ensureExistingNonEmptyString("imageUrl");

    // Validate startTime and endTime
    const startTime = eventData.startTime as admin.firestore.Timestamp;
    const endTime = eventData.endTime as admin.firestore.Timestamp;

    if (
      !startTime ||
      !endTime ||
      typeof startTime.toMillis !== "function" ||
      typeof endTime.toMillis !== "function"
    ) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Event has invalid startTime or endTime."
      );
    }

    if (endTime.toMillis() <= startTime.toMillis()) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "endTime must be later than startTime."
      );
    }

    // Validate ticketTypes and compute effectiveTotalTickets
    const ticketTypes = eventData.ticketTypes as any[];
    if (!Array.isArray(ticketTypes) || ticketTypes.length === 0) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Event must have at least one ticket type."
      );
    }

    let effectiveTotalTickets = 0;

    ticketTypes.forEach((tt, index) => {
      const indexLabel = `ticketTypes[${index}]`;
      if (typeof tt !== "object" || tt === null) {
        throw new functions.https.HttpsError(
          "failed-precondition",
          `${indexLabel} must be an object.`
        );
      }

      if (typeof tt.id !== "string" || !tt.id.trim()) {
        throw new functions.https.HttpsError(
          "failed-precondition",
          `${indexLabel}.id must be a non-empty string.`
        );
      }

      if (typeof tt.name !== "string" || !tt.name.trim()) {
        throw new functions.https.HttpsError(
          "failed-precondition",
          `${indexLabel}.name must be a non-empty string.`
        );
      }

      if (
        typeof tt.price !== "number" ||
        !isFinite(tt.price) ||
        tt.price < 0
      ) {
        throw new functions.https.HttpsError(
          "failed-precondition",
          `${indexLabel}.price must be a finite non-negative number.`
        );
      }

      if (typeof tt.currency !== "string" || !tt.currency.trim()) {
        throw new functions.https.HttpsError(
          "failed-precondition",
          `${indexLabel}.currency must be a non-empty string.`
        );
      }

      if (
        typeof tt.capacity !== "number" ||
        !Number.isInteger(tt.capacity) ||
        tt.capacity <= 0
      ) {
        throw new functions.https.HttpsError(
          "failed-precondition",
          `${indexLabel}.capacity must be a positive integer.`
        );
      }

      if (tt.status !== "active" && tt.status !== "inactive") {
        throw new functions.https.HttpsError(
          "failed-precondition",
          `${indexLabel}.status must be either "active" or "inactive".`
        );
      }

      if (tt.status === "active") {
        effectiveTotalTickets += tt.capacity;
      }
    });

    if (effectiveTotalTickets <= 0) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Event must have at least one active ticket type with positive capacity."
      );
    }

    const storedTotalTickets = eventData.totalTickets as number | undefined;
    const storedRemainingTickets = eventData.remainingTickets as
      | number
      | undefined;

    if (
      typeof storedTotalTickets !== "number" ||
      storedTotalTickets <= 0 ||
      typeof storedRemainingTickets !== "number" ||
      storedRemainingTickets <= 0
    ) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Event has invalid totalTickets or remainingTickets."
      );
    }

    const now = admin.firestore.FieldValue.serverTimestamp();

    await eventRef.update({
      status: "published",
      updatedAt: now,
    });

    return {
      id: eventId,
      status: "published",
      organizerProfileId,
    };
  }
);

