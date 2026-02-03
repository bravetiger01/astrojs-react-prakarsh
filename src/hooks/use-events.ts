import { useState, useEffect } from "react";
import type { Event } from "@/data/event-types.ts";
import {
  getCachedEvents,
  getCachedEventById,
  getCachedEventsByCategory,
} from "@/lib/event-cache";

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
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

