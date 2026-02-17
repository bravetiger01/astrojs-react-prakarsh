import { supabase } from "./supabase";
import type {
  Event,
  EventDbRow,
  EventMiscData,
  DaySchedule,
  DayScheduleDbRow,
  EsportsDetails,
  ConsoleDetails,
} from "./event-types";
import freeFirePoster from "@/assets/freefire-poster.png";
import valorantPoster from "@/assets/valorant-poster.png";
import bgmiPoster from "@/assets/bgmi-poster.png";

// Map event IDs to poster images
const getPosterImageForEvent = (
  eventId: string,
  eventName: string,
): string | undefined => {
  const id = eventId.toLowerCase();
  const name = eventName.toLowerCase();

  if (
    id.includes("ffmax") ||
    name.includes("free fire") ||
    name.includes("freefire")
  ) {
    return freeFirePoster.src;
  } else if (id.includes("valorant") || name.includes("valorant")) {
    return valorantPoster.src;
  } else if (id.includes("bgmi") || name.includes("bgmi")) {
    return bgmiPoster.src;
  }

  return undefined;
};

// Transform database row to client Event
const transformDbRowToEvent = (
  row: EventDbRow,
  schedules: DayScheduleDbRow[] = [],
): Event => {
  // Parse description - handle both text and arrays
  let descriptionArray: string[] = [];
  if (row.description) {
    try {
      const parsed = JSON.parse(row.description);
      descriptionArray = Array.isArray(parsed) ? parsed : [row.description];
    } catch {
      // If description is plain text, split by newlines or use as single paragraph
      descriptionArray = row.description.split("\n").filter((p) => p.trim());
      if (descriptionArray.length === 0) {
        descriptionArray = [row.description];
      }
    }
  }

  // Parse keywords if it's a string
  let keywordsArray: string[] = [];
  if (row.keywords) {
    if (Array.isArray(row.keywords)) {
      keywordsArray = row.keywords;
    } else if (typeof row.keywords === "string") {
      try {
        const parsed = JSON.parse(row.keywords);
        keywordsArray = Array.isArray(parsed) ? parsed : [row.keywords];
      } catch {
        keywordsArray = [row.keywords];
      }
    }
  }

  // Parse rules
  let rulesArray: string[] = [];
  if (row.rules) {
    try {
      const parsed = JSON.parse(row.rules);
      rulesArray = Array.isArray(parsed) ? parsed : [row.rules];
    } catch {
      rulesArray = row.rules.split("\n").filter((r) => r.trim());
      if (rulesArray.length === 0) {
        rulesArray = [row.rules];
      }
    }
  }

  // Parse highlights
  let highlightsArray: string[] = [];
  if (row.highlights) {
    try {
      const parsed = JSON.parse(row.highlights);
      highlightsArray = Array.isArray(parsed) ? parsed : [row.highlights];
    } catch {
      highlightsArray = row.highlights.split("\n").filter((h) => h.trim());
      if (highlightsArray.length === 0) {
        highlightsArray = [row.highlights];
      }
    }
  }

  // Transform schedules
  const eventSchedules: DaySchedule[] = schedules.map((s, index) => ({
    day: index + 1,
    date: s.date || "",
    location: s.location || "",
    start_time: s.start_time || "",
    end_time: s.end_time || "",
  }));

  // Set date, time, location from first schedule if available
  const firstSchedule = eventSchedules[0];
  const date = firstSchedule?.date;
  const time = firstSchedule?.start_time;
  const location = firstSchedule?.location;

  // For esports/console, try to parse from keywords or create defaults
  const esportsDetails: EsportsDetails = {
    gameName: row.category === "esports" ? row.name.split(" ")[0] : undefined,
    tournamentName: row.category === "esports" ? row.name : undefined,
    prizePool:
      row.prize_pool && row.prize_pool > 0
        ? `₹${row.prize_pool.toLocaleString()}`
        : "TBA",
    teamSize: row.solo === false ? "Team" : row.solo === true ? "Solo" : "TBA",
    rules: rulesArray.length > 0 ? rulesArray : undefined,
    requirements: undefined,
    prizes: undefined,
    schedule: undefined,
    accentColor: undefined,
    posterImage: getPosterImageForEvent(row.id.toString(), row.name),
  };

  const consoleDetails: ConsoleDetails = {
    title: row.name,
    edition: undefined,
    displayCategory:
      row.category === "workshops" ? "WORKSHOP" : row.category.toUpperCase(),
    description: row.tagline || undefined,
    fullDescription: descriptionArray.join(" "),
    features: highlightsArray.length > 0 ? highlightsArray : undefined,
    techStack: keywordsArray.length > 0 ? keywordsArray : undefined,
    prerequisites: undefined,
    capacity: "Open",
  };

  return {
    id: row.id.toString(),
    name: row.name,
    tagline: row.tagline || "",
    description: descriptionArray,
    category: (row.category as Event["category"]) || "non-tech",
    eventHighlights: highlightsArray,
    keywords: keywordsArray,
    colors: "",
    solo: row.solo ?? undefined,
    rules: rulesArray,
    posterImage: getPosterImageForEvent(row.id.toString(), row.name),
    date: date,
    time: time,
    location: location,
    schedules: eventSchedules.length > 0 ? eventSchedules : undefined,
    registration_pitch: row.registration_pitch || undefined,
    esports: row.category === "esports" ? esportsDetails : undefined,
    console:
      row.category === "non-tech" || row.category === "workshops"
        ? consoleDetails
        : undefined,
  };
};

export const fetchAllEvents = async (): Promise<Event[]> => {
  const { data: eventsData, error: eventsError } = await supabase
    .from("events")
    .select("*")
    .order("id", { ascending: true });

  if (eventsError) {
    console.error("Error fetching events:", eventsError);
    throw new Error(eventsError.message);
  }

  if (!eventsData || eventsData.length === 0) {
    return [];
  }

  // Fetch all day1 and day2 schedules
  const eventIds = eventsData.map((e) => e.id);

  const { data: day1Data, error: day1Error } = await supabase
    .from("day1")
    .select("*")
    .in("event_id", eventIds);

  const { data: day2Data, error: day2Error } = await supabase
    .from("day2")
    .select("*")
    .in("event_id", eventIds);

  if (day1Error) console.warn("Error fetching day1:", day1Error);
  if (day2Error) console.warn("Error fetching day2:", day2Error);

  // Group schedules by event_id
  const schedulesByEventId: Record<number, DayScheduleDbRow[]> = {};

  [...(day1Data || []), ...(day2Data || [])].forEach((schedule) => {
    if (!schedulesByEventId[schedule.event_id]) {
      schedulesByEventId[schedule.event_id] = [];
    }
    schedulesByEventId[schedule.event_id].push(schedule);
  });

  // Transform events with their schedules
  return eventsData.map((event) =>
    transformDbRowToEvent(event, schedulesByEventId[event.id] || []),
  );
};

export const fetchEventById = async (id: number): Promise<Event | null> => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // Not found error
      return null;
    }
    console.error("Error fetching event:", error);
    throw new Error(error.message);
  }

  if (!data) return null;

  // Fetch day1 and day2 schedules for this event
  const { data: day1Data } = await supabase
    .from("day1")
    .select("*")
    .eq("event_id", id);

  const { data: day2Data } = await supabase
    .from("day2")
    .select("*")
    .eq("event_id", id);

  const schedules = [...(day1Data || []), ...(day2Data || [])];

  return transformDbRowToEvent(data, schedules);
};

export const fetchEventsByCategory = async (
  category: string,
): Promise<Event[]> => {
  const { data: eventsData, error: eventsError } = await supabase
    .from("events")
    .select("*")
    .eq("category", category)
    .order("id", { ascending: true });

  if (eventsError) {
    console.error("Error fetching events by category:", eventsError);
    throw new Error(eventsError.message);
  }

  if (!eventsData || eventsData.length === 0) {
    return [];
  }

  // Fetch all day1 and day2 schedules
  const eventIds = eventsData.map((e) => e.id);

  const { data: day1Data } = await supabase
    .from("day1")
    .select("*")
    .in("event_id", eventIds);

  const { data: day2Data } = await supabase
    .from("day2")
    .select("*")
    .in("event_id", eventIds);

  // Group schedules by event_id
  const schedulesByEventId: Record<number, DayScheduleDbRow[]> = {};

  [...(day1Data || []), ...(day2Data || [])].forEach((schedule) => {
    if (!schedulesByEventId[schedule.event_id]) {
      schedulesByEventId[schedule.event_id] = [];
    }
    schedulesByEventId[schedule.event_id].push(schedule);
  });

  return eventsData.map((event) =>
    transformDbRowToEvent(event, schedulesByEventId[event.id] || []),
  );
};

export const fetchEventsByNeonColor = async (
  neonColor: string,
): Promise<Event[]> => {
  // This function is no longer needed as neonColor has been removed
  return [];
};

// Helper function to create/update events with proper JSON stringification
export const createEvent = async (
  eventData: Partial<Event>,
): Promise<Event> => {
  const { eventHighlights, keywords, colors, rules, description, ...dbFields } =
    eventData;

  const miscData: EventMiscData = {
    eventHighlights,
    keywords,
    colors,
    rules,
    description: Array.isArray(description) ? description : undefined,
  };

  const { data, error } = await supabase
    .from("events")
    .insert({
      ...dbFields,
      description: Array.isArray(description) ? description[0] : description,
      misc: JSON.stringify(miscData),
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating event:", error);
    throw new Error(error.message);
  }

  return transformDbRowToEvent(data);
};

export const updateEvent = async (
  id: number,
  eventData: Partial<Event>,
): Promise<Event> => {
  const { eventHighlights, keywords, colors, rules, description, ...dbFields } =
    eventData;

  const miscData: EventMiscData = {
    eventHighlights,
    keywords,
    colors,
    rules,
    description: Array.isArray(description) ? description : undefined,
  };

  const { data, error } = await supabase
    .from("events")
    .update({
      ...dbFields,
      description: Array.isArray(description) ? description[0] : description,
      misc: JSON.stringify(miscData),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating event:", error);
    throw new Error(error.message);
  }

  return transformDbRowToEvent(data);
};
