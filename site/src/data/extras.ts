import type { SoonId } from "./soon";

export interface Extra {
  slug: string;
  title: string;
  /** Size in the lineup on the Extras page: 1 is biggest. */
  tier: 1 | 2 | 3;
  /** Write a description here when the details are ready. */
  description?: string;
  /** Extra "announcing soon" items for this page. */
  items?: SoonId[];
}

export const extras: Extra[] = [
  { slug: "team-social", title: "Team Social", tier: 1 },
  { slug: "workshops", title: "Workshops", tier: 1, items: ["workshopSignup", "currentWorkshops", "workshopSchedule"] },
  { slug: "robot-photo-booth", title: "Robot Photo Booth", tier: 2 },
  { slug: "theme-days", title: "Theme Days", tier: 2 },
  { slug: "coffee-with-mentors", title: "Coffee with Mentors", tier: 2 },
  { slug: "alumni-banquet", title: "Alumni Banquet", tier: 3 },
  { slug: "parades", title: "Parade of Teams", tier: 3 },
  { slug: "demo-teams", title: "Demo Teams", tier: 3 },
  { slug: "student-ambassadors", title: "Student Ambassadors", tier: 3 },
  { slug: "alumni-senior-photo", title: "Alumni & Senior Photos", tier: 3 },
];
