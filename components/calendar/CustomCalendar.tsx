import dayjs, { Dayjs } from "dayjs";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import CustomDate from "./CustomDate";
import CustomWeek from "./CustomWeek";
import { CalendarEvent } from '../../types/CalendarEvent'
import isBetween from 'dayjs/plugin/isBetween'
import CustomCalendarHeader from "./CustomCalendarHeader";

dayjs.extend(isBetween)

const sliceByWeeks = (dates: Dayjs[]) => {
  const WEEKDAYS = 7
  const length = Math.ceil(dates.length / WEEKDAYS)
  return [...Array(length)].map((_, i) =>
    dates.slice(i * WEEKDAYS, (i + 1) * WEEKDAYS)
  )
}

const getCalendarDays = (date: Dayjs) => {
  const startDate = date.startOf('month').startOf('week')
  const endDate = date.endOf('month').endOf('week')

  let dates: Dayjs[] = []
  let currentDate = startDate
  while(currentDate.isBefore(endDate)) {
    dates.push(currentDate)
    currentDate = currentDate.add(1, 'day')
  }

  return dates
}

type Props = {
  baseDate: Dayjs
  events: CalendarEvent[]
}

const CustomCalendar = ({
  baseDate,
  events,
}: Props) => {

  const dates = getCalendarDays(baseDate)
  const weeks = sliceByWeeks(dates)

  const isBooked = (date: Dayjs) => {
    return events.some(event => date.isBetween(dayjs(event.start), dayjs(event.end), 'day', '[]'))
  }

    return (
      <table className="text-center border border-collapse">
        <CustomCalendarHeader />
        {
          weeks.map(week => (
            <CustomWeek key={`w_${week[0].format('MM/DD')}`}>
              { week.map(date => (
                  <CustomDate
                    key={`d_${date.format('MM/DD')}`}
                    date={date}
                    booked={isBooked(date)}
                  />
                ))
              }
            </CustomWeek>))
        }
      </table>
    )
}

export default CustomCalendar