import { Box, Skeleton } from "@mui/material";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import Calendar, {
  CalendarProps,
  CalendarTileProperties,
} from "react-calendar";
import { CalendarEvent } from "../types/CalendarEvent";
dayjs.extend(isBetween);

type Props = CalendarProps & {
  events?: CalendarEvent[];
};

const BookTile = () => {
  return <div className="bg-primary" />;
};

const BookCalendar = ({ value, events, ...calendarProps }: Props) => {
  if (events === undefined) {
    return (
      <Box>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={350}
          height={272}
        />
      </Box>
    );
  }
  const [checkInDate, checkOutDate] = value as [Date | null, Date | null];
  const getTileContent = ({ date, view }: CalendarTileProperties) => {
    if (view !== "month") {
      return null;
    }

    if (dayjs(date).isBetween(checkInDate, dayjs(checkOutDate), "d", "[]")) {
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
      locale="ja-JP"
      tileDisabled={getTileDisabled}
      tileContent={getTileContent}
    />
  );
};

export default BookCalendar;
