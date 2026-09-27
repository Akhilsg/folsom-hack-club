import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Folsom Hack Club",
    template: "%s · Folsom Hack Club",
  },
  description:
    "Folsom High School's student-run coding club. We meet every other Monday in F204 from 3:40 to 4:30 PM. No experience needed.",
  // Icons come from app/favicon.ico, app/icon.png and app/apple-icon.png: the Hack Club
  // rounded "h" recolored in Folsom High royal blue, served from our own domain so
  // browsers reliably pick them up.
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
