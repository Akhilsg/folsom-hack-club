import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { isAdmin } from "@/lib/adminSession";
import { isFirebaseConfigured } from "@/lib/firebase";
import { listSignups, type Signup } from "@/lib/signups";
import { logOut } from "./actions";
import LoginForm from "./LoginForm";
import styles from "./admin.module.css";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function formatDate(date: Date | null) {
  if (!date) return "—";
  return date.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function Flag() {
  return (
    <Link
      href="/"
      className={styles.flag}
      aria-label="Back to the Folsom Hack Club site"
    >
      <Image
        src="https://assets.hackclub.com/flag-orpheus-top.svg"
        alt="Hack Club"
        width={280}
        height={158}
        unoptimized
        loading="eager"
      />
    </Link>
  );
}

function LoginScreen() {
  return (
    <main className={styles.loginShell}>
      <div className="wrap">
        <Flag />
      </div>
      <div className={styles.loginCard}>
        <p className="eyebrow">Club leads only</p>
        <h1>Admin login</h1>
        <LoginForm />
      </div>
    </main>
  );
}

export default async function AdminPage() {
  if (!(await isAdmin())) return <LoginScreen />;

  let signups: Signup[] = [];
  let problem: string | null = null;
  if (!isFirebaseConfigured()) {
    problem =
      "Firebase isn't connected yet, so there's nowhere to store sign-ups. Add the FIREBASE_* environment variables (see the README) and redeploy.";
  } else {
    try {
      signups = await listSignups();
    } catch (error) {
      console.error("Failed to load signups", error);
      problem =
        "Couldn't load sign-ups from Firebase. Check the server logs and your credentials.";
    }
  }

  // Server Components render once per request, so reading the clock here is fine.
  // eslint-disable-next-line react-hooks/purity
  const weekAgo = Date.now() - WEEK_MS;
  const thisWeek = signups.filter(
    (s) => s.createdAt && s.createdAt.getTime() > weekAgo,
  ).length;

  return (
    <main>
      <header className={styles.header}>
        <div className={`wrap ${styles.topbar}`}>
          <Flag />
          <form action={logOut} className={styles.logout}>
            <button type="submit" className="btn btnOutline">
              Log out
            </button>
          </form>
        </div>
        <div className={`wrap ${styles.headline}`}>
          <p className="eyebrow">Admin</p>
          <h1>Sign-ups</h1>
          <dl className={styles.stats}>
            <div>
              <dt>Total</dt>
              <dd>{signups.length}</dd>
            </div>
            <div>
              <dt>Last 7 days</dt>
              <dd>{thisWeek}</dd>
            </div>
          </dl>
        </div>
      </header>

      <div className={`wrap ${styles.body}`}>
        <div className={styles.tableCard}>
          {problem ? (
            <p className={styles.notice}>{problem}</p>
          ) : signups.length === 0 ? (
            <div className={styles.empty}>
              <h2>No sign-ups yet</h2>
              <p>
                When someone fills out the interest form on the homepage,
                they&apos;ll show up here.
              </p>
            </div>
          ) : (
            <div className={styles.scroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email (personal, not school)</th>
                    <th scope="col">Grade</th>
                    <th scope="col">Experience</th>
                    <th scope="col">Wants to build</th>
                    <th scope="col">Signed up</th>
                  </tr>
                </thead>
                <tbody>
                  {signups.map((signup, i) => (
                    <tr key={signup.id}>
                      <td className={styles.num}>{signups.length - i}</td>
                      <td className={styles.name}>
                        {signup.firstName} {signup.lastName}
                      </td>
                      <td>
                        <a
                          href={`mailto:${signup.email}`}
                          className={styles.email}
                        >
                          {signup.email}
                        </a>
                      </td>
                      <td>{signup.grade}</td>
                      <td>{signup.experience}</td>
                      <td className={styles.interests}>
                        {signup.interests || "—"}
                      </td>
                      <td className={styles.date}>
                        {formatDate(signup.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
