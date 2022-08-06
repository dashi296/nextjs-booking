// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from "next";
import { calendar } from "../../libs/google-calendar-api";
import { getCalendarsFromRedis } from "../../libs/upstash";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(500).json({ error: { statusCode: 500 } });
  }
  const result = await getCalendarsFromRedis();
  res.status(200).json(result);
};

export default handler;
