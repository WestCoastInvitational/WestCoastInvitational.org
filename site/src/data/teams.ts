export interface Team {
  number: string;
  name: string;
  /** File in public/logos. Leave out to show the default FIRST logo. */
  logo?: string;
}

// Add accepted 2027 teams here. The page switches over on its own.
export const teams2027: Team[] = [];

export const teams2026: Team[] = [
  { number: "4053", name: "Mavens of Mayhem", logo: "4053.png" },
  { number: "4054", name: "Gradle Demons", logo: "4054.svg" },
  { number: "12808", name: "RevAmped Robotics", logo: "12808.jpg" },
  { number: "16655", name: "Nutz 'n Voltz" },
  { number: "16750", name: "Technototes", logo: "16750.jpg" },
  { number: "23511", name: "Seattle Solvers", logo: "23511.png" },
  { number: "23849", name: "Droid Force", logo: "23849.png" },
  { number: "24131", name: "Minutemen", logo: "24131.png" },
  { number: "25444", name: "The Reckless", logo: "25444.jpg" },
  { number: "27393", name: "The FBI - FIRST Bot Inventors" },
  { number: "28395", name: "Pixel Raptors", logo: "28395.png" },
  { number: "30624", name: "Pangolins in Disguise", logo: "30624.png" },
  { number: "99967", name: "Droid Force Jr.", logo: "99967.jpg" },
];
