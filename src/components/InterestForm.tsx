"use client";

import {
  useRef,
  useState,
  useTransition,
  type FormEvent,
  type MouseEvent,
} from "react";
import { submitSignup, type SignupResult } from "@/app/actions/signup";
import NextMeeting from "@/components/NextMeeting";
import { experienceLevels, grades } from "@/lib/signupFields";
import { site } from "@/lib/site";
import fieldStyles from "./ContactForm.module.css";
import styles from "./InterestForm.module.css";

const { time, room } = site.meeting;

// A button that opens the interest form in a modal dialog.
export default function InterestForm({
  className,
  label,
}: {
  className?: string;
  label: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [result, setResult] = useState<SignupResult | null>(null);
  const [pending, startTransition] = useTransition();

  function close() {
    dialogRef.current?.close();
  }

  // Clicks on the dialog element itself (not its contents) land on the backdrop.
  function handleDialogClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) close();
  }

  // After a successful signup, reopening shows a fresh form. After an error, keep what they typed.
  function handleClose() {
    if (result?.ok) setResult(null);
  }

  // onSubmit instead of a form action: React resets the fields after an action, which
  // would wipe everything the person typed whenever there's an error.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(async () => {
      setResult(await submitSignup(data));
    });
  }

  return (
    <>
      <button
        type="button"
        className={`${styles.trigger} ${className ?? ""}`}
        onClick={() => dialogRef.current?.showModal()}
      >
        {label}
      </button>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="interest-form-title"
        onClick={handleDialogClick}
        onClose={handleClose}
      >
        <div className={styles.bar} />
        <button
          type="button"
          className={styles.close}
          onClick={close}
          aria-label="Close"
        >
          ×
        </button>

        {result?.ok ? (
          <div className={styles.success} role="status">
            <div className={styles.check} aria-hidden="true">
              ✓
            </div>
            <h2 id="interest-form-title">
              You&apos;re on the list
              {result.firstName ? `, ${result.firstName}` : ""}!
            </h2>
            <p>
              Next meeting is{" "}
              <strong>
                <NextMeeting />
              </strong>
              , {time} in {room}. Bring a laptop if you have one.
            </p>
            <div className={styles.successActions}>
              <a href={site.slack} className="btn btnCta">
                Join the Slack
              </a>
              <button
                type="button"
                className={`btn ${styles.doneButton}`}
                onClick={close}
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <>
            <header className={styles.header}>
              <p className="eyebrow">Interest form</p>
              <h2 id="interest-form-title">Join Folsom Hack Club</h2>
              <p className={styles.sub}>
                Takes 30 seconds. We&apos;ll send you meeting reminders.
              </p>
            </header>

            <form
              className={`${fieldStyles.form} ${styles.form}`}
              onSubmit={handleSubmit}
            >
              <div className={fieldStyles.row}>
                <label className={fieldStyles.field}>
                  <span>First name</span>
                  <input
                    name="firstName"
                    required
                    maxLength={60}
                    autoComplete="given-name"
                  />
                </label>
                <label className={fieldStyles.field}>
                  <span>Last name</span>
                  <input
                    name="lastName"
                    required
                    maxLength={60}
                    autoComplete="family-name"
                  />
                </label>
              </div>

              <label className={fieldStyles.field}>
                <span>Email (personal, not school)</span>
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                />
              </label>

              <div className={fieldStyles.row}>
                <label className={fieldStyles.field}>
                  <span>Grade</span>
                  <select name="grade" required defaultValue="">
                    <option value="" disabled>
                      Pick one
                    </option>
                    {grades.map((grade) => (
                      <option key={grade}>{grade}</option>
                    ))}
                  </select>
                </label>
                <label className={fieldStyles.field}>
                  <span>Coding experience</span>
                  <select name="experience" required defaultValue="">
                    <option value="" disabled>
                      Pick one
                    </option>
                    {experienceLevels.map((level) => (
                      <option key={level}>{level}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label className={fieldStyles.field}>
                <span>
                  What do you want to build?{" "}
                  <span className={styles.optional}>(optional)</span>
                </span>
                <textarea
                  name="interests"
                  rows={3}
                  maxLength={500}
                  placeholder="A game, a website, a robot…"
                />
              </label>

              <label className={styles.honeypot} aria-hidden="true">
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>

              {result && !result.ok && (
                <p className={styles.error} role="alert">
                  {result.message}
                </p>
              )}

              <div className={styles.footer}>
                <button type="submit" className="btn btnCta" disabled={pending}>
                  {pending ? "Sending…" : "Count me in"}
                </button>
                <p className={styles.hint}>Only club leads can see this.</p>
              </div>
            </form>
          </>
        )}
      </dialog>
    </>
  );
}
