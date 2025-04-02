"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";

type User = {
  id: number;
  email: string;
  role: string;
};

type Props = {
  open: boolean;
  users: User[];
  onClose: () => void;
  onSelect: (user: User) => void;
};

export default function UserListDialog({
  open,
  users,
  onClose,
  onSelect,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>ユーザー選択</DialogTitle>
      <DialogContent>
        <List>
          {users.map((user) => (
            <ListItem disablePadding key={user.id}>
              <ListItemButton onClick={() => onSelect(user)}>
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
        <Button onClick={onClose}>キャンセル</Button>
      </DialogActions>
    </Dialog>
  );
}
