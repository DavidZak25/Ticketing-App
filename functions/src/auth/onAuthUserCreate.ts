import * as functions from "firebase-functions";
import { ensureUserDocFromAuth } from "../lib/firestore";

// Triggered whenever a new Firebase Auth user is created.
// Creates a corresponding users/{uid} document in Firestore with
// safe default roles and basic profile data, if it does not already exist.
export const onAuthUserCreate = functions.auth.user().onCreate(async (user) => {
  await ensureUserDocFromAuth({
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    photoURL: user.photoURL,
  });
});

