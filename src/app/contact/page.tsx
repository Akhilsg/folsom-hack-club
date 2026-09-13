import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { instagramUrl, site } from "@/lib/site";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Folsom High School's Hack Club.",
};

const { cadence, time, room } = site.meeting;

const faqs = [
  {
    q: "Do I need to know how to code?",
    a: "Nope. Plenty of people come in having never written a line of code. We'll get you started.",
  },
  {
    q: "Do I need a laptop?",
    a: "It helps, but it's not required. A school Chromebook works for a lot of what we do, and if you don't have anything, let us know and we'll figure it out.",
  },
  {
    q: "Does it cost anything?",
    a: "No. The club is free, and so is everything Hack Club runs for students.",
  },
  {
    q: "The year already started. Can I still join?",
    a: `Yes, any time. Just show up to the next meeting in ${room}.`,
  },
  {
    q: "Can I run a workshop or help lead the club?",
    a: "Please do. Send us a message with what you'd want to teach or help with.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        <header className={styles.header}>
          <div className="wrap">
            <p className="eyebrow">Contact</p>
            <h1>Say hi.</h1>
            <p className={styles.lead}>
              Questions about the club, an idea for a workshop, or want to help run things? Send us
              a message, or just catch us in {room}.
            </p>
          </div>
        </header>

        <div className={`wrap ${styles.body}`}>
          <div className={styles.grid}>
            <div className={styles.formCard}>
              <ContactForm />
            </div>

            <ul className={styles.methods}>
              <li className={styles.method}>
                <p className={styles.methodLabel}>Email</p>
                <a href={`mailto:${site.email}`} className={styles.methodValue}>
                  {site.email}
                </a>
              </li>
              <li className={styles.method}>
                <p className={styles.methodLabel}>Instagram</p>
                <a href={instagramUrl} className={styles.methodValue}>
                  @{site.instagram}
                </a>
              </li>
              <li className={styles.method}>
                <p className={styles.methodLabel}>In person</p>
                <span className={styles.methodValue}>Room {room}</span>
                <p className={styles.methodNote}>
                  {cadence}, {time}
                </p>
              </li>
              <li className={styles.method}>
                <p className={styles.methodLabel}>Hack Club Slack</p>
                <a href={site.slack} className={styles.methodValue}>
                  hackclub.com/slack
                </a>
              </li>
            </ul>
          </div>

          <section className={styles.faq}>
            <p className="eyebrow">FAQ</p>
            <h2 className="sectionTitle">Stuff people usually ask</h2>
            <div className={styles.faqList}>
              {faqs.map((faq) => (
                <details key={faq.q} className={styles.faqItem}>
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
