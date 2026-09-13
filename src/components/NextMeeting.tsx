"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/lib/site";

const { firstMeeting, endsAt } = site.meeting;

function nextMeetingLabel(now: Date) {
  const [y, m, d] = firstMeeting.split("-").map(Number);
  const anchor = new Date(y, m - 1, d);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Round to whole days so daylight saving shifts don't throw the count off.
  const daysSince = Math.round((today.getTime() - anchor.getTime()) / 86_400_000);
  let offset = daysSince <= 0 ? 0 : Math.ceil(daysSince / 14) * 14;

  const meeting = new Date(anchor);
  meeting.setDate(anchor.getDate() + offset);
  meeting.setHours(endsAt.hour, endsAt.minute);
  if (now > meeting) {
    offset += 14;
    meeting.setDate(anchor.getDate() + offset);
  }

  if (meeting.toDateString() === now.toDateString()) return "Today!";
  return meeting.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

const subscribe = () => () => {};

// The date depends on the visitor's clock, so it's only filled in on the client.
export default function NextMeeting() {
  const label = useSyncExternalStore(
    subscribe,
    () => nextMeetingLabel(new Date()),
    () => null,
  );
  return <>{label ?? "Monday"}</>;
}
