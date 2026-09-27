import Image from "next/image";
import Link from "next/link";
import { instagramUrl, site } from "@/lib/site";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <div>
          <Image
            src="https://assets.hackclub.com/flag-standalone.svg"
            alt=""
            width={526}
            height={184}
            className={styles.flag}
            unoptimized
          />
          <p className={styles.name}>{site.school} Hack Club</p>
          <p className={styles.blurb}>
            A student-run club at FHS. We&apos;re part of <a href="https://hackclub.com">Hack Club</a>,
            a nonprofit for high school coding clubs.
          </p>
        </div>
        <nav className={styles.links} aria-label="Footer">
          <Link href="/about">About us</Link>
          <Link href="/#meetings">Meetings</Link>
          <Link href="/#join">Join</Link>
          <Link href="/#photos">Photos</Link>
          <Link href="/contact">Contact</Link>
          <a href={instagramUrl}>Instagram</a>
          <a href={`mailto:${site.email}`}>Email</a>
        </nav>
      </div>
    </footer>
  );
}
