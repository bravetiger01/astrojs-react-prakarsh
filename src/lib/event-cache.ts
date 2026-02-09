import type { Event } from "@/types/event-types";
import { fetchAllEvents } from "./api";

// Global cache
interface EventCache {
  allEvents: Event[] | null;
  byId: Map<string, Event>;
  byCategory: Map<string, Event[]>;
  isInitialized: boolean;
  isPrefetching: boolean;
  prefetchPromise: Promise<void> | null;
}

const cache: EventCache = {
  allEvents: null,
  byId: new Map(),
  byCategory: new Map(),
  isInitialized: false,
  isPrefetching: false,
  prefetchPromise: null,
};

// Initialize cache with data
const initializeCache = (events: Event[]) => {
  cache.allEvents = events;
  cache.byId.clear();
  cache.byCategory.clear();

  // Index by ID
  events.forEach((event) => {
    cache.byId.set(event.id, event);
  });

  // Index by category
  const categories = ["tech", "non-tech", "esports", "workshops"];
  categories.forEach((category) => {
    const categoryEvents = events.filter((e) => e.category === category);
    cache.byCategory.set(category, categoryEvents);
  });

  cache.isInitialized = true;
  console.log(`✅ Event cache initialized with ${events.length} events`);
};

// Prefetch all events (called during loading screen)
export const prefetchAllEvents = async (): Promise<void> => {
  // If already prefetching, return the existing promise
  if (cache.isPrefetching && cache.prefetchPromise) {
    return cache.prefetchPromise;
  }

  // If already initialized, no need to prefetch again
  if (cache.isInitialized) {
    console.log("✅ Cache already initialized, skipping prefetch");
    return Promise.resolve();
  }

  cache.isPrefetching = true;
  cache.prefetchPromise = (async () => {
    try {
      console.log("🔄 Prefetching all events from Supabase...");
      
      const events = await fetchAllEvents();
      console.log(`📥 Fetched ${events.length} events from Supabase`);
      
      initializeCache(events);
    } catch (error) {
      console.error("❌ Error fetching events from Supabase:", error);
      // Initialize with empty array if Supabase fails
      initializeCache([]);
      throw error;
    } finally {
      cache.isPrefetching = false;
      cache.prefetchPromise = null;
    }
  })();

  return cache.prefetchPromise;
};

// Get all events from cache
export const getCachedEvents = async (): Promise<Event[]> => {
  if (!cache.isInitialized) {
    await prefetchAllEvents();
  }
  return cache.allEvents || [];
};

// Get event by ID from cache
export const getCachedEventById = async (
  id: string,
): Promise<Event | null> => {
  if (!cache.isInitialized) {
    await prefetchAllEvents();
  }
  
  // Try direct lookup first (fastest)
  let event = cache.byId.get(id);
  if (event) return event;
  
  // If not found and id is numeric, try converting
  if (!isNaN(Number(id))) {
    event = cache.byId.get(String(Number(id)));
    if (event) return event;
  }
  
  // Final fallback: array search
  event = Array.from(cache.byId.values()).find(e => e.id === id || e.id === String(Number(id)));
  
  if (!event) {
    console.warn(`⚠️ Event not found with ID: "${id}"`);
  }
  
  return event || null;
};

// Get events by category from cache
export const getCachedEventsByCategory = async (
  category: string,
): Promise<Event[]> => {
  if (!cache.isInitialized) {
    await prefetchAllEvents();
  }
  return cache.byCategory.get(category) || [];
};

// Force refresh cache (useful for admin updates)
export const refreshCache = async (): Promise<void> => {
  cache.isInitialized = false;
  await prefetchAllEvents();
};

// Check if cache is ready
export const isCacheReady = (): boolean => {
  return cache.isInitialized;
};
