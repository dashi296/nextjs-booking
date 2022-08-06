import { useState, useContext } from "react";
import { useSnackbar } from "notistack";
import axios from "../libs/axios";
import dayjs from "../libs/dayjs";
import { useForm } from "react-hook-form";
import { object, string, number, date, array } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomButton from "./common/CustomButton";
import { Box, TextField } from "@mui/material";
import { DateRange } from "../types/Date";
import FormSubtitle from "./FormSubtitle";
import { BooksContext } from "../contexts/Books";

export type FormInputs = {
  range: DateRange;
  numOfAdults: number;
  numOfChildren: number;
  description: string;
};

const schema = object({
  range: array().of(date()).length(2).required(),
  numOfAdults: number().required(),
  numOfChildren: number().required(),
  description: string(),
}).required();

type Props = {
  range: DateRange;
  refetchEvents: () => void;
  onClose: () => void;
};

const book = ({
  range,
  description,
}: {
  range: DateRange;
  description: string;
}) => {
  const [checkInDate, checkOutDate] = range;
  if (!checkInDate || !checkOutDate) {
    return;
  }

  const body = {
    checkInDate: checkInDate.toISOString(),
    checkOutDate: checkOutDate.toISOString(),
    description,
  };
  return axios.post("/api/book", body);
};

const BookForm = ({ range, refetchEvents, onClose }: Props) => {
  const { addBook } = useContext(BooksContext);
  const { enqueueSnackbar } = useSnackbar();
  const [isBooking, setIsBooking] = useState(false);
  const defaultValues = {
    range,
    numOfAdults: 1,
    numOfChildren: 0,
    description: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const [checkInDate, checkOutDate] = range;

  const checkInDateValue = checkInDate
    ? dayjs(checkInDate).format("YYYY/MM/DD HH:mm")
    : null;
  const checkOutDateValue = checkInDate
    ? dayjs(checkOutDate).format("YYYY/MM/DD HH:mm")
    : null;

  const submit = handleSubmit(async (data) => {
    setIsBooking(true);
    await book(data)
      ?.then((res: any) => {
        const newBook = res.data;
        if (newBook.id !== undefined) {
          addBook(newBook.id);
        }
        refetchEvents();
        onClose();
        enqueueSnackbar("予約しました", { variant: "success" });
      })
      .catch((error) => {
        console.error(error);
      });
    setIsBooking(false);
  });
  return (
    <Box component="form" sx={{ p: 2 }} onSubmit={submit}>
      <Box sx={{ pb: 2 }}>
        <FormSubtitle>宿泊期間</FormSubtitle>
        <TextField label="チェックイン" value={checkInDateValue} disabled />
        <TextField label="チェックアウト" value={checkOutDateValue} disabled />
      </Box>
      <Box sx={{ pb: 2 }}>
        <FormSubtitle>人数</FormSubtitle>
        <TextField
          label="人数(大人)"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          {...register("numOfAdults")}
        />
        <TextField
          label="人数(子供)"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          {...register("numOfChildren")}
        />
      </Box>
      <Box sx={{ pb: 2 }}>
        <TextField
          label="備考"
          multiline
          fullWidth
          rows={5}
          {...register("description")}
        />
      </Box>
      <Box sx={{ pb: 4 }}>
        <CustomButton loading={isBooking} type="submit">
          予約
        </CustomButton>
        <></>
      </Box>
    </Box>
  );
};

export default BookForm;
