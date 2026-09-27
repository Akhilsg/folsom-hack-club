import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "fhs_admin";
const MAX_AGE_SECONDS = 60 * 60 * 12;

function adminCredentials() {
  const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) return null;
  return { username: ADMIN_USERNAME, password: ADMIN_PASSWORD };
}

export function isAdminConfigured() {
  return adminCredentials() !== null;
}

// Hashing first gives equal-length buffers, so the comparison takes the same time
// no matter how much of the guess is right.
function sameText(a: string, b: string) {
  const hash = (s: string) => createHash("sha256").update(s).digest();
  return timingSafeEqual(hash(a), hash(b));
}

// Signed with the password, so changing ADMIN_PASSWORD logs everyone out.
function signature(expires: number, creds: { username: string; password: string }) {
  return createHmac("sha256", creds.password)
    .update(`${creds.username}:${expires}`)
    .digest("base64url");
}

export function checkAdminCredentials(username: string, password: string) {
  const creds = adminCredentials();
  if (!creds) return false;
  const usernameOk = sameText(username, creds.username);
  const passwordOk = sameText(password, creds.password);
  return usernameOk && passwordOk;
}

export async function startAdminSession() {
  const creds = adminCredentials();
  if (!creds) throw new Error("Admin login isn't configured.");
  const expires = Date.now() + MAX_AGE_SECONDS * 1000;
  (await cookies()).set(COOKIE, `${expires}.${signature(expires, creds)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function endAdminSession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin() {
  const creds = adminCredentials();
  if (!creds) return false;
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return false;
  const [expiresText, sig] = value.split(".");
  const expires = Number(expiresText);
  if (!sig || !Number.isFinite(expires) || expires < Date.now()) return false;
  return sameText(sig, signature(expires, creds));
}
