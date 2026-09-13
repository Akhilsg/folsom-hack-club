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

  // TODO: swap these placeholders for the real ones.
  email: "folsomhackclub@example.com",
  instagram: "folsomhackclub",
  interestForm: "https://forms.gle/REPLACE_ME",

  slack: "https://hackclub.com/slack",
};

export const instagramUrl = `https://instagram.com/${site.instagram}`;
