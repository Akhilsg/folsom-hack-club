// Everything club-specific lives here, so updating the site is mostly editing this file.
export const site = {
  name: "Folsom Hack Club",
  school: "Folsom High School",

  meeting: {
    cadence: "Every other Monday",
    time: "3:40 – 4:30 PM",
    room: "F204",
    // Any Monday that is (or was) a meeting day, as YYYY-MM-DD. The "next meeting"
    // date on the site counts forward from here in two-week steps.
    firstMeeting: "2026-09-14",
    endsAt: { hour: 16, minute: 30 },
  },

  email: "fhshackclub@gmail.com",
  instagram: "fhshack_club",

  slack: "https://hackclub.com/slack",

  // Shown on /about. To add a photo, drop `<photo>.jpg` (or .png/.webp) into public/officers/.
  officers: [
    { name: "Taksh Nahata", role: "President", grade: "Junior", photo: "taksh" },
    { name: "Akhil Gupta", role: "Vice President", grade: "Junior", photo: "akhil" },
    { name: "Shivam Sharma", role: "Secretary", grade: "Junior", photo: "shivam" },
    { name: "Surya Mandalapu", role: "Treasurer", grade: "Junior", photo: "surya" },
  ],
};

export const instagramUrl = `https://instagram.com/${site.instagram}`;
