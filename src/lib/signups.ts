import "server-only";
import { FieldValue, type Timestamp } from "firebase-admin/firestore";
import { getDb } from "./firebase";

const COLLECTION = "signups";

export type SignupInput = {
  firstName: string;
  lastName: string;
  email: string;
  grade: string;
  experience: string;
  interests: string;
};

export type Signup = SignupInput & {
  id: string;
  createdAt: Date | null;
};

// Returns "duplicate" if someone already signed up with this email.
export async function addSignup(input: SignupInput): Promise<"created" | "duplicate"> {
  // Keying by email makes duplicate checks atomic: create() fails if the doc exists.
  const id = encodeURIComponent(input.email.toLowerCase());
  try {
    await getDb()
      .collection(COLLECTION)
      .doc(id)
      .create({ ...input, createdAt: FieldValue.serverTimestamp() });
    return "created";
  } catch (error) {
    // gRPC status 6 is ALREADY_EXISTS
    if ((error as { code?: number }).code === 6) return "duplicate";
    throw error;
  }
}

export async function listSignups(): Promise<Signup[]> {
  const snapshot = await getDb().collection(COLLECTION).orderBy("createdAt", "desc").get();
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      firstName: data.firstName ?? "",
      lastName: data.lastName ?? "",
      email: data.email ?? "",
      grade: data.grade ?? "",
      experience: data.experience ?? "",
      interests: data.interests ?? "",
      createdAt: (data.createdAt as Timestamp | undefined)?.toDate() ?? null,
    };
  });
}
