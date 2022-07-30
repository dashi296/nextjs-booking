import dayjs, { Dayjs } from "dayjs";

export const getCheckInDateTime = (date: Date | string | Dayjs) =>
  dayjs(date)
    .set("hour", 15)
    .set("minute", 0)
    .set("second", 0)
    .set("millisecond", 0);

export const getCheckOutDateTime = (date: Date | string | Dayjs) =>
  dayjs(date)
    .set("hour", 10)
    .set("minute", 0)
    .set("second", 0)
    .set("millisecond", 0);
