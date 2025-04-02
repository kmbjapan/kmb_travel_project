"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CheckInInfoList from "./sub/CheckInInfo";
import { fetchCheckInDetail } from "@/services/checkInService";
import { CheckInData } from "@/data/checkin/checkIn";

const CheckInDetail = () => {
  const { id } = useParams();
  const [checkInData, setCheckInData] = useState<CheckInData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("チェックインIDがありません。");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const checkinId = Number(id);
        if (isNaN(checkinId)) throw new Error("無効なチェックインIDです。");
        const data = await fetchCheckInDetail(checkinId);
        if (!data) throw new Error("チェックイン情報を取得できませんでした。");
        setCheckInData(data);
      } catch (err: any) {
        setError(err.message || "データ取得エラー");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
