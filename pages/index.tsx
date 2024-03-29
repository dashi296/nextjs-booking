import type { NextPage } from "next";
import Head from "next/head";
import AccessSection from "../components/AccessSection";
import BookSection from "../components/BookSection";
import TopCarousel from "../components/TopCarousel";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Booking Demo</title>
        <meta name="description" content="booking demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopCarousel />

      <BookSection />
      <AccessSection />
    </>
  );
};

export default Home;
