"use client";

import React, { useEffect, useState } from "react";
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
            throw new Error("패키지 정보를 불러올 수 없습니다.");
          }
          return res.json();
        })
        .then((data) => {
          setInitialData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("패키지 정보 로드 오류:", error);
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
          body: JSON.stringify(updatedData),
        }
      );
      if (!response.ok) {
        throw new Error("패키지 수정에 실패하였습니다.");
      }
      const result = await response.json();
      console.log("패키지 수정 성공:", result);
      // 수정 완료 후 패키지 목록으로 이동 (또는 상세 페이지 새로고침)
      window.location.href = "/admin/packages";
    } catch (error) {
      console.error("패키지 수정 오류:", error);
    } finally {
    }
  };

  if (loading) {
    return <p>데이터를 불러오는 중입니다...</p>;
  }
  if (!initialData) {
    return <p>패키지 데이터를 찾을 수 없습니다.</p>;
  }

  return <PackageForm initialData={initialData} onSubmit={handleUpdate} />;
};

export default PackageEdit;
