import { Box, BoxProps, Container, ContainerProps } from "@mui/material";
import { PropsWithChildren } from "react";

const Section = ({
  children,
  ...containerProps
}: PropsWithChildren<ContainerProps>) => {
  return (
    <Container
      {...containerProps}
      maxWidth="xl"
      sx={{
        p: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...containerProps.sx,
      }}
    >
      <Box sx={{ p: 0, m: 0, textAlign: "center" }}>{children}</Box>
    </Container>
  );
};

export default Section;
