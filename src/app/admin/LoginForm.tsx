"use client";

import { useActionState } from "react";
import fieldStyles from "@/components/ContactForm.module.css";
import { logIn } from "./actions";
import styles from "./admin.module.css";

export default function LoginForm() {
  const [state, action, pending] = useActionState(logIn, undefined);

  return (
    <form action={action} className={fieldStyles.form}>
      <label className={fieldStyles.field}>
        <span>Username</span>
        <input
          name="username"
          required
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          defaultValue={state?.username}
        />
      </label>
      <label className={fieldStyles.field}>
        <span>Password</span>
        <input name="password" type="password" required autoComplete="current-password" />
      </label>

      {state?.error && (
        <p className={styles.error} role="alert">
          {state.error}
        </p>
      )}

      <button type="submit" className={`btn btnCta ${styles.loginButton}`} disabled={pending}>
        {pending ? "Checking…" : "Log in"}
      </button>
    </form>
  );
}
