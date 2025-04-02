"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PackageForm from "./sub/PackageForm";
import { getPackageDetail, updatePackage } from "@/services/packagesService";

const PackageEdit = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchPackageDetail = async () => {
        try {
          const packageId = Number(id);
          const data = await getPackageDetail(packageId);
          setInitialData(data);
        } catch (error) {
          console.error("パッケージの情報ロードのエラー:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchPackageDetail();
    }
  }, [id]);

  const handleUpdate = async (updatedData: any) => {
    try {
      const packageId = Number(id);
      const result = await updatePackage(packageId, updatedData);
      console.log("パッケージの修正を成功:", result);
      window.location.href = "/admin/packages";
    } catch (error) {
      console.error("パッケージの修正をエラー:", error);
    }
  };

  if (loading) {
    return <p>データを呼び出し中...</p>;
  }
  if (!initialData) {
    return <p>パッケージがありません。</p>;
  }

  return <PackageForm initialData={initialData} onSubmit={handleUpdate} />;
};

export default PackageEdit;
