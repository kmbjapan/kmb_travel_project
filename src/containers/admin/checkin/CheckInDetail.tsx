"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import CheckInInfoList from "./sub/CheckInInfo";

interface CheckInDetailData {
  checkinId: number;
  guestName: string;
  guestPhone: string;
  guestCount: number;
  guestEmail: string;
  specialRequests: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  departureDate: string;
  packageName: string;
  staffName: string;
}

const CheckInDetail = () => {
  const { id } = useParams();
  const [checkInData, setCheckInData] = useState<CheckInDetailData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("チェックインIDがありません。");
      setLoading(false);
      return;
    }

    const fetchCheckIn = async () => {
      try {
        const checkinId = Number(id);
        if (isNaN(checkinId)) throw new Error("無効なチェックインIDです。");
        const res = await fetch(
          `http://localhost:8080/api/checkin/detail/${checkinId}`
        );
        if (!res.ok)
          throw new Error("チェックイン情報を取得できませんでした。");
        const data: CheckInDetailData = await res.json();

        setCheckInData({
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

    fetchCheckIn();
  }, [id]);

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>{error}</div>;
  if (!checkInData) return <div>データがありません。</div>;

  return (
    <div className="space-y-4 border border-gray-300 p-4 rounded-lg">
      {/* バックエンドから取得したデータを CheckInInfoList コンポーネントに渡す */}
      <CheckInInfoList {...checkInData} />
    </div>
  );
};

export default CheckInDetail;
