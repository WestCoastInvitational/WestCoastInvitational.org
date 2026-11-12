export interface Sponsor {
  name: string;
  logo?: string;
  url?: string;
}

// Add sponsors here as they're confirmed. Each list shows "announcing soon" while it's empty.
export const presentingSponsors: Sponsor[] = [];
export const eventSponsors: Sponsor[] = [
  { name: "FRCtees", logo: "/sponsors/frctees.svg", url: "https://frctees.com" },
];
