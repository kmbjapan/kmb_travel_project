"use client";

import AutuModal from "@/components/Modal/AutuModal";
import { Button } from "@mui/material";
import { useState } from "react";

const AdminHome = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center ">
      <Button onClick={() => setOpen(true)} variant="contained" color="primary">
        アカウント登録
      </Button>
      <AutuModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default AdminHome;
