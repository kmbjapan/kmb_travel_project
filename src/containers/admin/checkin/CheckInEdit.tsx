"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import CheckInForm, { CheckInFormData } from "./sub/CheckInForm";
import { updateCheckIn } from "@/services/checkInService";

const CheckInEdit: React.FC = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState<CheckInFormData | null>(null);
  const [loading, setLoading] = useState(true);

  // APIからチェックインの初期データを取得する
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/checkin/detail/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("チェックイン情報の取得に失敗しました。");
          }
          return res.json();
        })
        .then((data) => {
          // APIのフィールド名に合わせて適宜変換してください
          setInitialData({
            guestName: data.guestName,
            guestCount: data.guestCount,
            guestPhone: data.guestPhone,
            guestEmail: data.guestEmail,
            specialRequests: data.specialRequests,
            packageDepature: data.departureDate
              ? dayjs(data.departureDate).format("YYYY-MM-DD")
              : null,
            packageId: data.packageId ? String(data.packageId) : "",
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("チェックインデータ読み込みエラー:", error);
          setLoading(false);
        });
    }
  }, [id]);

  // チェックイン更新API呼び出しハンドラ
  const handleUpdate = async (updatedData: CheckInFormData) => {
    try {
      const checkinId = Number(id);
      const requestData = {
        guestName: updatedData.guestName,
        guestCount: updatedData.guestCount,
        guestPhone: updatedData.guestPhone,
        guestEmail: updatedData.guestEmail,
        specialRequests: updatedData.specialRequests,
        packageId: updatedData.packageId,
        departureDate: updatedData.packageDepature
          ? dayjs(updatedData.packageDepature).format("YYYY-MM-DD")
          : "",
      };
      const result = await updateCheckIn(checkinId, requestData);
      console.log("チェックイン更新成功:", result);
      alert("顧客情報を修正しました。");
      window.location.href = "/admin/checkin";
    } catch (error) {
      console.error("チェックイン更新エラー:", error);
    }
  };

  if (loading) {
    return <p>データ読み込み中...</p>;
  }
  if (!initialData) {
    return <p>チェックイン情報が見つかりません。</p>;
  }

  return <CheckInForm initialData={initialData} onSubmit={handleUpdate} />;
};

export default CheckInEdit;
