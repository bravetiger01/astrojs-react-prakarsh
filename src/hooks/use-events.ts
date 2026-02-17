import { useState, useEffect } from "react";
import type { Event } from "@/lib/event-types";
import {
  getCachedEvents,
  getCachedEventById,
  getCachedEventsByCategory,
} from "@/lib/event-cache";

const STORAGE_KEY = "prakarsh_events_cache";

// Helper to read from sessionStorage synchronously
const getInitialEventsFromStorage = (): Event[] => {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      const events = JSON.parse(stored);
      console.log(`✅ [SYNC] Loaded ${events.length} events from sessionStorage`);
      return events;
    }
  } catch (error) {
    console.error("❌ Failed to read initial events from sessionStorage:", error);
  }
  
  return [];
};

export const useEvents = (initialEvents: Event[] = []) => {
  // Initialize with sessionStorage data or props data (whichever has data)
  const cachedEvents = getInitialEventsFromStorage();
  const initialData = cachedEvents.length > 0 ? cachedEvents : initialEvents;
  
  const [events, setEvents] = useState<Event[]>(initialData);
  const [loading, setLoading] = useState(initialData.length === 0);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // If we already have data, don't fetch again
    if (events.length > 0) {
      console.log(`✅ Using existing events (${events.length} events), skipping fetch`);
      setLoading(false);
      return;
    }

    const loadEvents = async () => {
      try {
        setLoading(true);
        const data = await getCachedEvents();
        setEvents(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load events"));
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return { events, loading, error };
};

export const useEventById = (id: string | undefined) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const loadEvent = async () => {
      try {
        setLoading(true); // Set loading while fetching
        const data = await getCachedEventById(id);
        if (data) {
          setEvent(data);
          setError(null);
        } else {
          setEvent(null);
          setError(new Error("Event not found"));
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load event"));
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  return { event, loading, error };
};

export const useEventsByCategory = (category: string) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const data = await getCachedEventsByCategory(category);
        setEvents(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load events"));
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [category]);

  return { events, loading, error };
};

