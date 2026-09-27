"use server";

import { isFirebaseConfigured } from "@/lib/firebase";
import { experienceLevels, grades } from "@/lib/signupFields";
import { addSignup } from "@/lib/signups";

export type SignupResult = { ok: true; firstName: string } | { ok: false; message: string };

const EMAIL = /^[^\s@/]+@[^\s@/]+\.[^\s@/]+$/;

function text(data: FormData, name: string, maxLength: number) {
  return String(data.get(name) ?? "").trim().slice(0, maxLength);
}

export async function submitSignup(data: FormData): Promise<SignupResult> {
  // Hidden field that only bots fill in. Pretend it worked so they move on.
  if (text(data, "website", 200)) return { ok: true, firstName: "" };

  const signup = {
    firstName: text(data, "firstName", 60),
    lastName: text(data, "lastName", 60),
    email: text(data, "email", 254).toLowerCase(),
    grade: text(data, "grade", 10),
    experience: text(data, "experience", 40),
    interests: text(data, "interests", 500),
  };

  if (!signup.firstName || !signup.lastName) {
    return { ok: false, message: "Please fill in your first and last name." };
  }
  if (!EMAIL.test(signup.email)) {
    return { ok: false, message: "That email doesn't look right. Mind double-checking it?" };
  }
  if (!(grades as readonly string[]).includes(signup.grade)) {
    return { ok: false, message: "Please pick your grade." };
  }
  if (!(experienceLevels as readonly string[]).includes(signup.experience)) {
    return { ok: false, message: "Please pick how much coding you've done." };
  }

  if (!isFirebaseConfigured()) {
    return { ok: false, message: "Sign-ups aren't turned on yet. Just come to a meeting for now!" };
  }

  try {
    const outcome = await addSignup(signup);
    if (outcome === "duplicate") {
      return { ok: false, message: `${signup.email} is already on the list. You're all set!` };
    }
    return { ok: true, firstName: signup.firstName };
  } catch (error) {
    console.error("Failed to save signup", error);
    return { ok: false, message: "Something went wrong on our end. Please try again in a bit." };
  }
}
