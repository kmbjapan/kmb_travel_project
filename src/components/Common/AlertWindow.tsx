"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

interface AlertWindowProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message: string;
}

const AlertWindow: React.FC<AlertWindowProps> = ({
  open,
  onClose,
  title,
  message,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          確認
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertWindow;
