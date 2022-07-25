import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import CustomHeader from "../components/common/CustomHeader";
import CustomFooter from "../components/common/CustomFooter";
import createEmotionCache from "../mui/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <CustomHeader />
      <Component {...pageProps} />
      <CustomFooter />
    </CacheProvider>
  );
}

export default MyApp;
