import dayjs from "../libs/dayjs";
import BookCalendar from "./BookCalendar";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import useSWR from "swr";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import BookForm from "./BookForm";
import Section from "./Section";
import { DateRange } from "../types/Date";
import SectionTitle from "./SectionTitle";
import { getCheckInDateTime, getCheckOutDateTime } from "../libs/dayjs";

const fetcher = () => {
  return fetch(`/api/events`).then((res) => res.json());
};

const BookSection = () => {
  const theme = useTheme();
  const isMdOrOver = useMediaQuery(theme.breakpoints.up("sm"));
  const [range, setRange] = useState<DateRange>([null, null]);
  const { data: events, mutate: refetchEvents } = useSWR(`/api/events`, () =>
    fetcher()
  );

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const hasCheckInDate = range[0] !== null;
  const hasCheckOutDate = range[1] !== null;

  const onCloseFormDialog = () => {
    setOpenFormDialog(false);
    setRange([null, null]);
  };

  return (
    <Section>
      <SectionTitle>Web予約</SectionTitle>
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
        onChange={(range: [Date] | [Date, Date]) => {
          // checkInDateと同じ日とタップした時は選択キャンセル
          if (dayjs(range[0]).isSame(range[1], "d")) {
            setRange([null, null]);
            return;
          }
          const newRange: DateRange =
            range.length === 1
              ? [getCheckInDateTime(range[0]).toDate(), null]
              : [
                  getCheckInDateTime(range[0]).toDate(),
                  getCheckOutDateTime(range[1]).toDate(),
                ];
          setRange(newRange);
          if (range.length === 2) {
            setOpenFormDialog(true);
          }
        }}
      />
      <Dialog open={openFormDialog} onClose={onCloseFormDialog}>
        <DialogTitle>予約</DialogTitle>
        <DialogContent>
          <BookForm range={range} refetchEvents={refetchEvents} />
        </DialogContent>
      </Dialog>
    </Section>
  );
};

export default BookSection;
