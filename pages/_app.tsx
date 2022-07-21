import "../styles/globals.css";
import type { AppProps } from "next/app";
import CustomHeader from "../components/common/CustomHeader";
import CustomFooter from "../components/common/CustomFooter";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CustomHeader />
      <Component {...pageProps} />
      <CustomFooter />
    </>
  );
}

export default MyApp;
