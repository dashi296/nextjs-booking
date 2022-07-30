import { Box, BoxProps } from "@mui/material";
import { PropsWithChildren } from "react";

const Section = ({ children, ...boxProps }: PropsWithChildren<BoxProps>) => {
  return (
    <Box
      {...boxProps}
      sx={{
        p: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...boxProps.sx,
      }}
    >
      {children}
    </Box>
  );
};

export default Section;
