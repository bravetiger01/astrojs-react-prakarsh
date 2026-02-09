import { supabase } from "./supabase";
import type { Event, EventDbRow, EventMiscData } from "./event-types";
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
const transformDbRowToEvent = (row: EventDbRow): Event => {
  let miscData: EventMiscData = {};

  // Parse misc JSON field
  if (row.misc) {
    try {
      miscData = JSON.parse(row.misc);
    } catch (e) {
      console.error("Error parsing misc data:", e);
    }
  }

  // Parse description - if it's a JSON array string, parse it, otherwise split by newlines
  let descriptionArray: string[] = [];
  if (miscData.description && Array.isArray(miscData.description)) {
    descriptionArray = miscData.description;
  } else if (row.description) {
    try {
      const parsed = JSON.parse(row.description);
      descriptionArray = Array.isArray(parsed) ? parsed : [row.description];
    } catch {
      descriptionArray = [row.description];
    }
  }

  const esportsDetails = {
    ...(miscData.esports || {}),
    gameName: miscData.esports?.gameName || miscData.gameName,
    tournamentName: miscData.esports?.tournamentName || miscData.tournamentName,
    prizePool: miscData.esports?.prizePool || miscData.prizePool,
    teamSize: miscData.esports?.teamSize || miscData.teamSize,
    schedule: miscData.esports?.schedule || miscData.schedule,
    rules: miscData.esports?.rules,
    prizes: miscData.esports?.prizes || miscData.prizes,
    requirements: miscData.esports?.requirements || miscData.requirements,
    accentColor: miscData.esports?.accentColor || miscData.accentColor,
    posterImage: miscData.esports?.posterImage || miscData.posterImage,
  };

  const consoleDetails = {
    ...(miscData.console || {}),
    title: miscData.console?.title,
    edition: miscData.console?.edition || miscData.edition,
    displayCategory:
      miscData.console?.displayCategory || miscData.displayCategory,
    description: miscData.console?.description,
    fullDescription:
      miscData.console?.fullDescription || miscData.fullDescription,
    features: miscData.console?.features || miscData.features,
    techStack: miscData.console?.techStack || miscData.techStack,
    prerequisites: miscData.console?.prerequisites || miscData.prerequisites,
    capacity: miscData.console?.capacity || miscData.capacity,
  };

  return {
    id: row.id.toString(),
    name: row.name,
    tagline: row.tagline || "",
    description: descriptionArray,
    category: (row.category as Event["category"]) || "non-tech",
    eventHighlights: miscData.eventHighlights || [],
    keywords: miscData.keywords || [],
    colors: miscData.colors || "",
    solo: row.solo ?? undefined,
    rules: miscData.rules,
    posterImage: getPosterImageForEvent(row.id.toString(), row.name),
    date: row.date || undefined,
    time: row.time || undefined,
    location: row.location || undefined,
    esports: esportsDetails,
    console: consoleDetails,
  };
};

export const fetchAllEvents = async (): Promise<Event[]> => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching events:", error);
    throw new Error(error.message);
  }

  return (data || []).map(transformDbRowToEvent);
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

  return data ? transformDbRowToEvent(data) : null;
};

export const fetchEventsByCategory = async (
  category: string,
): Promise<Event[]> => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching events by category:", error);
    throw new Error(error.message);
  }

  return (data || []).map(transformDbRowToEvent);
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
