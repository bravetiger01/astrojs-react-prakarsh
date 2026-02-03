import type { Event } from "./event-types.ts";
import freeFirePoster from "../assets/freefire-poster.png";
import valorantPoster from "../assets/valorant-poster.png";
import bgmiPoster from "../assets/bgmi-poster.png";

export interface EsportsEvent extends Event {
  category: "esports";
  posterImage: string;
}

export const esportsEvents: EsportsEvent[] = [
  {
    id: "ffmax-prakarsh-cup-2026",
    name: "Free Fire Max Prakarsh Cup 2026",
    tagline: "Where excellence meets fire.",
    description: [
      "A competitive Free Fire MAX tournament where top squads battle through qualifiers to claim the cup.",
    ],
    eventHighlights: [
      "Qualification rounds into high-stakes finals",
      "Team coordination and clutch play rewarded",
      "Trophy, cash prizes, and MVP honors",
    ],
    keywords: ["free-fire", "battle-royale", "tournament"],
    colors: "Deep night battlegrounds with neon purple muzzle flashes.",
    category: "esports",
    posterImage: freeFirePoster,
  },
  {
    id: "valorant-championship-prakarsh-2026",
    name: "Valorant Championship Prakarsh 2026",
    tagline: "One shot. One champion.",
    description: [
      "A 5v5 tactical showdown featuring single-elimination brackets with BO3 semis and a BO5 grand final.",
    ],
    eventHighlights: [
      "Precision gunplay and agent mastery",
      "Bracket: kick-off, R16, quarters, semis, grand final",
      "Cash prizes, trophies, and MVP gear",
    ],
    keywords: ["valorant", "fps", "tournament"],
    colors: "Agent silhouettes over neon purple spike lines.",
    category: "esports",
    posterImage: valorantPoster,
  },
  {
    id: "bgmi-prakarsh-2026",
    name: "BGMI Tournament - Prakarsh 2026",
    tagline: "Drop, loot, dominate.",
    description: [
      "Squad-based BGMI tournament with online qualifiers leading into offline finals on campus.",
    ],
    eventHighlights: [
      "Online qualifiers, semis, and offline LAN finals",
      "Placement and kill points drive the leaderboard",
      "Prizes for podium, MVP, and most kills",
    ],
    keywords: ["bgmi", "battle-royale", "lan"],
    colors: "Dusty battleground hues with neon purple tracers.",
    category: "esports",
    posterImage: bgmiPoster,
  },
];
