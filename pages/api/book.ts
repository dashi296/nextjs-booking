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
  console.warn("req: ", req);
  if (req.method !== "POST") {
    res.status(400);
    return;
  }

  const { checkInDate, checkOutDate, description } = req.body as Query;
  if (!checkInDate || !checkOutDate) {
    res.status(400);
    return;
  }

  console.warn("a");

  const event = generateEvent({ checkInDate, checkOutDate, description });

  const authorizeResult = await jwt.authorize();
  if (!authorizeResult.access_token) {
    res.status(401);
    return;
  }

  console.warn("b");

  const results = await calendar.events.insert({
    auth: jwt,
    calendarId: CALENDAR_ID,
    requestBody: event,
  });

  console.warn("c");

  res.status(200).json(results);
};

export default handler;
