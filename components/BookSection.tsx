import dayjs from "dayjs";
import { object, string, number, date, array } from "yup";
import BookCalendar from "./BookCalendar";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import BookForm from "./BookForm";

type DateRange = [Date | null, Date | null];

export type FormInputs = {
  range: DateRange;
  numOfAdults: number;
  numOfChildren: number;
  description: string;
};

const fetcher = ({ year, month }: { year: number; month: number }) => {
  const params = {
    year: `${year}`,
    month: `${month}`,
  };
  const query = new URLSearchParams(params);
  return fetch(`/api/events?${query}`).then((res) => res.json());
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

const BookSection = () => {
  const theme = useTheme();
  const isMdOrOver = useMediaQuery(theme.breakpoints.up("sm"));
  const [range, setRange] = useState<DateRange>([null, null]);
  const today = dayjs();
  const { data: events, error } = useSWR(
    `/api/events?year=${today.year()}&month=${today.month()}`,
    () => fetcher({ year: today.year(), month: today.month() })
  );

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const hasCheckInDate = range[0] !== null;
  const hasCheckOutDate = range[1] !== null;

  const onCloseFormDialog = () => {
    console.warn("onClose");
    setOpenFormDialog(false);
    setRange([null, null]);
  };

  useEffect(() => {
    console.warn("range: ", range);
  }, [range]);

  return (
    <Box>
      <Typography variant="body2">
        {!hasCheckInDate &&
          !hasCheckOutDate &&
          "チェックイン日を選択してください"}
        {hasCheckInDate &&
          !hasCheckOutDate &&
          "チェックアウト日を選択してください"}
      </Typography>
      <BookCalendar
        events={events}
        value={range}
        allowPartialRange
        selectRange
        showDoubleView={isMdOrOver}
        onChange={(values: [Date] | [Date, Date]) => {
          const newRange: DateRange =
            values.length === 1 ? [values[0], null] : values;
          setRange(newRange);
          if (values.length === 2) {
            setOpenFormDialog(true);
          }
        }}
      />
      <Dialog open={openFormDialog} onClose={onCloseFormDialog}>
        <DialogTitle>予約</DialogTitle>
        <DialogContent>
          <BookForm range={range} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default BookSection;
