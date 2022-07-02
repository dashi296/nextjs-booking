import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

type BookingEvent = {

}

type Props = {
  events: BookingEvent[]
}

const CustomCalendar = ({
  events
}: Props) => {

    return (
      <FullCalendar
        plugins={[dayGridPlugin]}
        events={events}
      />
    )
}

export default CustomCalendar