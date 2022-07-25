import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import Calendar, {
  CalendarProps,
  CalendarTileProperties,
} from "react-calendar";
import { CalendarEvent } from "../types/CalendarEvent";
dayjs.extend(isBetween);

type Props = CalendarProps & {
  events: CalendarEvent[];
  checkInDate: Date;
  numOfNight: number;
};

const BookTile = () => {
  return <div className="bg-primary">予約</div>;
};

const BookCalendar = ({
  events,
  checkInDate,
  numOfNight,
  ...calendarProps
}: Props) => {
  const getTileContent = ({ date, view }: CalendarTileProperties) => {
    if (view !== "month") {
      return null;
    }

    if (
      dayjs(date).isBetween(
        checkInDate,
        dayjs(checkInDate).add(numOfNight, "d"),
        "d",
        "[]"
      )
    ) {
      return <BookTile />;
    }
    return null;
  };

  const getTileDisabled = (props: CalendarTileProperties) => {
    const { view } = props;
    const today = dayjs();
    const getCheckInDateTime = (date: Date) =>
      dayjs(date)
        .set("hour", 15)
        .set("minute", 0)
        .set("second", 0)
        .set("millisecond", 0);
    const date = getCheckInDateTime(props.date);
    if (view === "year" && date.isBefore(today, "m")) {
      return true;
    }

    if (today.isAfter(date, "d")) {
      return true;
    }
    const disabled = events.some((event) =>
      dayjs(date).isBetween(event.start, event.end, "h", "[]")
    );
    return disabled;
  };
  return (
    <Calendar
      {...calendarProps}
      maxDetail="month"
      minDetail="year"
      tileDisabled={getTileDisabled}
      tileContent={getTileContent}
    />
  );
};

export default BookCalendar;
