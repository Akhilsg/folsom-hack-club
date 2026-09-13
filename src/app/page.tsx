import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
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
    body: "Good, most of us started there too. Workshops assume zero experience, and nobody is going to make you feel dumb for asking a question.",
  },
  {
    accent: "var(--blue)",
    title: "Already building stuff",
    body: "Bring your side project. You'll get people to show it to, a second pair of eyes when it breaks, and maybe a teammate or two.",
  },
  {
    accent: "var(--purple)",
    title: "Not sure you're a “tech person”",
    body: "Artists, musicians, robotics people, gamers, anyone who likes making things. If you're curious how stuff works, you'll fit in fine.",
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
                A student-run club at {site.school} for making things with code: websites, games,
                bots, hardware, whatever you&apos;re into. No experience needed.
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
              <h2 className="sectionTitle">A coding club where you actually build stuff.</h2>
            </div>
            <div className={styles.aboutBody}>
              <p>
                <a href="https://hackclub.com">Hack Club</a> is a global nonprofit network of high
                school coding clubs, run by students for students. This one is Folsom High&apos;s.
              </p>
              <p>
                Every other Monday we take over {room} after school. Some weeks someone runs a
                short workshop, like building your first website or making a Discord bot. Other
                weeks it&apos;s open hacking: work on whatever you want, with people nearby who can
                help when you get stuck.
              </p>
              <p>
                Being a Hack Club also plugs you into a much bigger community, with online programs
                where teens earn hardware and stickers for projects they ship, and hackathons we can
                go to as a group.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.who}`}>
          <div className="wrap">
            <p className="eyebrow">Who it&apos;s for</p>
            <h2 className="sectionTitle">Honestly? Anyone at FHS.</h2>
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
            <p className={styles.fineprint}>Any grade, any skill level. It&apos;s free, and there&apos;s no application.</p>
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
              <h2 className="sectionTitle">Every other Monday, right after school.</h2>
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
                Next meeting: <strong><NextMeeting /></strong>. We skip school breaks and holidays,
                so if you&apos;re not sure it&apos;s a meeting week, check{" "}
                <a href={instagramUrl}>@{site.instagram}</a>. Can&apos;t make it right at 3:40? Come
                late, nobody minds.
              </p>
            </div>
          </div>
        </section>

        <section id="join" className={styles.section}>
          <div className="wrap">
            <p className="eyebrow">How to join</p>
            <h2 className="sectionTitle">Joining takes about a minute.</h2>
            <ol className={styles.steps}>
              <li className={styles.step}>
                <span className={`${styles.stepNum} gradientText`}>01</span>
                <h3>Show up to {room}</h3>
                <p>
                  Seriously, that&apos;s most of it. Come to any meeting, grab a seat, and say hi.
                  Bring a laptop if you have one.
                </p>
              </li>
              <li className={styles.step}>
                <span className={`${styles.stepNum} gradientText`}>02</span>
                <h3>Fill out the interest form</h3>
                <p>So we know you&apos;re coming and can send you reminders before meetings.</p>
                <a href={site.interestForm} className={styles.stepLink}>
                  Open the form →
                </a>
              </li>
              <li className={styles.step}>
                <span className={`${styles.stepNum} gradientText`}>03</span>
                <h3>Join the Hack Club Slack</h3>
                <p>
                  Thousands of teenagers who code hang out there. Ask questions, share what
                  you&apos;re making, and find things to do between meetings.
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
              {cadence}, {time}. Got questions first?
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
