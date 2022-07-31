// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from "next";
import { jwt, calendar } from "../../libs/google-calendar-api";
import dayjs from "dayjs";
import { google } from "googleapis";

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
  const results = await calendar.events.list({
    calendarId: CALENDAR_ID,
    timeMin,
    timeMax,
  });

  const events = results.data.items?.map((event) => {
    const { id, summary, start, end } = event;
    return {
      id,
      title: summary,
      start: start?.dateTime,
      end: end?.dateTime,
    };
  });

  res.status(200).json(events);
};

export default handler;
