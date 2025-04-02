"use client";
// Next.js
import Link from "next/link";
// MUI
import { FaUserCircle, FaUserShield } from "react-icons/fa";
import type { RootState, AppDispatch } from "@/store";
import { Login } from "@mui/icons-material";
// React
import { useEffect } from "react";
// redux & UserSlice
import { fetchUser, logout } from "@/store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
// 外部コンポーネント
import UserPageTest from "@/containers/user/UserpageTest";

export default function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="text-gray-800 p-8 h-full overflow-y-auto pb-24">
      <header className="flex justify-between items-center border-b-2 border-gray-300 m-2 pb-4">
        <h1 className="text-2xl font-bold flex items-center">
          旅行会社プロジェクト
        </h1>

        <div className="flex items-center space-x-4">
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : user ? (
            // 状態1：ログインあり
            <>
              <div className="flex items-center text-blue-600 font-semibold">
                <FaUserCircle className="size-8 mr-2" />
                <p>{user.email}</p>
                <p className="ml-2">様</p>
              </div>
              <div>＞＞{user.role}＜＜</div>

              {["MASTER", "ADMIN", "GUIDE"].includes(user?.role ?? "") && (
                <Link href="/admin">
                  <button className="text-blue-500">管理者専用ボタン</button>
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="font-semibold border px-4 py-2 rounded-full shadow-sm text-white bg-red-600 hover:bg-red-500"
              >
                ログアウト
              </button>
            </>
          ) : (
            // 状態2：ログインなし
            <>
              <p className="text-red-500">ログインしていません。</p>

              <Link
                href="/login"
                className="flex items-center font-semibold border px-4 py-2 rounded-full shadow-sm text-white bg-gray-800 hover:bg-gray-700"
              >
                <Login className="size-5 mr-1" />
                ログイン
              </Link>
            </>
          )}
        </div>
      </header>

      <div className="m-20 ">
        <UserPageTest />
      </div>
    </div>
  );
}
