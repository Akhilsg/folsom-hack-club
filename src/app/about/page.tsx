import fs from "node:fs";
import path from "node:path";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { site } from "@/lib/site";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About us",
  description: "Meet the officers who run Folsom High School's Hack Club, and learn what the club is about.",
};

const { cadence, time, room } = site.meeting;

const OFFICER_DIR = path.join(process.cwd(), "public", "officers");
const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;
const accents = ["var(--red)", "var(--orange)", "var(--blue)", "var(--purple)"];

// Finds public/officers/<name>.<ext>, so adding a photo is just dropping the file in.
function photoFor(name: string) {
  try {
    const file = fs
      .readdirSync(OFFICER_DIR)
      .find((f) => IMAGE_EXT.test(f) && f.replace(IMAGE_EXT, "").toLowerCase() === name);
    return file ? `/officers/${file}` : null;
  } catch {
    return null;
  }
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

const values = [
  {
    title: "Build real things",
    body: "We spend most of the time building, not listening to lectures. You'll leave with something you made, like a website, a bot, or a game.",
  },
  {
    title: "Nobody starts as an expert",
    body: "Most of us started with no experience. Ask as many questions as you want.",
  },
  {
    title: "Part of Hack Club",
    body: "You'll be connected to thousands of other teens who code, and there are online programs and hackathons we can go to together.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <header className={styles.header}>
          <div className="wrap">
            <p className="eyebrow">About us</p>
            <h1>Who runs the club</h1>
            <p className={styles.lead}>
              {site.name} is run by students at {site.school}. We like making things with code and
              want more people at FHS to try it.
            </p>
          </div>
        </header>

        <section className={`wrap ${styles.officersSection}`} aria-labelledby="officers-title">
          <h2 id="officers-title" className={styles.visuallyHidden}>
            Meet the officers
          </h2>
          <ul className={styles.officers}>
            {site.officers.map((officer, i) => {
              const photo = photoFor(officer.photo);
              return (
                <li
                  key={officer.name}
                  className={styles.officer}
                  style={{ "--accent": accents[i % accents.length] } as CSSProperties}
                >
                  <div className={styles.photo}>
                    {photo ? (
                      <Image
                        src={photo}
                        alt={officer.name}
                        fill
                        sizes="(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 25vw"
                      />
                    ) : (
                      <div className={styles.placeholder} aria-hidden="true">
                        <span className={styles.initials}>{initials(officer.name)}</span>
                        <span className={styles.soon}>photo coming soon</span>
                      </div>
                    )}
                  </div>
                  <div className={styles.officerBody}>
                    <p className={styles.role}>{officer.role}</p>
                    <h3>{officer.name}</h3>
                    <p className={styles.grade}>{officer.grade}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className={styles.reachUs}>
            Want to talk to us? Email{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> or find us in {room}.
          </p>
        </section>

        <section className={styles.section}>
          <div className={`wrap ${styles.mission}`}>
            <div>
              <p className="eyebrow">What we&apos;re about</p>
              <h2 className="sectionTitle">Coding is more fun with friends.</h2>
            </div>
            <div className={styles.missionBody}>
              <p>
                It&apos;s easier to learn when there are people around to help you out and see what
                you made.
              </p>
              <p>
                We&apos;re part of <a href="https://hackclub.com">Hack Club</a>, a nonprofit that
                supports student-run coding clubs at high schools around the world.
              </p>
            </div>
          </div>
          <div className={`wrap ${styles.values}`}>
            {values.map((value, i) => (
              <article key={value.title} className={styles.value}>
                <span className={`${styles.valueNum} gradientText`}>0{i + 1}</span>
                <h3>{value.title}</h3>
                <p>{value.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.meetings}>
          <div className="wrap">
            <p className="eyebrow">What meetings look like</p>
            <h2 className="sectionTitle">There are two kinds of meetings.</h2>
            <p className={styles.meetingsLead}>
              {cadence}, {time}, in {room}.
            </p>
            <div className={styles.weeks}>
              <article className={styles.week}>
                <p className={styles.weekTag}>Workshop week</p>
                <h3>Learn something new</h3>
                <p>
                  Someone teaches a short workshop, like making your first website or a Discord bot.
                  You follow along on your laptop and end up with something that works.
                </p>
              </article>
              <article className={styles.week}>
                <p className={styles.weekTag}>Hack week</p>
                <h3>Work on whatever you want</h3>
                <p>
                  Work on your own project, start something new, or team up with someone. People are
                  around to help if you get stuck.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className="wrap">
            <h2>Want to help run the club?</h2>
            <p>
              We&apos;d love help teaching workshops, coming up with ideas, or planning events. You
              don&apos;t need to be an officer.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/contact" className={`btn ${styles.ctaButton}`}>
                Get in touch
              </Link>
              <Link href="/#join" className="btn btnOutline">
                Join the club
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
