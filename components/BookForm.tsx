import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { object, string, number, date, array } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomButton from "./common/CustomButton";
import { Box, TextField } from "@mui/material";

type DateRange = [Date | null, Date | null];

export type FormInputs = {
  range: DateRange;
  numOfAdults: number;
  numOfChildren: number;
  description: string;
};

const book = async ({
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
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const body = JSON.stringify({
    checkInDate: checkInDate.toISOString(),
    checkOutDate: checkOutDate.toISOString(),
    description,
  });
  await fetch("/api/book", { method: "POST", headers, body }).catch((err) =>
    console.error(err)
  );
};

const schema = object({
  range: array().of(date()).length(2).required(),
  numOfAdults: number().required(),
  numOfChildren: number().required(),
  description: string(),
}).required();

type Props = {
  range: DateRange;
};

const BookForm = ({ range }: Props) => {
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

  const submit = handleSubmit((data) => {
    console.log("book: ", data);
    book(data);
  });
  return (
    <Box component="form" sx={{ p: 2 }} onSubmit={submit}>
      <Box sx={{ display: "flex", pb: 2 }}>
        <TextField
          label="チェックイン"
          value={dayjs(checkInDate).format("YYYY/MM/DD")}
          disabled
        />
        <TextField
          label="チェックアウト"
          value={dayjs(checkOutDate).format("YYYY/MM/DD")}
          disabled
        />
      </Box>
      <Box sx={{ display: "flex", pb: 2 }}>
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
        <CustomButton type="submit">予約</CustomButton>
      </Box>
    </Box>
  );
};

export default BookForm;
