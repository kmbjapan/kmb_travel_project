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

interface AutuModalProps {
  open: boolean;
  onClose: () => void;
}

const AutuModal: React.FC<AutuModalProps> = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          email,
          password,
        }
      );
      setMessage(response.data); // "회원가입 성공!" 메시지 표시
    } catch (error: unknown) {
      // ✅ error 타입을 unknown으로 지정하여 TypeScript 오류 해결
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data || "회원가입 실패");
      } else {
        setMessage("알 수 없는 오류 발생");
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>管理者アカウント登録</DialogTitle>
      <DialogContent>
        <TextField
          label="アカウント"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3"
        />
        <TextField
          label="パスワード"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3"
        />
        {message && <p className="text-red-500">{message}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          戻る
        </Button>
        <Button onClick={handleRegister} color="primary" variant="contained">
          新規登録
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AutuModal;
