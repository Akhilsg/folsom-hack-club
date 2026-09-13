import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Folsom Hack Club",
    template: "%s · Folsom Hack Club",
  },
  description:
    "Folsom High School's Hack Club: a student-run coding club that meets every other Monday in F204, 3:40–4:30 PM. No experience needed.",
  icons: {
    icon: "https://assets.hackclub.com/icon-rounded.png",
    apple: "https://assets.hackclub.com/icon-rounded.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
