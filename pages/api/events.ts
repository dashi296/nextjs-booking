// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from "next";
import { getEventsFromRedis } from "../../libs/upstash";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(500).json({ error: { statusCode: 500 } });
  }

  const events = await getEventsFromRedis();
  res.status(200).json(events);
};
export default handler;
