import { Box, Skeleton, Tooltip } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useContext } from "react";
import Calendar, {
  CalendarProps,
  CalendarTileProperties,
} from "react-calendar";
import { BooksContext } from "../contexts/Books";
import { getCheckInDateTime, getCheckOutDateTime } from "../libs/dayjs";
import { CalendarEvent } from "../types/CalendarEvent";
dayjs.extend(isBetween);

type Props = CalendarProps & {
  events?: CalendarEvent[];
};

const BookCalendar = ({ value, events, ...calendarProps }: Props) => {
  const { books } = useContext(BooksContext);

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

  const bookEvents = events.filter(
    (event) => !!event.id && books.includes(event.id)
  );
  const today = dayjs();
  const [checkInDate, checkOutDate] = value as [Date | null, Date | null];
  const getTileClassName = ({ date, view }: CalendarTileProperties) => {
    const tileDate = dayjs(date);
    if (view !== "month") {
      return null;
    }

    if (
      bookEvents.some((event) =>
        tileDate.isBetween(event.start, event.end, "d", "[]")
      )
    ) {
      return "booked";
    }

    if (tileDate.isBetween(checkInDate, checkOutDate, "d", "[]")) {
      return null;
    }
    return null;
  };

  const getMaxCheckOutDate = () => {
    return events.reduce((prev, curr) => {
      const eventStartAt = dayjs(curr.start);
      if (eventStartAt.isBefore(checkInDate)) {
        return prev;
      }
      if (prev === null || prev.isAfter(eventStartAt)) {
        return eventStartAt;
      }
      return prev;
    }, null as Dayjs | null);
  };

  const getTileDisabled = (props: CalendarTileProperties) => {
    const { view } = props;
    const tileDate = dayjs(props.date);
    if (view === "year" && tileDate.isBefore(today, "m")) {
      return true;
    }

    if (!checkInDate) {
      const canCheckIn = () => {
        const tileDateTime = getCheckInDateTime(tileDate);
        // today以前はチェックイン不可
        if (tileDateTime.isBefore(today, "d")) {
          return false;
        }

        // 予定がある日はcheckIn不可
        return !events.some((event) =>
          dayjs(tileDateTime).isBetween(event.start, event.end, "h", "[]")
        );
      };
      return !canCheckIn();
    }
    const canCheckOut = () => {
      const tileDateTime = getCheckOutDateTime(tileDate);
      // チェックイン以前の日付はチェックアウト不可
      if (tileDateTime.isBefore(checkInDate)) {
        return false;
      }
      // チェックイン日以降の直近の予定の日付を取得
      const maxCheckOutDate = getMaxCheckOutDate();
      // 上記日付がない場合、チェックイン日以降はいつでもチェックアウト可
      if (!maxCheckOutDate) {
        return true;
      }
      // 上記日付以前はチェックアウト可能
      return tileDateTime.isBefore(maxCheckOutDate);
    };

    return !canCheckOut();
  };

  return (
    <Calendar
      {...calendarProps}
      value={value}
      maxDetail="month"
      minDetail="year"
      formatDay={(_locale, date) => dayjs(date).format("D")}
      minDate={today.toDate()}
      locale="ja-JP"
      tileDisabled={getTileDisabled}
      tileClassName={getTileClassName}
    />
  );
};

export default BookCalendar;
