import { Typography, TypographyProps } from "@mui/material";
import { PropsWithChildren } from "react";

const SectionTitle = ({
  children,
  ...typographyProps
}: PropsWithChildren<TypographyProps>) => {
  return (
    <Typography
      {...typographyProps}
      variant="h6"
      sx={{ pb: 2, ...typographyProps.sx }}
    >
      {children}
    </Typography>
  );
};

export default SectionTitle;
