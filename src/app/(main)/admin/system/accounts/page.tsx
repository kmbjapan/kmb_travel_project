"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import {
  AccountForm,
  UserListDialog,
  AccountsTable,
} from "../../../../../containers/admin/system";

type User = {
  id: number;
  email: string;
  role: string;
};

export default function AccountsPage() {
  // user 状態
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");

  // dialog 状態
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("유저 불러오기 실패:", err));
  }, []);

  // dialog user 情報 click
  const handleUserSelect = (user: User) => {
    setEmail(user.email);
    setRole(user.role);
    setOpen(false);
  };

  // submit
  const handleSubmit = () => {
    fetch("http://localhost:8080/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, role }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("User Role Change Failed");
        alert("権限が修正されました。");
      })
      .catch((err) => {
        console.error(err);
        alert("エラー発生");
      });
  };

  // PageNation
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // 한 페이지에 5명

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <AdminLayout>
      <div className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-6">アカウント管理</h1>

        {/* FORM */}
        <div className="bg-white rounded-x1 shadow p-6 max-w-md mb-8">
          <AccountForm
            email={email}
            role={role}
            onEmailChange={setEmail}
            onRoleChange={setRole}
            onSubmit={handleSubmit}
          />

          {/* ダイアログのボタン */}
          <button
            onClick={() => setOpen(true)}
            className="mb-4 px-4 py-2 border rounded mt-4"
          >
            ユーザーを選択
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow p-6">
          <AccountsTable users={currentUsers} />
          <div className="flex gap-2 mt-4">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1 ? "bg-gray-300" : ""
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* DIALOG */}
        <UserListDialog
          open={open}
          users={users}
          onClose={() => setOpen(false)}
          onSelect={handleUserSelect}
        />
      </div>
    </AdminLayout>
  );
}

// 次の作業
// User > 修正ロジック > 開発
