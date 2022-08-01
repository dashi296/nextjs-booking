// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from "next";
import { calendar } from "../../libs/google-calendar-api";

// TODO: このAPIは開発用で本番時には削除する

const handler: NextApiHandler = async (req, res) => {
  const id = req.query.id as string;
  const result = await calendar.calendarList.insert({
    requestBody: {
      id,
    },
  });
  res.status(200).json(result);
};

export default handler;
