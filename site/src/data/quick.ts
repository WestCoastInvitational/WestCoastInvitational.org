import { soon, type SoonId, type SoonItem } from "./soon";

export interface QuickLink {
  label: string;
  /** Leave out while it's still "Soon". */
  href?: string;
}

const pendingIds: SoonId[] = ["ftcEvents", "matchSchedule", "judgingSchedule", "venueMap", "manual", "merch"];

// Used by both the Quick Links page and the site footer.
export const quickItems: QuickLink[] = [
  { label: "Livestream", href: "/stream" },
  { label: "Schedule", href: "/event/schedule" },
  ...pendingIds.map((id): QuickLink => {
    const item: SoonItem = soon[id];
    return { label: item.label, href: item.url };
  }),
];
