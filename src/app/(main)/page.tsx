"use client";

// Next.js
import Link from "next/link";
// React.js
// MUI
import UserPageTest from "@/containers/user/UserpageTest";
import { useEffect, useState } from "react";
import { FaUserCircle, FaUserShield } from "react-icons/fa";
import { useUser } from "@/context/UserContext";

export default function MainPage() {
  //　Date連動ステイト
  const { user, loading } = useUser();

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
            <div className="flex items-center text-blue-600 font-semibold">
              <FaUserCircle className="size-8 mr-2" />
              <p>{user.email}</p>
              <p className="ml-2">様</p>
            </div>
          ) : (
            <p className="text-red-500">ログインしていません。</p>
          )}

          <Link
            href="/admin"
            className="flex items-center font-semibold border px-4 py-2 rounded-full shadow-sm text-white bg-gray-800 hover:bg-gray-700"
          >
            <FaUserShield className="size-5 mr-1" />
            管理者ページ
          </Link>
        </div>
      </header>

      <div className="m-20 ">
        <UserPageTest />
      </div>
    </div>
  );
}
