import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { db } from "../lib/firestore";

type CreateEventInput = {
  organizerProfileId?: unknown;
  title?: unknown;
  subtitle?: unknown;
  description?: unknown;
  category?: unknown;
  city?: unknown;
  venueName?: unknown;
  address?: unknown;
  imageUrl?: unknown;
  startTime?: unknown;
  endTime?: unknown;
  ticketTypes?: unknown;
};

type RawTicketTypeInput = {
  id?: unknown;
  name?: unknown;
  description?: unknown;
  price?: unknown;
  currency?: unknown;
  capacity?: unknown;
  status?: unknown;
};

const MAX_TITLE_LENGTH = 150;
const MAX_SUBTITLE_LENGTH = 200;
const MAX_DESCRIPTION_LENGTH = 5000;
const MAX_CATEGORY_LENGTH = 50;
const MAX_CITY_LENGTH = 100;
const MAX_VENUE_LENGTH = 200;
const MAX_ADDRESS_LENGTH = 300;
const MAX_IMAGE_URL_LENGTH = 500;

const MAX_TICKET_TYPE_ID_LENGTH = 50;
const MAX_TICKET_TYPE_NAME_LENGTH = 150;
const MAX_TICKET_TYPE_DESCRIPTION_LENGTH = 1000;
const MAX_TICKET_TYPES = 20;

export const createEvent = functions.https.onCall(
  async (data: CreateEventInput, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "You must be authenticated to create an event."
      );
    }

    const uid = context.auth.uid;

    // Basic shape check
    if (typeof data !== "object" || data === null) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Data must be an object."
      );
    }

    // Validate organizerProfileId
    if (typeof data.organizerProfileId !== "string") {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "organizerProfileId is required and must be a string."
      );
    }
    const organizerProfileId = data.organizerProfileId.trim();
    if (!organizerProfileId) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "organizerProfileId must be a non-empty string."
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
        "Only users with producer role can create events."
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

    // Helper for validating required trimmed strings
    const ensureStringField = (
      value: unknown,
      fieldName: string,
      maxLength: number
    ): string => {
      if (typeof value !== "string") {
        throw new functions.https.HttpsError(
          "invalid-argument",
          `${fieldName} is required and must be a string.`
        );
      }
      const trimmed = value.trim();
      if (!trimmed) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          `${fieldName} must be a non-empty string.`
        );
      }
      if (trimmed.length > maxLength) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          `${fieldName} must be at most ${maxLength} characters long.`
        );
      }
      return trimmed;
    };

    const title = ensureStringField(data.title, "title", MAX_TITLE_LENGTH);
    const description = ensureStringField(
      data.description,
      "description",
      MAX_DESCRIPTION_LENGTH
    );
    const category = ensureStringField(
      data.category,
      "category",
      MAX_CATEGORY_LENGTH
    );
    const city = ensureStringField(data.city, "city", MAX_CITY_LENGTH);
    const venueName = ensureStringField(
      data.venueName,
      "venueName",
      MAX_VENUE_LENGTH
    );
    const address = ensureStringField(
      data.address,
      "address",
      MAX_ADDRESS_LENGTH
    );
    const imageUrl = ensureStringField(
      data.imageUrl,
      "imageUrl",
      MAX_IMAGE_URL_LENGTH
    );

    // Subtitle: optional, trimmed, null if empty
    let subtitle: string | null = null;
    if (typeof data.subtitle === "string") {
      const trimmed = data.subtitle.trim();
      if (trimmed.length > MAX_SUBTITLE_LENGTH) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          `subtitle must be at most ${MAX_SUBTITLE_LENGTH} characters long.`
        );
      }
      subtitle = trimmed || null;
    }

    // Parse startTime and endTime (expect ISO string or epoch ms)
    const parseTime = (value: unknown, fieldName: string): admin.firestore.Timestamp => {
      if (typeof value === "string" || typeof value === "number") {
        const date = new Date(value as string | number);
        if (isNaN(date.getTime())) {
          throw new functions.https.HttpsError(
            "invalid-argument",
            `${fieldName} must be a valid date/time.`
          );
        }
        return admin.firestore.Timestamp.fromDate(date);
      }
      throw new functions.https.HttpsError(
        "invalid-argument",
        `${fieldName} must be a string or number representing a date/time.`
      );
    };

    const startTime = parseTime(data.startTime, "startTime");
    const endTime = parseTime(data.endTime, "endTime");

    if (endTime.toMillis() <= startTime.toMillis()) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "endTime must be later than startTime."
      );
    }

    // Validate ticketTypes
    if (!Array.isArray(data.ticketTypes)) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "ticketTypes must be a non-empty array."
      );
    }

    const rawTicketTypes = data.ticketTypes as RawTicketTypeInput[];

    if (rawTicketTypes.length === 0) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "ticketTypes must contain at least one ticket type."
      );
    }

    if (rawTicketTypes.length > MAX_TICKET_TYPES) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        `ticketTypes must contain at most ${MAX_TICKET_TYPES} ticket types.`
      );
    }

    const seenIds = new Set<string>();
    let totalTickets = 0;

    const normalizedTicketTypes = rawTicketTypes.map((tt, index) => {
      const indexLabel = `ticketTypes[${index}]`;

      if (typeof tt !== "object" || tt === null) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          `${indexLabel} must be an object.`
        );
      }

      // id
      if (typeof tt.id !== "string") {
        throw new functions.https.HttpsError(
          "invalid-argument",
          `${indexLabel}.id is required and must be a string.`
        );
      }
      const id = tt.id.trim();
      if (!id) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          `${indexLabel}.id must be a non-empty string.`
        );
      }
      if (id.length > MAX_TICKET_TYPE_ID_LENGTH) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          `${indexLabel}.id must be at most ${MAX_TICKET_TYPE_ID_LENGTH} characters long.`
        );
      }
      if (seenIds.has(id)) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          `Duplicate ticket type id '${id}' is not allowed.`
        );
      }
      seenIds.add(id);

      // name
      if (typeof tt.name !== "string") {
        throw new functions.https.HttpsError(
          "invalid-argument",
          `${indexLabel}.name is required and must be a string.`
        );
      }
      const name = tt.name.trim();
      if (!name) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          `${indexLabel}.name must be a non-empty string.`
        );
      }
      if (name.length > MAX_TICKET_TYPE_NAME_LENGTH) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          `${indexLabel}.name must be at most ${MAX_TICKET_TYPE_NAME_LENGTH} characters long.`
        );
      }

      // description
      let description: string | null = null;
      if (typeof tt.description === "string") {
        const value = tt.description.trim();
        if (value.length > MAX_TICKET_TYPE_DESCRIPTION_LENGTH) {
          throw new functions.https.HttpsError(
            "invalid-argument",
            `${indexLabel}.description must be at most ${MAX_TICKET_TYPE_DESCRIPTION_LENGTH} characters long.`
          );
        }
        description = value || null;
      }

      // price
      if (typeof tt.price !== "number" || !isFinite(tt.price) || tt.price < 0) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          `${indexLabel}.price must be a finite non-negative number.`
        );
      }
      const price = tt.price;

      // currency
      if (typeof tt.currency !== "string") {
        throw new functions.https.HttpsError(
          "invalid-argument",
          `${indexLabel}.currency is required and must be a string.`
        );
      }
      const currency = tt.currency.trim();
      if (!currency) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          `${indexLabel}.currency must be a non-empty string.`
        );
      }

      // capacity
      if (
        typeof tt.capacity !== "number" ||
        !Number.isInteger(tt.capacity) ||
        tt.capacity <= 0
      ) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          `${indexLabel}.capacity must be a positive integer.`
        );
      }
      const capacity = tt.capacity;

      // status
      if (tt.status !== "active" && tt.status !== "inactive") {
        throw new functions.https.HttpsError(
          "invalid-argument",
          `${indexLabel}.status must be either "active" or "inactive".`
        );
      }
      const status = tt.status;

      if (status === "active") {
        totalTickets += capacity;
      }

      return {
        id,
        name,
        description,
        price,
        currency,
        capacity,
        sold: 0,
        status,
      };
    });

    if (totalTickets <= 0) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "At least one active ticket type with positive capacity is required."
      );
    }

    const now = admin.firestore.FieldValue.serverTimestamp();

    const eventDoc = {
      organizerProfileId,
      status: "draft" as const,
      title,
      subtitle,
      description,
      category,
      city,
      venueName,
      address,
      imageUrl,
      startTime,
      endTime,
      ticketTypes: normalizedTicketTypes,
      totalTickets,
      remainingTickets: totalTickets,
      createdAt: now,
      updatedAt: now,
    };

    const ref = await db.collection("events").add(eventDoc);

    return {
      id: ref.id,
      status: "draft",
      title,
      organizerProfileId,
    };
  }
);

