"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import PackageInfoList from "@/containers/admin/packages/sub/PackageInfoList";

interface TripPackage {
  packageId: number;
  packageName: string;
  departureDate: string;
  busNumber1: string;
  busNumber2: string;
  status: number; // 0: "出発前", 1: "出発", 2: "完了"
  currentSeats: number;
  totalSeats: number;
  courseName: string;
  staffName: string;
  driverName: string;
  createdAt: string;
  updatedAt: string;
}

const PackageDetail = () => {
  const { id } = useParams();
  const [tripPackage, setTripPackage] = useState<TripPackage | null>(null);
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
        if (isNaN(packageId)) throw new Error("無効なパッケージID");
        const res = await fetch(
          `http://localhost:8080/api/packages/detail/${packageId}`
        );
        if (!res.ok) throw new Error("パッケージを取得できませんでした。");
        const data: TripPackage = await res.json();

        setTripPackage({
          ...data,
          departureDate: data.departureDate
            ? dayjs(data.departureDate).format("YYYY-MM-DD")
            : "未定",
          createdAt: data.createdAt
            ? dayjs(data.createdAt).format("YYYY-MM-DD HH:mm")
            : "不明",
          updatedAt: data.updatedAt
            ? dayjs(data.updatedAt).format("YYYY-MM-DD HH:mm")
            : "不明",
        });
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
      />
    </div>
  );
};

export default PackageDetail;
