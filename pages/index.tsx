import dayjs, { Dayjs } from "dayjs";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";
import BookForm from "../components/BookForm";
import ReactCustomCalendar from "../components/calendar/CustomCalendar";
import CustomButton from "../components/common/CustomButton";
import TopCarousel from "../components/TopCarousel";

const fetcher = ({ year, month }: { year: number; month: number }) => {
  const params = {
    year: `${year}`,
    month: `${month}`,
  };
  const query = new URLSearchParams(params);
  return fetch(`/api/events?${query}`).then((res) => res.json());
};

const book = async ({
  startDate,
  endDate,
}: {
  startDate: Dayjs;
  endDate: Dayjs;
}) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  });
  await fetch("/api/book", { method: "POST", headers, body }).catch((err) =>
    console.error(err)
  );
};

const Home: NextPage = () => {
  const [baseDate, setBaseDate] = useState(dayjs());
  const { data: events = [], error } = useSWR(
    `/api/events?year=${baseDate.year()}&month=${baseDate.month()}`,
    () => fetcher({ year: baseDate.year(), month: baseDate.month() })
  );
  return (
    <div>
      <Head>
        <title>Booking Demo</title>
        <meta name="description" content="booking demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopCarousel />

      <ReactCustomCalendar baseDate={baseDate} events={events} />
      <CustomButton
        onClick={() =>
          book({
            startDate: dayjs().add(6, "day"),
            endDate: dayjs().add(8, "day"),
          })
        }
      >
        予約
      </CustomButton>

      <BookForm events={events} />
    </div>
  );
};

export default Home;
