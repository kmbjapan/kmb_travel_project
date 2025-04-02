"use client";

import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const RegisterModal = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleOpen = () => {
    setOpen(true);
    setMessage("");
  };

  const handleClose = () => {
    setOpen(false);
    setEmail("");
    setPassword("");
    setMessage("");
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          email,
          password,
        }
      );
      setMessage("✅ 登録成功: " + response.data);
      setEmail("");
      setPassword("");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data || "❌ 登録失敗");
      } else {
        setMessage("❌ 不明なエラーが発生しました");
      }
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ mb: 2 }}
      >
        アカウント作成
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>管理者アカウント登録</DialogTitle>
        <DialogContent>
          <TextField
            label="アカウント（メール）"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="dense"
          />
          <TextField
            label="パスワード"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="dense"
          />
          {message && (
            <p style={{ color: message.includes("成功") ? "green" : "red" }}>
              {message}
            </p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            戻る
          </Button>
          <Button onClick={handleRegister} color="primary" variant="contained">
            新規登録
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RegisterModal;
