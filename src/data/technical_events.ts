import type { Event } from "./event-types.js";

export interface TechnicalEvent extends Event {
  category: "tech";
  neonColor?: "cyan" | "blue" | "purple" | "pink" | "green" | "orange" | "red";
}

export const technicalEvents: TechnicalEvent[] = [
  {
    id: "shark-tank-ssip-startup-pitch",
    name: "Shark Tank: SSIP Startup Pitch",
    tagline: "Pitch bold ideas to SSIP mentors and investors.",
    description: [
      "An open innovation pitch platform focusing on originality and entrepreneurial thinking for startup ideas or early-stage solutions.",
    ],
    eventHighlights: [
      "Open innovation pitch in front of SSIP mentors",
      "Emphasis on originality, market validation, and feasibility",
      "Feedback on business model, risks, and prototype readiness",
    ],
    keywords: ["startup", "pitch", "innovation"],
    colors: "Neon pink highlights on a deep charcoal backdrop.",
    category: "tech",
    neonColor: "cyan",
  },
  {
    id: "urban-genesis-estate-empire",
    name: "Urban Genesis / Estate Empire",
    tagline: "Build and survive in a collapsing city sim.",
    description: [
      "An intense offline strategy simulation involving market crashes and tech limits where teams build and manage a city.",
    ],
    eventHighlights: [
      "Offline strategy with sudden market crashes",
      "Balance tech limits, resources, and expansion",
      "Team-based city building with risk trade-offs",
    ],
    keywords: ["strategy", "simulation", "city"],
    colors: "Graphite grids with neon pink accents for city overlays.",
    category: "tech",
    neonColor: "blue",
  },
  {
    id: "designx-ultimate-design-challenge",
    name: "DesignX - The Ultimate Design Challenge",
    tagline: "Speed-run design rounds that test fundamentals.",
    description: [
      "A multi-round design showdown testing creativity, design fundamentals, and presentation skills using tools like Figma and Canva.",
    ],
    eventHighlights: [
      "Rapid design briefs across multiple rounds",
      "Judging on fundamentals, clarity, and creativity",
      "Pitch your concepts with tight storytelling",
    ],
    keywords: ["design", "figma", "pitch"],
    colors: "Clean dark canvas with neon pink callouts and grids.",
    category: "tech",
    neonColor: "purple",
  },
  {
    id: "techtonic",
    name: "TechTonic",
    tagline: "Timelines, tech trivia, and rapid pitching.",
    description: [
      "A fast-paced team event involving technology timelines, concept explanations, and pitching unconventional technologies.",
    ],
    eventHighlights: [
      "Technology timeline face-offs",
      "Explain and demo unfamiliar concepts under time",
      "Pitch unconventional technologies with flair",
    ],
    keywords: ["trivia", "pitch", "timeline"],
    colors: "Neon pink signal lines over dim gradients.",
    category: "tech",
    neonColor: "pink",
  },
  {
    id: "techtrash",
    name: "TechTrash",
    tagline: "Turn e-waste into impact-focused builds.",
    description: [
      "An event where participants transform e-waste and discarded tech materials into innovative models to address environmental problems.",
    ],
    eventHighlights: [
      "Hands-on build using e-waste and scraps",
      "Judge on creativity, feasibility, and impact",
      "Highlight sustainability and reuse at every step",
    ],
    keywords: ["sustainability", "hardware", "maker"],
    colors: "Recycled metallics with neon pink edge lighting.",
    category: "tech",
    neonColor: "green",
  },
  {
    id: "stealscape-think-steal-escape",
    name: "STEALSCAPE: THINK STEAL ESCAPE",
    tagline: "Race through a digital heist and escape.",
    description: [
      "A high-octane tech heist involving a digital maze and AI-powered escape challenges across three rounds.",
    ],
    eventHighlights: [
      "AI-assisted clues across a digital maze",
      "Three escalating rounds with timed escapes",
      "Blend puzzles, stealth, and quick decision making",
    ],
    keywords: ["puzzle", "ai", "escape"],
    colors: "Dark heist palette lit with neon pink traces.",
    category: "tech",
    neonColor: "orange",
  },
  {
    id: "ghostbusters",
    name: "GhostBusters",
    tagline: "Hunt hidden Wi-Fi beacons with ESP32 rigs.",
    description: [
      "A hands-on cybersecurity challenge to hunt hidden Wi-Fi beacons using ESP32 microcontrollers and RSSI data analysis.",
    ],
    eventHighlights: [
      "Use ESP32 kits to sweep for rogue beacons",
      "Analyze RSSI signals to triangulate sources",
      "Score on accuracy, speed, and clean reporting",
    ],
    keywords: ["cybersecurity", "wifi", "esp32"],
    colors: "Signal maps in neon pink with radar rings.",
    category: "tech",
    neonColor: "red",
  },
  {
    id: "feud-exe",
    name: "Feud.exe",
    tagline: "Predict the crowd to stay in the game.",
    description: [
      "A team-based showdown powered by real student survey data where teams predict crowd responses in elimination rounds.",
    ],
    eventHighlights: [
      "Gameplay driven by real survey datasets",
      "Elimination rounds that reward sharp instincts",
      "Teams debate, lock answers, and climb the board",
    ],
    keywords: ["survey", "strategy", "game"],
    colors: "Neon pink scoreboards on a smoky backdrop.",
    category: "tech",
    neonColor: "cyan",
  },
  {
    id: "sync-or-sink",
    name: "Sync or Sink",
    tagline: "Navigate branching storylines to the true ending.",
    description: [
      "A story-driven decision game where teams navigate interactive storylines and branching paths to find a true ending.",
    ],
    eventHighlights: [
      "Interactive narrative with multiple branches",
      "Consequences stack across every decision",
      "Find the authentic ending before time runs out",
    ],
    keywords: ["story", "decision", "puzzle"],
    colors: "Neon pink path highlights over deep indigo.",
    category: "tech",
    neonColor: "blue",
  },
  {
    id: "hydrohustle",
    name: "HydroHustle",
    tagline: "Build and launch water rockets for distance wins.",
    description: [
      "A water rocket workshop and competition focusing on aerodynamics, propulsion, and distance-based launching.",
    ],
    eventHighlights: [
      "Workshop on fins, stability, and propulsion",
      "Hands-on build followed by launch trials",
      "Score on distance, consistency, and safety",
    ],
    keywords: ["rocketry", "aero", "workshop"],
    colors: "Night sky blues with neon pink exhaust trails.",
    category: "tech",
    neonColor: "purple",
  },
  {
    id: "ctf-capture-the-flag",
    name: "CTF (Capture the Flag)",
    tagline: "Crack web, crypto, reversing, and forensics challenges.",
    description: [
      "A cybersecurity competition involving web security, cryptography, reverse engineering, and digital forensics.",
    ],
    eventHighlights: [
      "Diverse categories with beginner to advanced flags",
      "Time-boxed challenges with live scoreboard",
      "Collaboration-heavy team play and writeups",
    ],
    keywords: ["security", "ctf", "hacking"],
    colors: "Terminal greens blended with neon pink highlights.",
    category: "tech",
    neonColor: "pink",
  },
  {
    id: "game-of-prompts",
    name: "Game of Prompts",
    tagline: "Use AI prompting to build and repair game ideas.",
    description: [
      "A multi-round AI-powered game creation challenge where teams use prompt engineering to build and repair game concepts.",
    ],
    eventHighlights: [
      "Prompt engineering to craft game loops",
      "Fix broken mechanics across rounds",
      "Blend creativity with AI tooling for speed",
    ],
    keywords: ["ai", "prompt", "game-dev"],
    colors: "Neon pink HUD elements over dark UI panels.",
    category: "tech",
    neonColor: "green",
  },
  {
    id: "tradex-2-quiz-stock-market",
    name: "TradeX 2.0 - Quiz-Based Stock Market Simulation",
    tagline: "Trade smarter as quiz outcomes move the market.",
    description: [
      "A stock market simulation where trading is influenced by quiz outcomes, market news, and risk-taking decisions.",
    ],
    eventHighlights: [
      "Live quiz results drive market swings",
      "Balance risk, liquidity, and timing",
      "Leaderboard tracks gains across volatile rounds",
    ],
    keywords: ["finance", "simulation", "quiz"],
    colors: "Market tickers in neon pink with grid backdrops.",
    category: "tech",
  },
  {
    id: "vr-arena-ultimate-experience",
    name: "VR Arena: The Ultimate AR-VR Experience",
    tagline: "Step into immersive AR and VR worlds.",
    description: [
      "An immersive experience using VR headsets and consoles to explore virtual worlds and interactive games.",
    ],
    eventHighlights: [
      "Curated VR and AR experiences with guides",
      "Safe play zones with quick rotations",
      "Mix of exploration, rhythm, and action titles",
    ],
    keywords: ["vr", "ar", "immersive"],
    colors: "Holographic gradients with neon pink glow.",
    category: "tech",
    neonColor: "red",
  },
  {
    id: "the-hangar-room",
    name: "The Hangar Room",
    tagline: "Experience aviation fundamentals up close.",
    description: [
      "An experiential aviation event covering aerodynamics, aircraft structures, and remote flight operations.",
    ],
    eventHighlights: [
      "Demos on lift, drag, and stability",
      "Hands-on with model aircraft structures",
      "Remote flight sessions under supervision",
    ],
    keywords: ["aviation", "aerodynamics", "flight"],
    colors: "Runway slate with neon pink runway lights.",
    category: "tech",
    neonColor: "cyan",
  },
  {
    id: "case-closed",
    name: "CASE CLOSED?",
    tagline: "Solve an AI-assisted murder mystery over two days.",
    description: [
      "A two-day AI-powered murder mystery using Google NotebookLM to build and solve crime narratives.",
    ],
    eventHighlights: [
      "Use NotebookLM to stitch clues and evidence",
      "Collaborative narrative building across days",
      "Present the final theory with proof to win",
    ],
    keywords: ["ai", "mystery", "investigation"],
    colors: "Noir palettes punctuated by neon pink threads.",
    category: "tech",
    neonColor: "blue",
  },
  {
    id: "dreamflow",
    name: "Dreamflow",
    tagline: "Build mobile apps with natural language prompts.",
    description: [
      "An AI-first mobile app building session using natural language prompts and the FlutterFlow platform.",
    ],
    eventHighlights: [
      "Prompt-driven UI and logic generation",
      "Iterate fast with visual previews in FlutterFlow",
      "Ship polished app flows without deep coding",
    ],
    keywords: ["no-code", "ai", "flutterflow"],
    colors: "Soft gradients with bright neon pink edges.",
    category: "tech",
  },
];
