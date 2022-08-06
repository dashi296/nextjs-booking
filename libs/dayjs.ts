import dayjs, { Dayjs } from "dayjs";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(require("dayjs/plugin/timezone"));
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

export const getCheckInDateTime = (date: Date | string | Dayjs) =>
  dayjs(date)
    .set("hour", 15)
    .set("minute", 0)
    .set("second", 0)
    .set("millisecond", 0)
    .tz();

export const getCheckOutDateTime = (date: Date | string | Dayjs) =>
  dayjs(date)
    .set("hour", 10)
    .set("minute", 0)
    .set("second", 0)
    .set("millisecond", 0)
    .tz();
