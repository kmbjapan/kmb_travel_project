"use client";

import React from "react";
import dayjs from "dayjs";
import PackageForm from "./sub/PackageForm";
import { createPackage } from "@/services/packagesService";

const PackageCreate = () => {
  const handleCreate = async (data: any) => {
    try {
      // サービス関数を呼び出してパッケージを作成 (서비스 함수를 호출하여 패키지 생성)
      const result = await createPackage(data);
      window.location.href = "/admin/packages";
      alert("パッケージが作成されました！"); // 패키지가 생성되었습니다!
    } catch (error: any) {
      console.error("エラー:", error);
      alert("エラーが発生しました"); // 오류가 발생했습니다.
    }
  };

  return <PackageForm onSubmit={handleCreate} />;
};

export default PackageCreate;
