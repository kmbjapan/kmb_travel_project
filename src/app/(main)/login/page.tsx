"use client";

import { useState } from "react";
import { TextField, Button, Card } from "@mui/material";
import { MdAdminPanelSettings } from "react-icons/md";
import axios from "axios";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        }
      );

      const { token, role } = response.data;

      // ✅ JWT 토큰을 LocalStorage에 저장
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // ✅ 역할(Role)에 따라 페이지 이동
      if (role === "ADMIN") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      setError(
        "ログインに失敗しました。アカウントまたはパスワードを確認してください。"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="p-8 w-full max-w-md shadow-lg rounded-2xl bg-white">
        <h2 className="text-center text-3xl font-bold mb-6 text-gray-800 flex items-center justify-center gap-2">
          <MdAdminPanelSettings className="text-blue-600 text-3xl" />
          管理者ログイン
        </h2>
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">
          MinnanoTravel
        </h2>
        <form className="space-y-4">
          <TextField
            label="アカウント"
            variant="outlined"
            fullWidth
            className="bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="パスワード"
            type="password"
            variant="outlined"
            fullWidth
            className="bg-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button
            variant="contained"
            fullWidth
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
            onClick={handleLogin}
          >
            ログイン
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LogIn;
