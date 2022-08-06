// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from "next";
import { calendar } from "../../libs/google-calendar-api";
import { setCalendarsToRedis } from "../../libs/upstash";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(500).json({ error: { statusCode: 500 } });
  }

  const result = await calendar.calendarList.list();
  const calendars = result.data.items;
  if (calendars) {
    await setCalendarsToRedis(calendars);
  }

  res.status(200).json(result);
};

export default handler;
