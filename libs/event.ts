import { calendar_v3 } from "googleapis";
import { CalendarEvent } from "../types/CalendarEvent";
import { getCheckInDateTime, getCheckOutDateTime } from "./dayjs";

export const googleEvent2CalendarEvent = (
  event: calendar_v3.Schema$Event
): CalendarEvent => {
  const { id, summary, start, end } = event;
  const startDateTime = start?.dateTime
    ? start.dateTime
    : start?.date
    ? getCheckInDateTime(start.date)
    : undefined;
  const endDateTime = end?.dateTime
    ? end.dateTime
    : end?.date
    ? getCheckOutDateTime(end.date)
    : undefined;
  return {
    id,
    title: summary,
    start: startDateTime,
    end: endDateTime,
  };
};
