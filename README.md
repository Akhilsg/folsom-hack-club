# Folsom Hack Club

Website for the Folsom High School chapter of [Hack Club](https://hackclub.com). Built with Next.js and TypeScript, styled with the [Hack Club brand](https://hackclub.com/brand).

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Updating the site

- **Club details** (email, Instagram, interest form link, meeting time/room) are all in `src/lib/site.ts`.
- **Meeting dates**: set `meeting.firstMeeting` to any Monday that's a meeting day. The "next meeting" date counts forward from it in two-week steps.
- **Photos**: drop images (`.jpg`, `.png`, `.webp`, …) into `public/photos/`. They show up in the Photos section, sorted by filename, with the filename as the caption: `01-first-meeting.jpg` becomes "first meeting". Restart the dev server or rebuild after adding photos.

## Pages

- `/` has the hero, about, who it's for, meetings, how to join, and photos
- `/contact` has a contact form (opens the visitor's email app), contact info, and an FAQ
