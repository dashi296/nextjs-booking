// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from "next";
import { calendar } from "../../libs/google-calendar-api";

const handler: NextApiHandler = async (req, res) => {
  const result = await calendar.calendarList.list();
  res.status(200).json(result);
};

export default handler;
