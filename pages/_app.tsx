import "../styles/globals.css";
import "../styles/CustomCalendar.scss";
import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import CustomHeader from "../components/common/CustomHeader";
import CustomFooter from "../components/common/CustomFooter";
import createEmotionCache from "../mui/createEmotionCache";
import { BooksProvider } from "../contexts/Books";

const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <BooksProvider>
        <CustomHeader />
        <Component {...pageProps} />
        <CustomFooter />
      </BooksProvider>
    </CacheProvider>
  );
}

export default MyApp;
