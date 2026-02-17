// Event type definitions

export interface DaySchedule {
  day: number;
  date: string;
  location: string;
  start_time: string;
  end_time: string;
}

export interface Event {
  id: string;
  name: string;
  tagline: string;
  description: string[];
  category: "tech" | "non-tech" | "esports" | "workshops";
  eventHighlights?: string[];
  keywords?: string[];
  colors?: string;
  solo?: boolean;
  rules?: string[];
  posterImage?: string;
  date?: string;
  time?: string;
  location?: string;
  schedules?: DaySchedule[]; // Multi-day scheduling
  registration_pitch?: string;
  esports?: EsportsDetails;
  console?: ConsoleDetails;
}

export interface EsportsDetails {
  gameName?: string;
  tournamentName?: string;
  prizePool?: string;
  teamSize?: string;
  schedule?: string[] | { time: string; event: string }[];
  rules?: string[];
  prizes?: string[];
  requirements?: string[];
  accentColor?: string;
  posterImage?: string | any;
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
  organizer: string | null;
  prize_pool: number | null;
  keywords: string[] | null;
  solo: boolean | null;
  registration_pitch: string | null;
  rules: string | null;
  highlights: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface DayScheduleDbRow {
  id: number;
  event_id: number;
  location: string | null;
  date: string | null;
  start_time: string | null;
  end_time: string | null;
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
