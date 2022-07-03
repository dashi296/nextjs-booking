// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { jwt, calendar } from '../../libs/google-calendar-api'
import dayjs, { Dayjs } from 'dayjs'

const CALENDAR_ID = process.env.CALENDAR_ID

const generateEvent = ({
  startDate,
  endDate
}: {
  startDate: string,
  endDate: string
}) => {
  return {
    summary: '予約',
    location: '',
    description: '',
    start: {
      'dateTime': dayjs(startDate).set('h', 10).set('m', 0).toISOString(),
      'timeZone': 'Asia/Tokyo',
    },
    end: {
      'dateTime': dayjs(endDate).set('h', 11).set('m', 0).toISOString(),
      'timeZone': 'Asia/Tokyo',
    },
    attendees: [],
    reminders: {
      useDefault: false,
      overrides: [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
  };
}

type Query = {
  startDate: string
  endDate: string
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {

  if(req.method !== 'POST') {
    return res.status(400)
  }

  const { startDate, endDate } = req.body as Query

  console.warn('startDate: ', startDate)
  console.warn('endDate: ', endDate)

  const event = generateEvent({ startDate, endDate })
  
  const authorizeResult = await jwt.authorize()
  if(!authorizeResult.access_token) {
    res.status(400)
    return
  }

  console.warn('CALENDAR_ID: ', CALENDAR_ID)

  const results = await calendar.events.insert({
    auth: jwt,
    calendarId: CALENDAR_ID,
    requestBody: event,
  })

  res.status(200).json(results)
}

export default handler
