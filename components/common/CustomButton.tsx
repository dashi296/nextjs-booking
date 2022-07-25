import { Button, ButtonProps } from "@mui/material";
import { PropsWithChildren } from "react";

type Props = ButtonProps;

const CustomButton = ({
  children,
  ...buttonProps
}: PropsWithChildren<Props>) => {
  return (
    <Button variant="contained" {...buttonProps}>
      {children}
    </Button>
  );
};

export default CustomButton;
