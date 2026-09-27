"use server";

import { redirect } from "next/navigation";
import {
  checkAdminCredentials,
  endAdminSession,
  isAdminConfigured,
  startAdminSession,
} from "@/lib/adminSession";

export type LoginState = { error: string; username: string } | undefined;

export async function logIn(_prev: LoginState, data: FormData): Promise<LoginState> {
  const username = String(data.get("username") ?? "").trim();
  const password = String(data.get("password") ?? "");

  if (!isAdminConfigured()) {
    return { error: "Admin login isn't set up. Add ADMIN_USERNAME and ADMIN_PASSWORD.", username };
  }
  if (!checkAdminCredentials(username, password)) {
    return { error: "That username and password don't match.", username };
  }

  await startAdminSession();
  redirect("/admin");
}

export async function logOut() {
  await endAdminSession();
  redirect("/admin");
}
