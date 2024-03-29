import { css } from "@emotion/react";
import { Box } from "@mui/material";

const GOOGLE_MAP_SRC = process.env.NEXT_PUBLIC_GOOGLE_MAP_SRC;

const iframeWrapper = css`
  max-width: 800px;
  width: 80vw;
  height: 80vw;
  max-height: 500px;
`;

const iframeCss = css`
  border: 0;
  width: 100%;
  height: 100%;
`;

const GoogleMap = () => {
  return (
    <Box css={iframeWrapper}>
      <iframe
        src={GOOGLE_MAP_SRC}
        css={iframeCss}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </Box>
  );
};

export default GoogleMap;
