"use client";

import { useState } from "react";
import { Stack, TextField, Button, Select, MenuItem } from "@mui/material";

type Props = {
  email: string;
  role: string;
  onEmailChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onSubmit: () => void;
};

export default function AccountForm({
  email,
  role,
  onEmailChange,
  onRoleChange,
  onSubmit,
}: Props) {
  return (
    <Stack spacing={2}>
      <TextField
        label="メールアドレス"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
      />
      <Select
        value={role}
        onChange={(e) => onRoleChange(e.target.value)}
        fullWidth
      >
        <MenuItem value="ADMIN">admin</MenuItem>
        <MenuItem value="USER">user</MenuItem>
        <MenuItem value="STAFF">staff</MenuItem>
        <MenuItem value="MASTER">master</MenuItem>
        <MenuItem value="GUIDE">guide</MenuItem>
      </Select>
      <Button variant="contained" onClick={onSubmit}>
        更新する
      </Button>
    </Stack>
  );
}
