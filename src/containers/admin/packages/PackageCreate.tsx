"use client";

import React from "react";
import PackageForm from "./sub/PackageForm";
import { createPackage } from "@/services/packagesService";

const PackageCreate = () => {
  const handleCreate = async (data: any) => {
    try {
      // サービス関数を呼び出してパッケージを作成
      const result = await createPackage(data);
      window.location.href = "/admin/packages";
      alert("パッケージが作成されました！");
    } catch (error: any) {
      console.error("エラー:", error);
      alert("エラーが発生しました");
    }
  };

  return <PackageForm onSubmit={handleCreate} />;
};

export default PackageCreate;
