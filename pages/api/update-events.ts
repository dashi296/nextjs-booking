// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from "next";
import { calendar } from "../../libs/google-calendar-api";
import dayjs from "dayjs";
import { calendar_v3 } from "googleapis";
import { clearEvents, setEventsToRedis } from "../../libs/upstash";
import { googleEvent2CalendarEvent } from "../../libs/event";

// TODO: とりあえず1年分の予定を返す

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(400);
  }

  res.setHeader("Cache-Control", "s-maxage=300");

  const day = dayjs();

  const timeMin = day.startOf("month").toISOString();
  const timeMax = day.add(1, "year").endOf("month").toISOString();

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

  const calendarEvents = calendarEventsList.reduce((prev, curr) => {
    if (!prev) {
      return [];
    }
    if (!curr) {
      return prev;
    }
    return [...prev, ...curr];
  }, [] as calendar_v3.Schema$Event[]);

  if (!calendarEvents) {
    return res.status(400);
  }

  const allEvents = calendarEvents.map(googleEvent2CalendarEvent);
  await clearEvents();
  await setEventsToRedis(allEvents);

  await res.status(200).json({ status: "ok" });
};

export default handler;
