import "../styles/globals.css";
import "../styles/CustomCalendar.scss";
import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import CustomHeader from "../components/common/CustomHeader";
import CustomFooter from "../components/common/CustomFooter";
import createEmotionCache from "../mui/createEmotionCache";
import { BooksProvider } from "../contexts/Books";
import { SnackbarProvider } from "notistack";

const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <SnackbarProvider maxSnack={3}>
        <BooksProvider>
          <CustomHeader />
          <Component {...pageProps} />
          <CustomFooter />
        </BooksProvider>
      </SnackbarProvider>
    </CacheProvider>
  );
}

export default MyApp;
