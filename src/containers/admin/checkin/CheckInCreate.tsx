"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CheckInForm from "./sub/CheckInForm";

// 체크인 폼 데이터 타입 정의
interface CheckInFormData {
  guestName: string;
  guestCount: number;
  guestPhone: string;
  guestEmail: string;
  specialRequests: string;
  packageDepature: string | null;
  packageId: string;
}

const CheckinCreate = () => {
  const { id } = useParams(); // URL에서 패키지 ID 가져오기
  const [initialData, setInitialData] = useState<CheckInFormData | null>(null);
  const [loading, setLoading] = useState<boolean>(!!id);

  useEffect(() => {
    if (!id) return; // URL에 ID가 없으면 패스

    const fetchPackageInfo = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/packages/detail/${id}`
        );
        if (!res.ok) throw new Error("パッケージ情報の取得に失敗しました。");

        const packageData = await res.json();
        if (!packageData || Object.keys(packageData).length === 0) {
          throw new Error("無効なパッケージ情報です。");
        }

        // チェックイン
        setInitialData({
          guestName: "",
          guestCount: 1,
          guestPhone: "",
          guestEmail: "",
          specialRequests: "",
          // パッケージ
          packageDepature: packageData.departureDate || null, // 출발 날짜
          // 패키지아이디 받은거 여기다 저장하는듯 ㅇㅇ
          packageId: String(id), // 패키지 ID (string 변환)
        });
      } catch (error) {
        console.error("パッケージ情報取得エラー:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageInfo();
  }, [id]);

  const handleCreate = async (data: CheckInFormData) => {
    const requestData = {
      guestName: data.guestName,
      guestCount: data.guestCount,
      guestPhone: data.guestPhone,
      guestEmail: data.guestEmail,
      specialRequests: data.specialRequests,
      packageId: data.packageId,
    };

    try {
      const response = await fetch("http://localhost:8080/api/checkin/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) throw new Error("チェックインの登録に失敗しました");

      await response.json();
      alert("顧客情報が登録されました！");
      window.location.href = "/admin/checkin";
    } catch (error) {
      console.error("エラー:", error);
      alert("エラーが発生しました。");
    }
  };

  return loading ? (
    <p className="text-center py-20">読み込み中...</p>
  ) : (
    <CheckInForm
      initialData={initialData || undefined}
      onSubmit={handleCreate}
    />
  );
};

export default CheckinCreate;
