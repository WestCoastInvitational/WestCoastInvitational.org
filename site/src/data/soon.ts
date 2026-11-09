// One place to fill in what's still "announcing soon".
// Add `text` to show a sentence, or `url` to show a link. Leave both out and it says "Announcing soon".
export interface SoonItem {
  label: string;
  text?: string;
  url?: string;
}

export const soon = {
  days: { label: "Schedule for each day" },
  deadline: { label: "Application deadline" },
  refund: { label: "Refund policy" },
  teamPacket: { label: "Team information packet" },
  volunteerPacket: { label: "Volunteer information packet" },
  sponsorPacket: { label: "Sponsor packet" },
  opportunities: { label: "Sponsorship opportunities" },
  presenting: { label: "Presenting sponsor" },
  eventSponsors: { label: "Event sponsors" },
  manual: { label: "WCI Competition Manual" },
  playoffDetails: { label: "Alliance and playoff details" },
  awardsManual: { label: "Awards section of the manual" },
  specialAwards: { label: "Special awards" },
  ftcEvents: { label: "FTC Events page" },
  matchSchedule: { label: "Match schedule" },
  judgingSchedule: { label: "Judging schedule" },
  venueMap: { label: "Venue map" },
  merch: { label: "Merch" },
  phone: { label: "Phone line" },
  foodTrucks: { label: "Food trucks" },
  pizza: { label: "Pizza pre-orders" },
  loadIn: { label: "Load-in details" },
  pitBring: { label: "What to bring" },
  pitLeave: { label: "What not to bring" },
  pitSize: { label: "Pit size" },
  volunteerCheckIn: { label: "Volunteer check-in details" },
  volunteerShifts: { label: "Volunteer shift times" },
  roleDescriptions: { label: "Role descriptions" },
  hotels: { label: "Hotels" },
  restaurants: { label: "Restaurant map" },
  attractions: { label: "Attractions" },
  tours: { label: "Tours" },
  workshopSignup: { label: "Workshop sign-up" },
  currentWorkshops: { label: "Current workshops" },
  workshopSchedule: { label: "Workshop schedule" },
} satisfies Record<string, SoonItem>;

export type SoonId = keyof typeof soon;
