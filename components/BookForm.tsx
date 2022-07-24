import dayjs from "dayjs";
import { useForm, Controller, useWatch } from "react-hook-form";
import { object, number, date } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CalendarEvent } from "../types/CalendarEvent";
import BookCalendar from "./BookCalendar";

import "react-calendar/dist/Calendar.css";

type Props = {
  events: CalendarEvent[];
};

const schema = object({
  checkInDate: date().required(),
  numOfNight: number().positive().integer().required(),
}).required();

const defaultValues = {
  checkInDate: dayjs().add(1, "d").toDate(),
  numOfNight: 1,
};

const BookForm = ({ events }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const checkInDate = useWatch({ control, name: "checkInDate" });
  const numOfNight = useWatch({ control, name: "numOfNight" });

  const onSubmit = handleSubmit((data) => {
    console.warn(data);
  });
  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      <Controller
        control={control}
        name="checkInDate"
        render={({ field: { value, onChange } }) => (
          <BookCalendar
            events={events}
            checkInDate={checkInDate}
            numOfNight={numOfNight}
            locale="ja-JP"
            value={value}
            onClickDay={onChange}
          />
        )}
      />
      <label>チェックイン日</label>
      <div>{dayjs(checkInDate).format("YYYY/MM/DD")}</div>
      <label>宿泊数</label>
      <input {...register("numOfNight")} />
      <button type="submit">予約</button>
    </form>
  );
};

export default BookForm;