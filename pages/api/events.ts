// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from "next";
import { getEventsFromRedis } from "../../libs/upstash";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(400);
  }

  const events = await getEventsFromRedis();
  console.warn(events);
  res.status(200).json(events);
};
export default handler;
