import type { Event } from "./event-types.ts";
import { technicalEvents } from "./technical_events.ts";
import { nonTechnicalEvents } from "./non_technical.ts";
import { esportsEvents } from "./esports.ts";
import { workshopEvents } from "./workshops.ts";

export type { Event } from "./event-types.ts";

export const events: Event[] = [
  ...technicalEvents,
  ...nonTechnicalEvents,
  ...esportsEvents,
  ...workshopEvents,
];

export const getEventById = (id: string) =>
  events.find((event) => event.id === id);
