import { extras } from "./extras";

export interface NavPage {
  title: string;
  path: string;
  blurb: string;
}

export type Tone = "dusk" | "dusk-2" | "ocean" | "sky" | "paper" | "white";

export interface NavSection extends NavPage {
  id: string;
  menu: string;
  tone: Tone;
  pages: NavPage[];
}

export const sections: NavSection[] = [
  {
    id: "event",
    menu: "Event",
    title: "Event Details",
    path: "/event",
    blurb: "The schedule, the format, the awards, and where it all happens.",
    tone: "dusk-2",
    pages: [
      { title: "Event Schedule", path: "/event/schedule", blurb: "What happens when on event day." },
      { title: "Competition Format", path: "/event/format", blurb: "Matches, alliances, and playoffs." },
      { title: "Awards", path: "/event/awards", blurb: "What teams can take home." },
      { title: "Venue", path: "/event/venue", blurb: "Address, map, and parking." },
      { title: "Food Trucks & Pizza", path: "/event/food", blurb: "Food on site and pizza pre-orders." },
      { title: "Health & Safety", path: "/event/health-safety", blurb: "Emergency numbers and the nearest care." },
    ],
  },
  {
    id: "teams",
    menu: "Teams",
    title: "Team Info",
    path: "/teams",
    blurb: "How to apply, what to bring, and how the day runs.",
    tone: "paper",
    pages: [
      { title: "Application", path: "/teams/application", blurb: "Apply, pay, and the deadlines." },
      { title: "Quick Links", path: "/teams/quick-links", blurb: "Everything you need on event day." },
      { title: "Team Packet", path: "/teams/packet", blurb: "The full information packet." },
      { title: "Parking & Load-In", path: "/teams/parking-load-in", blurb: "Where to park and when to arrive." },
      { title: "Venue Maps", path: "/teams/venue-maps", blurb: "Find your way around Foss." },
      { title: "Pit Information", path: "/teams/pits", blurb: "What to bring, what to leave, and pit size." },
      { title: "Meet the Teams", path: "/teams/list", blurb: "Who's competing at WCI." },
    ],
  },
  {
    id: "volunteers",
    menu: "Volunteers",
    title: "Volunteers",
    path: "/volunteers",
    blurb: "Every role makes the day happen.",
    tone: "dusk",
    pages: [
      { title: "Volunteer Packet", path: "/volunteers/packet", blurb: "The full information packet." },
      { title: "Parking & Check-In", path: "/volunteers/parking-check-in", blurb: "Where to park and where to go." },
      { title: "Volunteer Schedule", path: "/volunteers/schedule", blurb: "When volunteers are needed." },
      { title: "Role Descriptions", path: "/volunteers/roles", blurb: "What each role does." },
    ],
  },
  {
    id: "sponsors",
    menu: "Sponsors",
    title: "Sponsors",
    path: "/sponsors",
    blurb: "The partners behind WCI '27.",
    tone: "white",
    pages: [{ title: "Become a Sponsor", path: "/sponsors/become", blurb: "Put your name in front of every team." }],
  },
  {
    id: "travel",
    menu: "Travel",
    title: "Travel",
    path: "/travel",
    blurb: "Getting to Tacoma and making a trip of it.",
    tone: "sky",
    pages: [
      { title: "Getting Here", path: "/travel/getting-here", blurb: "Airports, trains, ferries, and transit." },
      { title: "Hotels", path: "/travel/hotels", blurb: "Where to stay." },
      { title: "Nearby Restaurants", path: "/travel/restaurants", blurb: "Where to eat." },
      { title: "Attractions", path: "/travel/attractions", blurb: "What to see and tours." },
      { title: "International Teams", path: "/travel/international", blurb: "Visas and invitation letters." },
    ],
  },
  {
    id: "extras",
    menu: "Extras",
    title: "Extras",
    path: "/extras",
    blurb: "More than matches.",
    tone: "ocean",
    pages: extras.map((e) => ({
      title: e.title,
      path: `/extras/${e.slug}`,
      blurb: e.description ?? "Details announcing soon.",
    })),
  },
  {
    id: "contact",
    menu: "Contact",
    title: "Contact Us",
    path: "/contact",
    blurb: "Get in touch with the WCI team.",
    tone: "sky",
    pages: [],
  },
];

export const quickLinks = { title: "Quick Links", path: "/teams/quick-links" };

export interface PageMatch {
  section: NavSection;
  page: NavPage;
  isHub: boolean;
  prev?: NavPage;
  next?: NavPage;
}

/** Finds a page's section and neighbors. Fails the build if a page isn't in the menu. */
export function findPage(path: string): PageMatch {
  for (const section of sections) {
    if (section.path === path) {
      return { section, page: section, isHub: true };
    }
    const index = section.pages.findIndex((p) => p.path === path);
    if (index >= 0) {
      return {
        section,
        page: section.pages[index],
        isHub: false,
        prev: section.pages[index - 1],
        next: section.pages[index + 1],
      };
    }
  }
  throw new Error(`No menu entry for page: ${path}`);
}
