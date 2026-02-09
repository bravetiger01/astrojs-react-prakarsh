import type { Event } from "./event-types";
import { fetchAllEvents, fetchEventById, fetchEventsByCategory } from "./api";

/**
 * Event cache - ALWAYS fetches from Supabase
 * NO LOCAL FALLBACK DATA
 */

export const getCachedEvents = async (): Promise<Event[]> => {
  console.log("🔄 Fetching ALL events from Supabase...");
  try {
    const events = await fetchAllEvents();
    console.log(`✅ Fetched ${events.length} events from Supabase`);
    return events;
  } catch (error) {
    console.error("❌ Failed to fetch events from Supabase:", error);
    throw error; // Throw error instead of returning empty array
  }
};

export const getCachedEventById = async (id: string): Promise<Event | null> => {
  console.log(`🔄 Fetching event ${id} from Supabase...`);
  try {
    const event = await fetchEventById(parseInt(id));
    if (event) {
      console.log(`✅ Fetched event ${id} from Supabase`);
    } else {
      console.warn(`⚠️ Event ${id} not found in Supabase`);
    }
    return event;
  } catch (error) {
    console.error(`❌ Failed to fetch event ${id} from Supabase:`, error);
    throw error; // Throw error instead of returning null
  }
};

export const getCachedEventsByCategory = async (
  category: string,
): Promise<Event[]> => {
  console.log(`🔄 Fetching ${category} events from Supabase...`);
  try {
    const events = await fetchEventsByCategory(category);
    console.log(`✅ Fetched ${events.length} ${category} events from Supabase`);
    return events;
  } catch (error) {
    console.error(
      `❌ Failed to fetch ${category} events from Supabase:`,
      error,
    );
    throw error; // Throw error instead of returning empty array
  }
};

export const prefetchAllEvents = async (): Promise<void> => {
  console.log("🚀 Prefetching all events from Supabase...");
  try {
    await getCachedEvents();
    console.log("✅ Prefetch complete");
  } catch (error) {
    console.error("❌ Prefetch failed:", error);
    throw error;
  }
};
