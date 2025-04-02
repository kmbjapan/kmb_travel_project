"use client";

import { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        { email, password }
      );
      setMessage("✅ 登録に成功しました！");
      setSuccess(true);
      setEmail("");
      setPassword("");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data || "❌ 登録に失敗しました");
      } else {
        setMessage("❌ 不明なエラーが発生しました");
      }
      setSuccess(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        アカウント新規登録
      </Typography>

      <Box display="flex" flexDirection="column" gap={3}>
        <TextField
          label="メールアドレス"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="パスワード"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleRegister}
          disabled={!email || !password}
        >
          登録する
        </Button>

        {message && (
          <Alert severity={success ? "success" : "error"}>{message}</Alert>
        )}
      </Box>
    </Container>
  );
};

export default RegisterForm;
