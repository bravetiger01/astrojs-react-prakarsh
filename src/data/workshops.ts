import type { Event } from "./event-types.js";

export interface WorkshopEvent extends Event {
  category: "workshops";
}

export const workshopEvents: WorkshopEvent[] = [
  {
    id: "open-r-ssip-innovation-showcase",
    name: "OPEN-R: SSIP Innovation Showcase",
    tagline: "Solve real rural problems with bold prototypes.",
    description: [
      "A challenge for students to tackle rural problems using engineering solutions, pitching ideas and prototypes for impact.",
    ],
    eventHighlights: [
      "Identify rural pain points and propose solutions",
      "Build quick prototypes to demonstrate feasibility",
      "Pitch to mentors for feedback and refinement",
    ],
    keywords: ["innovation", "prototype", "ssip"],
    colors: "Clean workshop whites with neon green accent lines.",
    category: "workshops",
  },
  {
    id: "music-workshop-enlive",
    name: "Workshop for Music by Enlive",
    tagline: "Sing it. Play it. Feel it.",
    description: [
      "A hands-on music experience to explore instruments, rhythm basics, posture, and coordination through practical sessions.",
    ],
    eventHighlights: [
      "Instrument discovery across multiple stations",
      "Rhythm, posture, and coordination fundamentals",
      "Guided mini-sessions to pick your learning path",
    ],
    keywords: ["music", "rhythm", "hands-on"],
    colors: "Studio blacks with neon green equalizer bars.",
    category: "workshops",
  },
];
