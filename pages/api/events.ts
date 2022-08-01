// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from "next";
import { jwt, calendar } from "../../libs/google-calendar-api";
import dayjs from "dayjs";
import { calendar_v3, google } from "googleapis";
import { getCheckInDateTime, getCheckOutDateTime } from "../../libs/dayjs";

const CALENDAR_ID = process.env.CALENDAR_ID;

// TODO: とりあえず3ヶ月分の予定を返す
type Query = {
  year: string;
  month: string;
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(400);
  }

  const { year, month } = req.query as Query;
  const day = dayjs(new Date(+year, +month, 1)) || dayjs();

  const timeMin = day.startOf("month").toISOString();
  const timeMax = day.add(3, "month").endOf("month").toISOString();

  const calendarIds = await calendar.calendarList
    .list()
    .then((res) => res.data.items?.map((item) => item.id));

  if (!calendarIds) {
    return;
  }

  const calendarEventsList = await Promise.all([
    ...calendarIds.map((calendarId) =>
      calendar.events
        .list({
          calendarId: calendarId,
          timeMin,
          timeMax,
        })
        .then((res) => res.data.items)
    ),
  ]);

  const allEvents = calendarEventsList.reduce((prev, curr) => {
    if (!prev) {
      return [];
    }
    if (!curr) {
      return prev;
    }
    return [...prev, ...curr];
  }, [] as calendar_v3.Schema$Event[]);

  if (!allEvents) {
    return res.status(400);
  }

  const integratedEvents = allEvents.map((event) => {
    console.warn("------event start------");
    console.warn(event);
    console.warn("------event end--------");
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
  });

  res.status(200).json(integratedEvents);
};

export default handler;
