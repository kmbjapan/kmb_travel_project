"use client";

import React from "react";
import dayjs from "dayjs";
import PackageForm from "./sub/PackageForm";

const PackageCreate = () => {
  const handleCreate = async (data: any) => {
    const requestData = {
      packageName: data.packageName,
      busNumber1: data.busNumber1,
      busNumber2: data.busNumber2,
      totalSeats: Number(data.totalSeats),
      departureDate: data.departureDate
        ? dayjs(data.departureDate).format("YYYY-MM-DD") // ✅ dayjs 적용
        : "",
      driverId: data.driverId,
      courseId: data.courseId,
      staffId: data.staffId,
      status: 0,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/packages/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        throw new Error("パッケージ作成に失敗しました");
      }

      const result = await response.json();
      window.location.href = "/admin/packages";
      alert("パッケージが作成されました！");
    } catch (error) {
      console.error("エラー:", error);
      alert("エラーが発生しました");
    }
  };

  return <PackageForm onSubmit={handleCreate} />;
};

export default PackageCreate;
