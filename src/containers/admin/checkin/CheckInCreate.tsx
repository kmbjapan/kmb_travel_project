"use client";

import React from "react";
import CheckInForm from "./sub/CheckInForm";

const CheckinCreate = () => {
  const handleCreate = async (data: any) => {
    const requestData = {
      guestName: data.guestName, // 顧客名
      guestCount: data.guestCount, // 顧客の人数
      guestPhone: data.guestPhone, // 連絡先
      guestEmail: data.guestEmail, // メールアドレス
      specialRequests: data.specialRequests, // 特記事項
      packageId: data.packageId, // 選択されたパッケージ ID
      // ステータス
      // ドライバー ID
    };

    try {
      const response = await fetch("http://localhost:8080/api/checkin/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("チェックインの登録に失敗しました");
      }

      await response.json();
      alert("顧客情報が登録されました！");
      window.location.href = "/admin/checkin"; // 登録後のリダイレクト
    } catch (error) {
      console.error("エラー:", error);
      alert("エラーが発生しました。");
    }
  };

  return <CheckInForm onSubmit={handleCreate} />;
};

export default CheckinCreate;
