// Event type definitions

export interface Event {
  id: string;
  name: string;
  tagline: string;
  description: string[];
  category: "tech" | "non-tech" | "esports" | "workshop";
  eventHighlights?: string[];
  keywords?: string[];
  colors?: string;
  solo?: boolean;
  rules?: string[];
  posterImage?: string;
  date?: string;
  time?: string;
  location?: string;
  registration_pitch?: string;
  esports?: EsportsDetails;
  console?: ConsoleDetails;
}

export interface EsportsDetails {
  gameName?: string;
  tournamentName?: string;
  prizePool?: string;
  teamSize?: string;
  schedule?: string[];
  rules?: string[];
  prizes?: string[];
  requirements?: string[];
  accentColor?: string;
  posterImage?: string;
}

export interface ConsoleDetails {
  title?: string;
  edition?: string;
  displayCategory?: string;
  description?: string;
  fullDescription?: string[];
  features?: string[];
  techStack?: string[];
  prerequisites?: string[];
  capacity?: string;
}

export interface EventDbRow {
  id: number;
  name: string;
  tagline: string | null;
  description: string | null;
  category: string;
  solo: boolean | null;
  date: string | null;
  time: string | null;
  location: string | null;
  registration_pitch: string | null;
  misc: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface EventMiscData {
  eventHighlights?: string[];
  keywords?: string[];
  colors?: string;
  rules?: string[];
  description?: string[];
  esports?: EsportsDetails;
  console?: ConsoleDetails;
  gameName?: string;
  tournamentName?: string;
  prizePool?: string;
  teamSize?: string;
  schedule?: string[];
  prizes?: string[];
  requirements?: string[];
  accentColor?: string;
  posterImage?: string;
  edition?: string;
  displayCategory?: string;
  fullDescription?: string[];
  features?: string[];
  techStack?: string[];
  prerequisites?: string[];
  capacity?: string;
}
