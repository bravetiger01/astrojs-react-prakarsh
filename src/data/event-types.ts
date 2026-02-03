export interface RuleSection {
  number: string;
  title: string;
  items: {
    subtitle?: string;
    points: string[];
  }[];
}

export interface RuleCategory {
  title: string;
  sections: RuleSection[];
}

export interface Event {
  id: string;
  name: string;
  tagline: string;
  description: string[];
  eventHighlights: string[];
  keywords: string[];
  colors: string;
  category: "tech" | "non-tech" | "esports" | "workshops";
  rules?: {
    singles?: RuleCategory;
    doubles?: RuleCategory;
  };
  posterImage?: string;
  date?: string;
  time?: string;
  location?: string;
  esports?: {
    gameName?: string;
    tournamentName?: string;
    prizePool?: string;
    teamSize?: string;
    schedule?: { time: string; event: string }[];
    rules?: string[];
    prizes?: string[];
    requirements?: string[];
    accentColor?: string;
    posterImage?: string;
  };
  console?: {
    title?: string;
    edition?: string;
    displayCategory?: string;
    description?: string;
    fullDescription?: string;
    features?: string[];
    techStack?: string[];
    prerequisites?: string[];
    capacity?: string;
  };
}

// Extended event data stored in misc field
export interface EventMiscData {
  eventHighlights?: string[];
  keywords?: string[];
  colors?: string;
  rules?: {
    singles?: RuleCategory;
    doubles?: RuleCategory;
  };
  description?: string[]; // For multi-paragraph descriptions
  esports?: {
    gameName?: string;
    tournamentName?: string;
    prizePool?: string;
    teamSize?: string;
    schedule?: { time: string; event: string }[];
    rules?: string[];
    prizes?: string[];
    requirements?: string[];
    accentColor?: string;
    posterImage?: string;
  };
  console?: {
    title?: string;
    edition?: string;
    displayCategory?: string;
    description?: string;
    fullDescription?: string;
    features?: string[];
    techStack?: string[];
    prerequisites?: string[];
    capacity?: string;
  };
  gameName?: string;
  tournamentName?: string;
  prizePool?: string;
  teamSize?: string;
  schedule?: { time: string; event: string }[];
  prizes?: string[];
  requirements?: string[];
  accentColor?: string;
  posterImage?: string;
  edition?: string;
  displayCategory?: string;
  fullDescription?: string;
  features?: string[];
  techStack?: string[];
  prerequisites?: string[];
  capacity?: string;
}

// Database schema from Supabase
export interface EventDbRow {
  id: number;
  name: string;
  tagline: string | null;
  description: string | null;
  organizer: string | null;
  date: string; // ISO date string
  time: string; // Time string
  category: string | null;
  misc: string | null; // JSON string
  location: string | null;
  created_at: string;
  updated_at: string;
}

// Legacy Event format (for local JSON files - will be migrated)
export interface LegacyEvent {
  id: string; // String ID in legacy format
  name: string;
  tagline: string;
  description: string[];
  keywords: string[];
  eventHighlights: string[];
  colors: string;
  category: "tech" | "non-tech" | "esports" | "workshops";
  rules?: {
    singles?: RuleCategory;
    doubles?: RuleCategory;
  };
}
