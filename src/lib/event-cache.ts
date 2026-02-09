import type { Event } from "./event-types";
import { fetchAllEvents, fetchEventById, fetchEventsByCategory } from "./api";

/**
 * Event cache - Caches data in memory to avoid redundant API calls
 */

let eventsCache: Event[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getCachedEvents = async (): Promise<Event[]> => {
  // Return cached data if available and fresh
  if (eventsCache && Date.now() - cacheTimestamp < CACHE_DURATION) {
    console.log(`✅ Using cached events (${eventsCache.length} events)`);
    return eventsCache;
  }

  console.log("🔄 Fetching ALL events from Supabase...");
  try {
    const events = await fetchAllEvents();
    console.log(`✅ Fetched ${events.length} events from Supabase`);
    
    // Cache the results
    eventsCache = events;
    cacheTimestamp = Date.now();
    
    return events;
  } catch (error) {
    console.error("❌ Failed to fetch events from Supabase:", error);
    
    // If we have stale cache, return it as fallback
    if (eventsCache) {
      console.warn("⚠️ Using stale cache as fallback");
      return eventsCache;
    }
    
    throw error;
  }
};

export const getCachedEventById = async (id: string): Promise<Event | null> => {
  // Try to find in cache first
  if (eventsCache) {
    const cached = eventsCache.find(e => e.id === id);
    if (cached) {
      console.log(`✅ Using cached event ${id}`);
      return cached;
    }
  }

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
    throw error;
  }
};

export const getCachedEventsByCategory = async (
  category: string,
): Promise<Event[]> => {
  // Try to filter from cache first
  if (eventsCache) {
    const filtered = eventsCache.filter(e => e.category === category);
    console.log(`✅ Using cached ${category} events (${filtered.length} events)`);
    return filtered;
  }

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
    throw error;
  }
};

export const prefetchAllEvents = async (): Promise<void> => {
  console.log("🚀 Prefetching all events from Supabase...");
  try {
    await getCachedEvents();
    console.log("✅ Prefetch complete");
  } catch (error) {
    console.error("❌ Prefetch failed:", error);
    // Don't throw - let the page load even if prefetch fails
  }
};
