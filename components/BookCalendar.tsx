import dayjs from "dayjs";
import Calendar, {
  CalendarProps,
  CalendarTileProperties,
} from "react-calendar";
import { CalendarEvent } from "../types/CalendarEvent";

type Props = CalendarProps & {
  events: CalendarEvent[];
  checkInDate: Date;
  numOfNight: number;
};

const BookTile = ({ date }: { date: Date }) => {
  return <div className="bg-primary">{dayjs(date).date()}</div>;
};

const BookCalendar = ({
  events,
  checkInDate,
  numOfNight,
  ...calendarProps
}: Props) => {
  console.warn("checkInDate: ", checkInDate);
  console.warn("numOfNight: ", numOfNight);
  const getTileContent = ({ date }: CalendarTileProperties) => {
    if (
      dayjs(date).isBetween(
        checkInDate,
        dayjs(checkInDate).add(numOfNight, "d"),
        "d",
        "[]"
      )
    ) {
      return <BookTile date={date} />;
    }
    return null;
  };

  const getTileDisabled = ({ date }: CalendarTileProperties) => {
    const today = dayjs();
    if (today.isAfter(date, "d")) {
      return true;
    }
    const disabled = events.some((event) =>
      dayjs(date).isBetween(event.start, event.end, "day", "[]")
    );
    return disabled;
  };
  return (
    <Calendar
      {...calendarProps}
      tileDisabled={getTileDisabled}
      tileContent={getTileContent}
    />
  );
};

export default BookCalendar;
