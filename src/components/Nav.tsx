import Image from "next/image";
import Link from "next/link";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <header className={styles.nav}>
      <div className={`wrap ${styles.inner}`}>
        <Link href="/" className={styles.flag} aria-label="Folsom Hack Club home">
          <Image
            src="https://assets.hackclub.com/flag-orpheus-top.svg"
            alt="Hack Club"
            width={280}
            height={158}
            unoptimized
            loading="eager"
          />
        </Link>
        <nav className={styles.links} aria-label="Main">
          <Link href="/#about" className={styles.hideSmall}>About</Link>
          <Link href="/#meetings" className={styles.hideSmall}>Meetings</Link>
          <Link href="/#photos" className={styles.hideSmall}>Photos</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/#join" className={styles.join}>Join</Link>
        </nav>
      </div>
    </header>
  );
}
