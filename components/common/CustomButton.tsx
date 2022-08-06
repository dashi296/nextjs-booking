import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { PropsWithChildren } from "react";

type Props = ButtonProps & {
  loading?: boolean;
};

const CustomButton = ({
  children,
  loading = false,
  ...buttonProps
}: PropsWithChildren<Props>) => {
  if (loading) {
    return (
      <Button variant="contained" disabled {...buttonProps}>
        <CircularProgress />
      </Button>
    );
  }
  return (
    <Button variant="contained" {...buttonProps}>
      {children}
    </Button>
  );
};

export default CustomButton;
