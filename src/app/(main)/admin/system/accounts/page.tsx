"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import AdminLayout from "@/layouts/AdminLayout";

export default function AccountsPage() {
  // 유저 상태
  const [users, setUsers] = useState<
    { id: number; email: string; role: string }[]
  >([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");

  // 모달 상태
  const [open, setOpen] = useState(false);

  // ✅ 서버에서 유저 리스트 불러오기
  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("유저 불러오기 실패:", err));
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUserSelect = (user: { email: string; role: string }) => {
    setEmail(user.email);
    setRole(user.role);
    handleClose();
  };

  const handleSubmit = () => {
    console.log("제출할 값:", { email, role });
    alert("要請の実装");
  };

  return (
    <AdminLayout>
      <div className="flex flex-col justify-center items-center py-20">
        <Box sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            アカウント編集フォーム
          </Typography>

          <Stack spacing={3} sx={{ maxWidth: 400 }}>
            <Button variant="outlined" onClick={handleOpen}>
              ユーザーを選択
            </Button>

            <TextField
              label="メールアドレス"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              fullWidth
            >
              <MenuItem value="ADMIN">admin</MenuItem>
              <MenuItem value="USER">user</MenuItem>
              <MenuItem value="STAFF">staff</MenuItem>
            </Select>

            <Button variant="contained" color="primary" onClick={handleSubmit}>
              更新する
            </Button>
          </Stack>

          {/* 유저 선택 모달 */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>ユーザー選択</DialogTitle>
            <DialogContent>
              <List>
                {users.map((user) => (
                  <ListItem disablePadding key={user.id}>
                    <ListItemButton onClick={() => handleUserSelect(user)}>
                      <ListItemText
                        primary={user.email}
                        secondary={`Role: ${user.role}`}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>キャンセル</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </div>
    </AdminLayout>
  );
}
