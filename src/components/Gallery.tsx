import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import styles from "./Gallery.module.css";

const PHOTO_DIR = path.join(process.cwd(), "public", "photos");
const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;

const placeholders = ["first meeting", "hack night", "workshop", "demo day", "sticker haul", "project showcase"];

function getPhotos() {
  try {
    return fs.readdirSync(PHOTO_DIR).filter((file) => IMAGE_EXT.test(file)).sort();
  } catch {
    return [];
  }
}

// "03-hack-night.jpg" -> "hack night"
function captionFor(file: string) {
  return file
    .replace(IMAGE_EXT, "")
    .replace(/^\d+[-_ ]*/, "")
    .replace(/[-_]+/g, " ");
}

export default function Gallery() {
  const photos = getPhotos();

  if (photos.length === 0) {
    return (
      <>
        <p className={styles.empty}>No photos yet. They&apos;ll show up here after our first few meetings.</p>
        <ul className={styles.grid} aria-hidden="true">
          {placeholders.map((caption) => (
            <li key={caption} className={styles.polaroid}>
              <div className={`${styles.frame} ${styles.placeholder}`}>coming soon</div>
              <span className={styles.caption}>{caption}</span>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <ul className={styles.grid}>
      {photos.map((file) => (
        <li key={file} className={styles.polaroid}>
          <div className={styles.frame}>
            <Image
              src={`/photos/${file}`}
              alt={captionFor(file)}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
            />
          </div>
          <span className={styles.caption}>{captionFor(file)}</span>
        </li>
      ))}
    </ul>
  );
}
