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
    a: "Nope. Lots of people join without ever having coded. We'll help you get started.",
  },
  {
    q: "Do I need a laptop?",
    a: "It helps, but you don't need one. A school Chromebook works for most things. If you don't have anything, tell us and we'll figure something out.",
  },
  {
    q: "Does it cost anything?",
    a: "No, it's free.",
  },
  {
    q: "The year already started. Can I still join?",
    a: `Yes, you can join any time. Just come to the next meeting in ${room}.`,
  },
  {
    q: "Can I run a workshop or help lead the club?",
    a: "Yes! Send us a message about what you want to teach or help with.",
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
            <h1>Get in touch</h1>
            <p className={styles.lead}>
              Have a question, a workshop idea, or want to help out? Send us a message or come find
              us in {room}.
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
            <h2 className="sectionTitle">Common questions</h2>
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
