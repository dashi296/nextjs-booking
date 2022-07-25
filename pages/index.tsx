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
  checkInDate,
  numOfNight,
  description,
}: {
  checkInDate: Date;
  numOfNight: number;
  description: string;
}) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const checkOutDate = dayjs(checkInDate).add(numOfNight, "d");
  const body = JSON.stringify({
    checkInDate: checkInDate.toISOString(),
    checkOutDate: checkOutDate.toISOString(),
    description,
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

      <BookForm events={events} onSubmit={book} />
    </div>
  );
};

export default Home;
