import type { Event } from "./event-types.js";
import { technicalEvents } from "./technical_events.js";
import { nonTechnicalEvents } from "./non_technical.js";
import { esportsEvents } from "./esports.js";
import { workshopEvents } from "./workshops.js";

export type { Event } from "./event-types.js";

export const events: Event[] = [
  ...technicalEvents,
  ...nonTechnicalEvents,
  ...esportsEvents,
  ...workshopEvents,
];

export const getEventById = (id: string) =>
  events.find((event) => event.id === id);
