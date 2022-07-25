import dayjs from "dayjs";
import { useForm, Controller, useWatch } from "react-hook-form";
import { object, number, date } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CalendarEvent } from "../types/CalendarEvent";
import BookCalendar from "./BookCalendar";

import "react-calendar/dist/Calendar.css";
import CustomButton from "./common/CustomButton";
import { Box, TextField } from "@mui/material";

type Props = {
  events: CalendarEvent[];
  onSubmit: ({
    checkInDate,
    numOfNight,
    description,
  }: {
    checkInDate: Date;
    numOfNight: number;
    description: string;
  }) => void;
};

const schema = object({
  checkInDate: date().required(),
  numOfNight: number().positive().integer().required(),
}).required();

const BookForm = ({ events, onSubmit }: Props) => {
  const defaultValues = {
    checkInDate: dayjs().add(1, "d").toDate(),
    numOfNight: 1,
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const checkInDate = useWatch({ control, name: "checkInDate" });
  const numOfNight = useWatch({ control, name: "numOfNight" });

  const submit = handleSubmit((data) => {
    console.warn(data);
    const description = "test";
    onSubmit({ ...data, description });
  });
  return (
    <Box component="form" sx={{ display: "flex" }} onSubmit={submit}>
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
      <Box>
        <label>チェックイン日</label>
        <div>{dayjs(checkInDate).format("YYYY/MM/DD")}</div>
        <TextField label="宿泊数" {...register("numOfNight")} />
        <CustomButton type="submit">予約</CustomButton>
      </Box>
    </Box>
  );
};

export default BookForm;
