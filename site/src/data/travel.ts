export interface TravelOption {
  heading: string;
  body: string;
  link?: { label: string; url: string };
}

// Drafted from public sources. Have someone check this before the site goes live.
export const gettingHere: TravelOption[] = [
  {
    heading: "By air",
    body: "Seattle-Tacoma International Airport (SEA) is the nearest major airport. Sound Transit Route 574 runs between the airport and Tacoma Dome Station.",
    link: { label: "Sound Transit", url: "https://www.soundtransit.org" },
  },
  {
    heading: "By train",
    body: "Amtrak stops at Tacoma Dome Station. Sounder commuter trains connect the same station with King Street Station in Seattle.",
    link: { label: "Amtrak", url: "https://www.amtrak.com" },
  },
  {
    heading: "By ferry",
    body: "Washington State Ferries run between Point Defiance in Tacoma and Tahlequah on Vashon Island.",
    link: { label: "Washington State Ferries", url: "https://wsdot.com/ferries" },
  },
  {
    heading: "Around Tacoma",
    body: "Pierce Transit runs local buses, with connections at Tacoma Dome Station.",
    link: { label: "Pierce Transit", url: "https://www.piercetransit.org" },
  },
];
