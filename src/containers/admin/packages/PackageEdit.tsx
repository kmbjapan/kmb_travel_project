"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import PackageForm from "./sub/PackageForm";

const PackageEdit = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/packages/detail/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("パッケージ情報を呼んで来られないです。");
          }
          return res.json();
        })
        .then((data) => {
          setInitialData({
            ...data,
            departureDate: data.departureDate
              ? dayjs(data.departureDate).format("YYYY-MM-DD")
              : null,
            createdAt: data.createdAt
              ? dayjs(data.createdAt).format("YYYY-MM-DD HH:mm")
              : "不明",
            updatedAt: data.updatedAt
              ? dayjs(data.updatedAt).format("YYYY-MM-DD HH:mm")
              : "不明",
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("パッケージ情報ロードエラー:", error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleUpdate = async (updatedData: any) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/packages/edit/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...updatedData,
            departureDate: updatedData.departureDate
              ? dayjs(updatedData.departureDate).format("YYYY-MM-DD")
              : "",
          }),
        }
      );
      if (!response.ok) {
        throw new Error("パッケージの修正に失敗しました。");
      }
      const result = await response.json();
      console.log("パッケージ修正成功:", result);
      window.location.href = "/admin/packages";
    } catch (error) {
      console.error("パッケージ修正エラー:", error);
    }
  };

  if (loading) {
    return <p>データを呼び出す中...</p>;
  }
  if (!initialData) {
    return <p>パッケージがなし。</p>;
  }

  return <PackageForm initialData={initialData} onSubmit={handleUpdate} />;
};

export default PackageEdit;
