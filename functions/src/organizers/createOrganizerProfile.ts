import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { db } from "../lib/firestore";

type CreateOrganizerInput = {
  name?: unknown;
  description?: unknown;
  websiteUrl?: unknown;
  contactEmail?: unknown;
  contactPhone?: unknown;
  logoUrl?: unknown;
};

const MAX_NAME_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 1000;
const MAX_URL_LENGTH = 255;
const MAX_EMAIL_LENGTH = 255;
const MAX_PHONE_LENGTH = 50;

export const createOrganizerProfile = functions.https.onCall(
  async (data: CreateOrganizerInput, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "You must be authenticated to create an organizer profile."
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

    // Fetch user to verify producer role
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
        "Only users with producer role can create an organizer profile."
      );
    }

    // Validate and normalize fields
    const rawName = typeof data.name === "string" ? data.name : "";
    const name = rawName.trim();

    if (!name) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Name is required and must be a non-empty string."
      );
    }

    if (name.length > MAX_NAME_LENGTH) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        `Name must be at most ${MAX_NAME_LENGTH} characters long.`
      );
    }

    const description =
      typeof data.description === "string"
        ? data.description.trim().slice(0, MAX_DESCRIPTION_LENGTH)
        : null;

    const websiteUrl =
      typeof data.websiteUrl === "string"
        ? data.websiteUrl.trim().slice(0, MAX_URL_LENGTH)
        : null;

    const contactEmail =
      typeof data.contactEmail === "string"
        ? data.contactEmail.trim().slice(0, MAX_EMAIL_LENGTH)
        : null;

    const contactPhone =
      typeof data.contactPhone === "string"
        ? data.contactPhone.trim().slice(0, MAX_PHONE_LENGTH)
        : null;

    const logoUrl =
      typeof data.logoUrl === "string"
        ? data.logoUrl.trim().slice(0, MAX_URL_LENGTH)
        : null;

    const now = admin.firestore.FieldValue.serverTimestamp();

    const organizerDoc = {
      ownerUserId: uid,
      name,
      description,
      websiteUrl,
      contactEmail,
      contactPhone,
      logoUrl,
      paymentProvider: null,
      paymentAccountId: null,
      createdAt: now,
      updatedAt: now,
    };

    const ref = await db.collection("organizerProfiles").add(organizerDoc);

    return {
      id: ref.id,
      organizer: organizerDoc,
    };
  }
);

