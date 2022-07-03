import React from 'react'
import { Dayjs } from "dayjs"
import { PropsWithChildren } from "react"


const CustomCalendarHeader = () => {
  const weekDays = ['日', '月', '火', '水', '木', '金', '土']
  return (
    <tr className="custom-week">
      {
        weekDays.map(day => (
          <td key={day} className="custom-date border p-2">
            {day}
          </td>
        ))
      }
    </tr>
  )
}

export default CustomCalendarHeader