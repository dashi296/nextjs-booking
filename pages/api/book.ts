// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { jwt, calendar } from "../../libs/google-calendar-api";
import dayjs from "dayjs";

const CALENDAR_ID = process.env.CALENDAR_ID;

const generateEvent = ({
  checkInDate,
  checkOutDate,
  description,
}: {
  checkInDate: string;
  checkOutDate: string;
  description: string;
}) => {
  return {
    summary: "予約",
    location: "",
    description,
    start: {
      dateTime: dayjs(checkInDate).set("h", 15).set("m", 0).toISOString(),
      timeZone: "Asia/Tokyo",
    },
    end: {
      dateTime: dayjs(checkOutDate).set("h", 10).set("m", 0).toISOString(),
      timeZone: "Asia/Tokyo",
    },
    color: 2,
    attendees: [],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  };
};

type Query = {
  checkInDate: string;
  checkOutDate: string;
  description: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400);
    return;
  }

  const data = req.body as Query;
  const { checkInDate, checkOutDate, description } = data;
  if (!checkInDate || !checkOutDate) {
    res.status(400).json({
      message: "Bad Request",
      error: 400,
      data,
    });
    return;
  }

  const event = generateEvent({ checkInDate, checkOutDate, description });

  const result = await calendar.events.insert({
    auth: jwt,
    calendarId: CALENDAR_ID,
    requestBody: event,
  });

  res.status(200).json(result);
};

export default handler;
