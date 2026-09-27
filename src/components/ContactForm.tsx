"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import styles from "./ContactForm.module.css";

const reasons = [
  "General question",
  "I want to join",
  "I want to help run the club",
  "Workshop or project idea",
  "Something else",
];

// No backend: submitting drafts an email in the visitor's mail app.
export default function ContactForm() {
  const [opened, setOpened] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name")).trim();
    const email = String(data.get("email")).trim();
    const reason = String(data.get("reason"));
    const message = String(data.get("message")).trim();

    const subject = `${reason} (from ${name})`;
    const body = `${message}\n\n${name} · ${email}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>Send us a message</h2>

      <div className={styles.row}>
        <label className={styles.field}>
          <span>Name</span>
          <input name="name" required autoComplete="name" />
        </label>
        <label className={styles.field}>
          <span>Email (personal, not school)</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>

      <label className={styles.field}>
        <span>What&apos;s this about?</span>
        <select name="reason" defaultValue={reasons[0]}>
          {reasons.map((reason) => (
            <option key={reason}>{reason}</option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span>Message</span>
        <textarea name="message" rows={5} required />
      </label>

      <div className={styles.footer}>
        <button type="submit" className="btn btnCta">
          Send message
        </button>
        <p className={styles.hint}>Opens your email app. Nothing gets stored on this site.</p>
      </div>

      {opened && (
        <p className={styles.opened} role="status">
          Your email app should have opened with your message. If it didn&apos;t, email us
          at <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      )}
    </form>
  );
}
