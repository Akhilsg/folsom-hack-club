import "server-only";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Credentials come from a Firebase service account. See "Sign-ups & admin" in the README.
function firebaseEnv() {
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;
  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) return null;
  return {
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    // Env files and dashboards often store the key's newlines as literal "\n".
    privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  };
}

export function isFirebaseConfigured() {
  return firebaseEnv() !== null;
}

// The Admin SDK skips Firestore security rules, so the database itself can deny all
// public access. Only this server code ever reads or writes it.
export function getDb() {
  const env = firebaseEnv();
  if (!env) throw new Error("Firebase isn't configured. Set the FIREBASE_* env vars.");
  const app = getApps()[0] ?? initializeApp({ credential: cert(env) });
  return getFirestore(app);
}
