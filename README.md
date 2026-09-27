# Folsom Hack Club

Website for the Folsom High School chapter of [Hack Club](https://hackclub.com). Built with Next.js and TypeScript, styled with the [Hack Club brand](https://hackclub.com/brand).

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Updating the site

- **Club details** (email, Instagram, meeting time/room) are all in `src/lib/site.ts`.
- **Interest form questions**: grade and experience choices are in `src/lib/signupFields.ts`; the form itself is `src/components/InterestForm.tsx`.
- **Meeting dates**: set `meeting.firstMeeting` to any Monday that's a meeting day. The "next meeting" date counts forward from it in two-week steps.
- **Officers** (names, roles, grades) are in `officers` in `src/lib/site.ts`. For headshots, drop a square-ish image named after the officer's `photo` value into `public/officers/` (e.g. `public/officers/taksh.jpg`). Until then the card shows their initials.
- **Photos**: drop images (`.jpg`, `.png`, `.webp`, …) into `public/photos/`. They show up in the Photos section, sorted by filename, with the filename as the caption: `01-first-meeting.jpg` becomes "first meeting". Restart the dev server or rebuild after adding photos.

## Pages

- `/` has the hero, about, who it's for, meetings, how to join, and photos
- `/about` has the officers, what the club is about, and what meetings look like
- `/contact` has a contact form (opens the visitor's email app), contact info, and an FAQ
- `/admin` is a password-protected table of everyone who filled out the interest form

## Sign-ups & admin

The interest form saves to [Cloud Firestore](https://firebase.google.com/docs/firestore). All database access happens on the server through the Firebase Admin SDK, so the database stays locked to the public and the admin password never reaches the browser.

### 1. Create the Firebase project (one time)

1. Go to [console.firebase.google.com](https://console.firebase.google.com) and click **Create a project**. Google Analytics isn't needed.
2. In the left sidebar, open **Build → Firestore Database → Create database**. Choose a US region (e.g. `us-west2`) and **Start in production mode**. Production mode blocks all public reads and writes, which is what we want.
3. Click the gear icon → **Project settings → Service accounts → Generate new private key**. This downloads a JSON file. Treat it like a password and don't commit it.

### 2. Set the environment variables

From that JSON file:

| Variable | Value |
| --- | --- |
| `FIREBASE_PROJECT_ID` | `project_id` |
| `FIREBASE_CLIENT_EMAIL` | `client_email` |
| `FIREBASE_PRIVATE_KEY` | `private_key` (the whole thing, in quotes, `\n`s included) |
| `ADMIN_USERNAME` | username for `/admin` |
| `ADMIN_PASSWORD` | password for `/admin` |

- **Locally**: put them in `.env.local` (see `.env.example`) and restart `npm run dev`.
- **On Vercel**: Project → Settings → Environment Variables, add all five, then redeploy.

Sign-ups are stored in the `signups` collection, one document per email, so the same person can't sign up twice. You can also view or delete them in the Firebase console. Changing `ADMIN_PASSWORD` logs out every admin session.
