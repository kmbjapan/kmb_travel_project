"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PackageInfoList from "@/containers/admin/packages/sub/PackageInfoList";
import { PackageData } from "@/data/package/package";
import { getPackageDetail } from "@/services/packagesService";

const PackageDetail = () => {
  const { id } = useParams();
  const [tripPackage, setTripPackage] = useState<PackageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("パッケージのIDがありません。");
      setLoading(false);
      return;
    }

    const fetchPackage = async () => {
      try {
        const packageId = Number(id);
        if (isNaN(packageId)) throw new Error("無効なパッケージID"); // 無効なパッケージID
        const data = await getPackageDetail(packageId);
        setTripPackage(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  if (loading) return <div>ロード中...</div>;
  if (error) return <div>{error}</div>;
  if (!tripPackage) return <div>データがありません。</div>;

  return (
    <div className="space-y-4 border border-gray-300 p-4 rounded-lg">
      <PackageInfoList
        packageId={tripPackage.packageId}
        packageName={tripPackage.packageName}
        departureDate={tripPackage.departureDate}
        busNumber1={tripPackage.busNumber1}
        busNumber2={tripPackage.busNumber2}
        status={tripPackage.status}
        totalSeats={tripPackage.totalSeats}
        currentSeats={tripPackage.currentSeats}
        courseName={tripPackage.courseName}
        staffName={tripPackage.staffName}
        driverName={tripPackage.driverName}
        createdAt={tripPackage.createdAt}
        updatedAt={tripPackage.updatedAt}
        packageCode={tripPackage.packageCode}
      />
    </div>
  );
};

export default PackageDetail;
