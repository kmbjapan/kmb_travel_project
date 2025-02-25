// src/services/checkInService.ts
import { CheckInData } from "@/data/checkin/checkIn";
import dayjs from "dayjs";

const BASE_URL = "http://localhost:8080/api/checkin";

/**
 * 전체 체크인 리스트 가져오기
 */
export const fetchCheckInList = async (
  packageId?: string
): Promise<CheckInData[]> => {
  const url = packageId ? `${BASE_URL}?packageId=${packageId}` : BASE_URL;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("チェックインリストの取得に失敗しました。");
    return res.json();
  } catch (error) {
    console.error("fetchCheckInList 에러:", error);
    return [];
  }
};

/**
 * 특정 체크인 상세 정보 가져오기
 */
export const fetchCheckInDetail = async (
  checkinId: number
): Promise<CheckInData | null> => {
  try {
    const res = await fetch(`${BASE_URL}/detail/${checkinId}`);
    if (!res.ok) throw new Error("チェックイン詳細情報の取得に失敗しました。");
    const data: CheckInData = await res.json();

    return {
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
    };
  } catch (error) {
    console.error("fetchCheckInDetail 에러:", error);
    return null;
  }
};
