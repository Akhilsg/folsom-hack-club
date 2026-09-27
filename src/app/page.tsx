import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import InterestForm from "@/components/InterestForm";
import Nav from "@/components/Nav";
import NextMeeting from "@/components/NextMeeting";
import { instagramUrl, site } from "@/lib/site";
import styles from "./page.module.css";

const { cadence, time, room } = site.meeting;

const buildIdeas = [
  "a personal website",
  "a Discord bot",
  "a game in Godot",
  "a custom macropad",
  "a Chrome extension",
  "an FHS bell schedule app",
  "a Minecraft mod",
  "a tiny synth",
  "a weather station",
  "an app for your friend group",
  "a robot that does one dumb thing",
];

const audiences = [
  {
    accent: "var(--red)",
    title: "Never coded before",
    body: "That's fine, most of us hadn't either. The workshops start from the basics, and you can ask anything.",
  },
  {
    accent: "var(--blue)",
    title: "Already building stuff",
    body: "Bring what you're working on. You'll find people to show it to, help when it breaks, and maybe someone to build with.",
  },
  {
    accent: "var(--purple)",
    title: "Not a “tech person”?",
    body: "You don't have to be. If you like making things or figuring out how stuff works, you'll fit in.",
  },
];

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <section className={styles.hero}>
          <div className={`wrap ${styles.heroInner}`}>
            <div>
              <p className={styles.prompt}>
                <span>~/fhs</span> $ cd {room.toLowerCase()}
              </p>
              <h1 className={styles.title}>
                <span>Folsom</span>
                <span className="gradientText">Hack Club</span>
              </h1>
              <p className={styles.lead}>
                A student-run club at {site.school} where we make stuff with code, like websites,
                games, bots, and hardware. You don&apos;t need any experience.
              </p>
              <div className={styles.actions}>
                <Link href="#join" className="btn btnCta">
                  Join the club
                </Link>
                <Link href="#meetings" className="btn btnOutline">
                  When we meet
                </Link>
              </div>
            </div>

            <aside className={styles.ticket} aria-label="Next meeting">
              <p className={styles.ticketLabel}>Next meeting</p>
              <p className={styles.ticketDate}>
                <NextMeeting />
              </p>
              <dl className={styles.ticketRows}>
                <div>
                  <dt>Time</dt>
                  <dd>{time}</dd>
                </div>
                <div>
                  <dt>Room</dt>
                  <dd>{room}</dd>
                </div>
                <div>
                  <dt>How often</dt>
                  <dd>{cadence}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        <div className={styles.stripClip}>
          <div className={styles.strip} role="marquee" aria-label="Things you could build">
            <div className={styles.track}>
              {[...buildIdeas, ...buildIdeas].map((idea, i) => (
                <span key={i} aria-hidden={i >= buildIdeas.length}>
                  {idea}
                </span>
              ))}
            </div>
          </div>
        </div>

        <section id="about" className={styles.section}>
          <div className={`wrap ${styles.about}`}>
            <div>
              <p className="eyebrow">What we&apos;re about</p>
              <h2 className="sectionTitle">We meet up and build stuff.</h2>
            </div>
            <div className={styles.aboutBody}>
              <p>
                <a href="https://hackclub.com">Hack Club</a> is a nonprofit with student-run coding
                clubs at high schools all over the world. This is the one at Folsom High.
              </p>
              <p>
                We meet in {room} after school every other Monday. Some weeks someone teaches a
                short workshop, like how to make a website or a Discord bot. Other weeks you just
                work on your own thing, and there&apos;s always someone around if you get stuck.
              </p>
              <p>
                Hack Club also runs online programs where you can get free hardware and stickers for
                finishing projects, and there are hackathons we can go to together.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.who}`}>
          <div className="wrap">
            <p className="eyebrow">Who it&apos;s for</p>
            <h2 className="sectionTitle">Anyone at FHS can join.</h2>
            <div className={styles.cards}>
              {audiences.map((audience) => (
                <article
                  key={audience.title}
                  className={styles.card}
                  style={{ "--accent": audience.accent } as CSSProperties}
                >
                  <h3>{audience.title}</h3>
                  <p>{audience.body}</p>
                </article>
              ))}
            </div>
            <p className={styles.fineprint}>Any grade, any skill level. It&apos;s free and you don&apos;t have to apply.</p>
          </div>
        </section>

        <section id="meetings" className={styles.meetings}>
          <div className={`wrap ${styles.meetGrid}`}>
            <div className={styles.placard} aria-hidden="true">
              <div className={styles.room}>{room}</div>
              <div className={styles.placardSub}>Hack Club · Mon 3:40</div>
              <Image
                src="https://assets.hackclub.com/icon-rounded.svg"
                alt=""
                width={256}
                height={256}
                className={styles.sticker}
                unoptimized
              />
            </div>
            <div>
              <p className="eyebrow">Where &amp; when</p>
              <h2 className="sectionTitle">We meet every other Monday after school.</h2>
              <dl className={styles.facts}>
                <div>
                  <dt>When</dt>
                  <dd>{cadence}</dd>
                </div>
                <div>
                  <dt>Time</dt>
                  <dd>{time}</dd>
                </div>
                <div>
                  <dt>Room</dt>
                  <dd>{room}</dd>
                </div>
              </dl>
              <p className={styles.note}>
                The next meeting is <strong><NextMeeting /></strong>. We don&apos;t meet during
                breaks or holidays, so check <a href={instagramUrl}>@{site.instagram}</a> if
                you&apos;re not sure. It&apos;s fine to show up late.
              </p>
            </div>
          </div>
        </section>

        <section id="join" className={styles.section}>
          <div className="wrap">
            <p className="eyebrow">How to join</p>
            <h2 className="sectionTitle">It&apos;s pretty easy.</h2>
            <ol className={styles.steps}>
              <li className={styles.step}>
                <span className={`${styles.stepNum} gradientText`}>01</span>
                <h3>Show up to {room}</h3>
                <p>
                  Come to any meeting and say hi. Bring a laptop if you have one.
                </p>
              </li>
              <li className={styles.step}>
                <span className={`${styles.stepNum} gradientText`}>02</span>
                <h3>Fill out the interest form</h3>
                <p>This way we know you&apos;re interested and can remind you before meetings.</p>
                <InterestForm className={styles.stepLink} label="Open the form →" />
              </li>
              <li className={styles.step}>
                <span className={`${styles.stepNum} gradientText`}>03</span>
                <h3>Join the Hack Club Slack</h3>
                <p>
                  It&apos;s a big group chat with thousands of teens from Hack Club. You can ask
                  questions, share what you&apos;re working on, and find stuff to do between meetings.
                </p>
                <a href={site.slack} className={styles.stepLink}>
                  Join Slack →
                </a>
              </li>
            </ol>
          </div>
        </section>

        <section id="photos" className={`${styles.section} ${styles.photos}`}>
          <div className="wrap">
            <p className="eyebrow">Photos</p>
            <h2 className="sectionTitle">From the club</h2>
            <Gallery />
          </div>
        </section>

        <section className={styles.cta}>
          <div className="wrap">
            <h2>See you in {room}.</h2>
            <p>
              {cadence}, {time}. Have a question?
            </p>
            <Link href="/contact" className={`btn ${styles.ctaButton}`}>
              Get in touch
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
