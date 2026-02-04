import type { Event } from "./event-types.js";

export interface NonTechnicalEvent extends Event {
  category: "non-tech";
}

export const nonTechnicalEvents: NonTechnicalEvent[] = [
  {
    id: "forensiq",
    name: "FORENSiQ",
    tagline: "Can you catch the killer before time runs out?",
    description: [
      "An immersive forensic murder mystery where participants step into the role of investigators to analyze clues, decode evidence, and uncover the truth before time runs out.",
      "The event simulates real-life criminal investigations where teams must base their conclusions strictly on evidence released during progressive rounds.",
    ],
    eventHighlights: [
      "Collect and analyze staged crime-scene evidence",
      "Decode timelines and interrogate suspects",
      "Fast-paced deduction with team coordination",
    ],
    keywords: ["mystery", "forensics", "team"],
    colors: "Smoky dark backdrop with neon orange evidence markers.",
    category: "non-tech",
  },
  {
    id: "bech-ke-dikha",
    name: "Bech ke Dikha",
    tagline: "from pitch to profit",
    description: [
      "Inspired by reality-show style challenges, this event tests participants' sales skills, creativity, confidence, communication, and persuasion under unusual and high-pressure conditions.",
      "Participants are challenged to sell a basket of unusual and low-value items to people across the college campus while keeping the activity fun and campus-appropriate.",
    ],
    eventHighlights: [
      "Sell unusual and low-value items across campus",
      "High-pressure sales and persuasion challenges",
      "Creative and humorous presentation styles encouraged",
    ],
    keywords: ["sales", "marketing", "creativity", "persuasion"],
    colors: "",
    category: "non-tech",
  },
  {
    id: "human-foosball",
    name: "Human Foosball",
    tagline: "Play like a table, think like a team!",
    description: [
      "Human Foosball is a fun, high-energy sports event where participants play football while restricted to fixed horizontal positions, mimicking a real foosball table.",
      "Players are tied to horizontal ropes and can only move left or right, focusing on teamwork and strategy to score the maximum number of goals.",
    ],
    eventHighlights: [
      "Life-sized foosball lanes and rods",
      "Quick passing and synchronized movement",
      "Short, energetic matches for fast brackets",
    ],
    keywords: ["sports", "team", "speed"],
    colors: "Turf textures with neon orange lane dividers.",
    category: "non-tech",
  },
  {
    id: "high-on-hogwarts",
    name: "High on Hogwarts",
    tagline: "Earn the glory.",
    description: [
      "House Cup is a two-day immersive wizarding event inspired by the magical world of Harry Potter, where participants are grouped into houses based on personality traits and compete in magical trials to earn points and claim ultimate victory.",
      "The event includes multiple magical challenges such as wizarding trivia, potion mixing, spell decoding rounds, and a campus-wide Horcrux hunt.",
    ],
    eventHighlights: [
      "House-based challenges across two days",
      "Spellbinding puzzles and physical trials",
      "Live scoreboard with point swings",
    ],
    keywords: ["fantasy", "puzzle", "house"],
    colors: "Midnight halls with neon orange crest accents.",
    category: "non-tech",
  },
  {
    id: "commando-fitness",
    name: "Commando Fitness",
    tagline: "Strength. Stability. Control.",
    description: [
      "A college-level physical fitness challenge designed to test strength, endurance, and body control through timed drills.",
    ],
    eventHighlights: [
      "Structured stations for endurance and strength",
      "Time-bound heats with judges on form",
      "Solo leaderboard with progressive difficulty",
    ],
    keywords: ["fitness", "endurance", "strength"],
    colors: "Steely gradients with neon orange pace lines.",
    category: "non-tech",
  },
  {
    id: "project-polaris",
    name: "PROJECT POLARIS",
    tagline: "Navigate the lies. Uncover the truth.",
    description: [
      "Project Polaris is a live-action mystery experience that translates the suspense and strategy of 'Among Us' into a physical campus event.",
      "Participants are secretly assigned roles as Crew Members or Impostors, with Crew Members completing tasks while Impostors attempt to sabotage the mission and eliminate players.",
    ],
    eventHighlights: [
      "Role-based play with hidden impostors",
      "Campus-wide tasks and sabotage alerts",
      "Rapid debriefs and vote-outs each round",
    ],
    keywords: ["mystery", "social", "deduction"],
    colors: "Dark space backdrop with neon orange mission pings.",
    category: "non-tech",
  },
  {
    id: "human-ludo",
    name: "Human Ludo",
    tagline: "Roll big, run fast, reach home.",
    description: [
      "A real-life adaptation of the classic board game where participants act as live game pieces on a large ground-based board.",
      "The event blends traditional movement based on dice rolls with interactive twists like riddles and advantage-disadvantage challenges.",
    ],
    eventHighlights: [
      "Life-sized board with color-coded lanes",
      "Dice-driven moves and safe zones",
      "Team relays to capture and reach home",
    ],
    keywords: ["ludo", "race", "team"],
    colors: "Playful board colors under a neon orange glow.",
    category: "non-tech",
  },
  {
    id: "rc-rush",
    name: "RC Rush",
    tagline: "Control the speed. Rule the track.",
    description: [
      "An exciting time-trial RC car challenge where participants navigate a specially designed obstacle track.",
      "The focus is on driving skill, control, and precision as participants use a common RC car provided by organizers to ensure fair competition.",
    ],
    eventHighlights: [
      "Custom obstacle track with jumps and banks",
      "Timed solo runs with penalties for hits",
      "Tuning tips and quick practice laps",
    ],
    keywords: ["rc", "racing", "speed"],
    colors: "Asphalt textures with neon orange track lights.",
    category: "non-tech",
  },
  {
    id: "unbound-creative-carnival",
    name: "Unbound: The Creative Carnival",
    tagline: "Where fun has no limits and creativity has no rules.",
    description: [
      "A creative sanctuary that invites participants to explore art through activities like pottery, quilling, and painting without prior skills or pressure.",
      "The event is designed as a relaxation-focused carnival where teams can rotate through different artistic stations.",
    ],
    eventHighlights: [
      "Multiple craft corners: pottery, quilling, painting",
      "Guides to help beginners get started",
      "Showcase area for finished creations",
    ],
    keywords: ["art", "craft", "creative"],
    colors: "Warm studio tones with neon orange highlights on tools.",
    category: "non-tech",
  },
  {
    id: "box-cricket",
    name: "Box Cricket",
    tagline: "Fast games. Fierce rivalries.",
    description: [
      "A fast-paced and compact version of traditional cricket played in a small enclosed 'box' area.",
      "Designed for maximum excitement, the format emphasizes speed, strategy, and teamwork in a high-energy arena.",
    ],
    eventHighlights: [
      "Enclosed pitch with boundary rules",
      "Short innings for rapid brackets",
      "Focus on power hitting and sharp fielding",
    ],
    keywords: ["cricket", "fast", "tournament"],
    colors: "Indoor court palette lit with neon orange seam lines.",
    category: "non-tech",
  },
  {
    id: "stranger-things-upside-down-quest",
    name: "Stranger Things: The Upside-Down Quest",
    tagline: "The gate is open. Will your team escape?",
    description: [
      "A theme-based treasure hunt and elimination event inspired by the 'Stranger Things' universe.",
      "Teams must decode clues and survive progressive challenges across campus locations reimagined as the Upside Down.",
    ],
    eventHighlights: [
      "Story-led clues across multiple locations",
      "Puzzle locks and code breaking",
      "Race against time to seal the gate",
    ],
    keywords: ["treasure", "puzzle", "stranger-things"],
    colors: "Neon orange rift effects over dark Hawkins-inspired maps.",
    category: "non-tech",
  },
  {
    id: "pickleball",
    name: "Pickleball Showdown",
    tagline: "Fast hands, smart shots, pure fun!",
    description: [
      "Pickleball Showdown is a fast-paced paddle sport that blends elements of tennis, badminton, and table tennis into one exciting game.",
      "Played on a compact court with quick rallies and sharp reflexes, the event emphasizes strategy, communication, and precision over raw power.",
    ],
    eventHighlights: [
      "Compact court with bold boundary lines",
      "Rapid volleys and tactical dinks at the net",
      "Short, competitive matches for high-energy brackets",
    ],
    keywords: ["sports", "racket", "team", "strategy"],
    colors: "Clean court blues and greens with neon yellow highlights.",
    category: "non-tech",
    rules: {
      singles: {
        title: "SINGLES PICKLEBALL RULES",
        sections: [
          {
            number: "1",
            title: "Match Format:",
            items: [
              {
                subtitle: "Scoring System:",
                points: [
                  "Games are played to 11 points, and a player must win by 2 points.",
                  "Only the server can score points.",
                ],
              },
            ],
          },
          {
            number: "2",
            title: "Serve Rotation & Rules",
            items: [
              {
                subtitle: "Serving Rules:",
                points: [
                  "Serve must be underhand with the paddle.",
                  "The ball must be served diagonally to the opponent's service area.",
                  "The serve must clear the non-volley zone (kitchen).",
                ],
              },
              {
                subtitle: "Rotation:",
                points: [
                  "Serve starts from the right-hand side when the score is even and the left-hand side when odd.",
                  "The server continues serving until they commit a fault, then the opponent gets to serve.",
                ],
              },
            ],
          },
          {
            number: "3",
            title: "Court Rules & Gameplay",
            items: [
              {
                subtitle: "Double-Bounce Rule:",
                points: [
                  "After the serve, each side must let the ball bounce once before hitting it.",
                ],
              },
              {
                subtitle: "Non-Volley Zone (Kitchen) Rule:",
                points: [
                  "Players cannot hit the ball out of the air while standing inside the kitchen.",
                ],
              },
              {
                subtitle: "Out of Bounds:",
                points: [
                  "If the ball lands outside the court lines, it is out, and the other player earns the point.",
                ],
              },
            ],
          },
          {
            number: "4",
            title: "Other Rules:",
            items: [
              {
                subtitle: "Faults:",
                points: [
                  "The serve is out of bounds, touches the kitchen, or doesn't clear the net.",
                  "Volleying from the kitchen.",
                  "Failing to follow the double-bounce rule.",
                ],
              },
              {
                subtitle: "Timeouts:",
                points: [
                  "Each player is allowed 1 timeout (60 seconds) per game.",
                ],
              },
              {
                subtitle: "Fair Play:",
                points: [
                  "Line calls are made in good faith using the honor system.",
                ],
              },
            ],
          },
        ],
      },
      doubles: {
        title: "DOUBLES PICKLEBALL RULES",
        sections: [
          {
            number: "1",
            title: "Match Format:",
            items: [
              {
                subtitle: "Scoring System:",
                points: [
                  "Games are played to 11 points, and a player must win by 2 points.",
                  "Only the server can score points.",
                ],
              },
            ],
          },
          {
            number: "2",
            title: "Serve Rotation & Rules",
            items: [
              {
                subtitle: "Serving Rules:",
                points: [
                  "Serve must be underhand with the paddle.",
                  "The ball must be served diagonally to the opponent's service area.",
                  "The serve must clear the non-volley zone (kitchen).",
                ],
              },
              {
                subtitle: "Rotation:",
                points: [
                  "Both teammates get to serve before the serve rotates to the other team.",
                  "Each player serves once, alternating every 2 points.",
                  "At the start of the game, only one player from the first-serving team serves before a side-out occurs.",
                ],
              },
            ],
          },
          {
            number: "3",
            title: "Court Rules & Gameplay",
            items: [
              {
                subtitle: "Double-Bounce Rule:",
                points: [
                  "After the serve, each side must let the ball bounce once before hitting it.",
                ],
              },
              {
                subtitle: "Non-Volley Zone (Kitchen) Rule:",
                points: [
                  "Players cannot hit the ball out of the air while standing inside the kitchen.",
                ],
              },
              {
                subtitle: "Positioning:",
                points: [
                  "Players must stick to their starting positions and switch sides only after a point is scored.",
                ],
              },
            ],
          },
          {
            number: "4",
            title: "Other Rules:",
            items: [
              {
                subtitle: "Faults:",
                points: [
                  "The serve is out of bounds, touches the kitchen, or doesn't clear the net.",
                  "Volleying from the kitchen.",
                  "Failing to follow the double-bounce rule.",
                ],
              },
              {
                subtitle: "Timeouts:",
                points: [
                  "Each player is allowed 1 timeout (60 seconds) per game.",
                ],
              },
              {
                subtitle: "Fair Play:",
                points: [
                  "Line calls are made in good faith using the honor system.",
                ],
              },
            ],
          },
        ],
      },
    },
  },
];
