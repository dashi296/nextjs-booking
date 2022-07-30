import { PropsWithChildren, ReactNode } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  content?: ReactNode;
  actions?: ReactNode;
};

const CustomDialog = ({
  open,
  onClose,
  title,
  content,
  actions,
}: PropsWithChildren<Props>) => {
  return (
    <Dialog open={open} onClose={onClose}>
      {title && <DialogTitle>{title}</DialogTitle>}
      {content && <DialogContent>{content}</DialogContent>}
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

export default CustomDialog;
