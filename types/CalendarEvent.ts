import { Dayjs } from "dayjs";

export type CalendarEvent = {
  id?: string;
  title?: string;
  start?: string | Dayjs;
  end?: string | Dayjs;
};
