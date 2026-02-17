import type { Event } from "./event-types";
import { fetchAllEvents, fetchEventById, fetchEventsByCategory } from "./api";

/**
 * Event cache - Uses sessionStorage to persist data during browser session
 */

const STORAGE_KEY = "prakarsh_events_cache";
const isBrowser = typeof window !== "undefined";

// Helper to get cached events from sessionStorage
const getStoredEvents = (): Event[] | null => {
  if (!isBrowser) return null;
  
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      const events = JSON.parse(stored);
      console.log(`✅ Using cached events from sessionStorage (${events.length} events)`);
      return events;
    }
  } catch (error) {
    console.error("❌ Failed to parse cached events:", error);
    sessionStorage.removeItem(STORAGE_KEY);
  }
  
  return null;
};

// Helper to store events in sessionStorage
const storeEvents = (events: Event[]): void => {
  if (!isBrowser) return;
  
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    console.log(`💾 Stored ${events.length} events in sessionStorage`);
  } catch (error) {
    console.error("❌ Failed to store events in sessionStorage:", error);
  }
};

export const getCachedEvents = async (): Promise<Event[]> => {
  // Check sessionStorage first
  const cachedEvents = getStoredEvents();
  if (cachedEvents && cachedEvents.length > 0) {
    return cachedEvents;
  }

  console.log("🔄 Fetching ALL events from Supabase...");
  try {
    const events = await fetchAllEvents();
    console.log(`✅ Fetched ${events.length} events from Supabase`);
    
    // Store in sessionStorage
    storeEvents(events);
    
    return events;
  } catch (error) {
    console.error("❌ Failed to fetch events from Supabase:", error);
    throw error;
  }
};

export const getCachedEventById = async (id: string): Promise<Event | null> => {
  // Try to find in sessionStorage first
  const cachedEvents = getStoredEvents();
  if (cachedEvents) {
    const cached = cachedEvents.find(e => e.id === id);
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
  // Try to filter from sessionStorage first
  const cachedEvents = getStoredEvents();
  if (cachedEvents) {
    const filtered = cachedEvents.filter(e => e.category === category);
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
