import { useState, useEffect } from "react";
import type { Event } from "@/data/event-types.ts";
import {
  fetchAllEvents,
  fetchEventById,
  fetchEventsByCategory,
} from "@/lib/api";
import { technicalEvents } from "@/data/technical_events";
import { nonTechnicalEvents } from "@/data/non_technical";
import { workshopEvents } from "@/data/workshops";
import { esportsEvents } from "@/data/esports";

// Combine all local events as fallback
const allLocalEvents = [
  ...technicalEvents,
  ...nonTechnicalEvents,
  ...workshopEvents,
  ...esportsEvents,
];

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        // Try Supabase first
        try {
          const data = await fetchAllEvents();
          setEvents(data);
          setError(null);
        } catch (supabaseError) {
          console.warn("Supabase not responding, using local data:", supabaseError);
          // Fallback to local data
          setEvents(allLocalEvents);
          setError(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load events"));
        setEvents(allLocalEvents); // Still show local data on error
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
  const [loading, setLoading] = useState(false); // No loading for detail pages
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const loadEvent = async () => {
      try {
        // Try numeric ID for Supabase first
        const numericId = parseInt(id, 10);
        if (!isNaN(numericId)) {
          try {
            const data = await fetchEventById(numericId);
            if (data) {
              setEvent(data);
              setError(null);
              return;
            }
          } catch (supabaseError) {
            console.warn("Supabase not responding, trying local data:", supabaseError);
          }
        }
        
        // Fallback to local data (string IDs)
        const localEvent = allLocalEvents.find(e => e.id === id);
        if (localEvent) {
          setEvent(localEvent);
          setError(null);
        } else {
          setEvent(null);
          setError(new Error("Event not found"));
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load event"));
        setEvent(null);
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
        // Try Supabase first
        try {
          const data = await fetchEventsByCategory(category);
          setEvents(data);
          setError(null);
        } catch (supabaseError) {
          console.warn("Supabase not responding, using local data:", supabaseError);
          // Fallback to local data
          const localEvents = allLocalEvents.filter(e => e.category === category);
          setEvents(localEvents);
          setError(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load events"));
        // Still show local data on error
        const localEvents = allLocalEvents.filter(e => e.category === category);
        setEvents(localEvents);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [category]);

  return { events, loading, error };
};
