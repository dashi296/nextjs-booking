// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { jwt, calendar } from '../../libs/google-calendar-api'
import dayjs from 'dayjs'

const CALENDAR_ID = process.env.CALENDAR_ID

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  
  const authorizeResult = await jwt.authorize()
  if(!authorizeResult.access_token) {
    res.status(400)
    return
  }

  console.warn('CALENDAR_ID: ', CALENDAR_ID)

  const timeMin = dayjs().startOf('month').toISOString()
  const timeMax = dayjs().endOf('month').toISOString()
  console.warn('timeMin: ', timeMin)
  console.warn('timeMax: ', timeMax)
  const results = await calendar.events.list({
    auth: jwt,
    calendarId: CALENDAR_ID,
    timeMin,
    timeMax
  })

  const events = results.data.items?.map(event => {
    const { id, summary, start, end } = event
    return {
      id,
      title: summary,
      start: start?.dateTime,
      end: end?.dateTime,
    }
  })

  console.warn('events: ', events)

  res.status(200).json(events)
}

export default handler
