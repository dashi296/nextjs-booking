import { Typography, TypographyProps } from "@mui/material";
import { PropsWithChildren } from "react";

const FormSubtitle = ({
  children,
  ...typographyProps
}: PropsWithChildren<TypographyProps>) => {
  return (
    <Typography
      {...typographyProps}
      variant="subtitle2"
      sx={{ pb: 2, ...typographyProps.sx }}
    >
      {children}
    </Typography>
  );
};

export default FormSubtitle;
