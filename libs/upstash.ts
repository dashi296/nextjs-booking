import { calendar_v3 } from "googleapis";
import Redis from "ioredis";
import { CalendarEvent } from "../types/CalendarEvent";

const UPSTASH_CLIENT = process.env.UPSTASH_CLIENT as string;

export const redis = new Redis(UPSTASH_CLIENT);

export const setEventsToRedis = async (events: CalendarEvent[]) => {
  return await redis.set("events", JSON.stringify(events));
};

export const getEventsFromRedis = async () => {
  return JSON.parse((await redis.get("events")) || "[]");
};

export const clearEvents = async () => {
  return await redis.del("events");
};

export const addEventToRedis = async (event: CalendarEvent) => {
  const prevEvents = await getEventsFromRedis();
  return await redis
    .multi()
    .del("events")
    .set("events", JSON.stringify([...prevEvents, event]))
    .exec();
};

export const setCalendarsToRedis = async (
  calendars: calendar_v3.Schema$CalendarListEntry[]
) => {
  return await redis
    .multi()
    .del("calendars")
    .set("calendars", JSON.stringify(calendars))
    .exec();
};

export const getCalendarsFromRedis = async () => {
  return JSON.parse(
    (await redis.get("calendars")) || "[]"
  ) as calendar_v3.Schema$CalendarListEntry[];
};
