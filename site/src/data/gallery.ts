import type { ImageMetadata } from "astro";

export interface GalleryPhoto {
  /** File name in src/assets/img/gallery. */
  file: string;
  /** Describes the photo for screen readers. Not shown on the page. */
  alt: string;
}

// One list per row, top to bottom. Keep every photo in just one row.
export const galleryRows: GalleryPhoto[][] = [
  [
    { file: "field-wide-emcee.jpg", alt: "An emcee in a rainbow skirt hosts beside the competition field while a match plays on the big screen" },
    { file: "robot-9880.jpg", alt: "Team 9880's robot with a red number plate on the field" },
    { file: "pits-costumes.jpg", alt: "Students gather around a robot in the pits, one wearing a full armored costume" },
    { file: "robot-99942.jpg", alt: "Team 99942's robot with purple parts on the field" },
    { file: "lime-hats-trophy.jpg", alt: "Four team members in matching lime hats holding a WCI trophy" },
    { file: "emcee-tutu.jpg", alt: "An emcee in a rainbow tutu speaks into a microphone" },
    { file: "overcharged-pair.jpg", alt: "Two students in blue Overcharged team shirts beside the field" },
    { file: "costumes-robot.jpg", alt: "Students in costumes, including a squid hat and black armor, around a robot" },
    { file: "scoring-table.jpg", alt: "A volunteer reaches across the scoring table beside a laptop and a large penguin plush" },
    { file: "robot-23511.jpg", alt: "Team 23511's yellow robot seen through the field wall" },
    { file: "quality-control-trophy.jpg", alt: "Four team members in blue Quality Control shirts holding a WCI trophy" },
    { file: "volunteers-seated.jpg", alt: "Three volunteers sitting in chairs in the gym, one waving" },
  ],
  [
    { file: "robot-14343.jpg", alt: "Team 14343's robot reaching with a yellow arm on the field" },
    { file: "penguin-mascot.jpg", alt: "A smiling penguin plush sitting on a computer at the scoring table" },
    { file: "robot-4131.jpg", alt: "Team 4131's low black robot with teal lights on a tile floor" },
    { file: "robots-on-table.jpg", alt: "Students stand behind robots on a pit table" },
    { file: "robot-1778.jpg", alt: "Team 1778's blue robot on a low platform" },
    { file: "robot-8693.jpg", alt: "A student reaches over team 8693's robot" },
    { file: "robot-atomic.jpg", alt: "A robot on the field behind a green ATOMIC sign" },
    { file: "robot-12808-hands.jpg", alt: "Hands adjusting team 12808's robot on its cart" },
    { file: "audio-laptop.jpg", alt: "A laptop running audio software next to a rainbow fan" },
    { file: "robot-2046.jpg", alt: "Team 2046's robot on a display stand" },
    { file: "robot-blue-field.jpg", alt: "A blue robot on the field" },
    { file: "robot-19669.jpg", alt: "Team 19669's black robot with a red number plate on a pit table" },
    { file: "robot-yellow-arm.jpg", alt: "A yellow and black robot at the corner of the field" },
    { file: "robot-99942-field.jpg", alt: "A robot numbered 99942 on the field" },
    { file: "robot-8693-overhead.jpg", alt: "Overhead view of a blue and maroon robot on the field" },
  ],
  [
    { file: "gym-wide.jpg", alt: "Wide view of the gym with the field on blue tarp and spectators in the stands" },
    { file: "pit-repair.jpg", alt: "Students crouch around a robot to repair it" },
    { file: "host-peace.jpg", alt: "A volunteer host with a microphone throws up a peace sign on the field" },
    { file: "robot-12599.jpg", alt: "Students in blue hoodies working on team 12599's robot at a pit table" },
    { file: "wright-angle-trophy.jpg", alt: "Four team members in Wright Angle shirts with a WCI trophy" },
    { file: "emcee-crowd.jpg", alt: "A host in a gray hoodie speaks into a microphone in front of the stands" },
    { file: "scoring-monitors.jpg", alt: "A volunteer watches two scoring monitors at the match table" },
    { file: "robot-7759.jpg", alt: "Two students working on team 7759's tall robot at a pit table" },
    { file: "team-bw.jpg", alt: "Black and white photo of students gathered around the field" },
    { file: "check-in.jpg", alt: "Two volunteers sitting at the check-in table" },
    { file: "robot-repair-hands.jpg", alt: "Students working together to fix a robot on the floor" },
    { file: "pit-table-4054.jpg", alt: "Students working on robots at a pit table" },
  ],
];

const images = import.meta.glob<ImageMetadata>("../assets/img/gallery/*.jpg", { eager: true, import: "default" });

/** Finds a photo's image file. Fails the build if the name doesn't match a file. */
export function galleryImage(file: string): ImageMetadata {
  const image = images[`../assets/img/gallery/${file}`];
  if (!image) throw new Error(`Gallery photo not found: ${file}`);
  return image;
}
