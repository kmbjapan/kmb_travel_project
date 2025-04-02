// src/services/checkInService.ts
// チェックイン機能の関数-共同化
import axios from "axios";
import endpointData from "../endpoint.json";
import { CheckInData } from "@/data/checkin/checkIn";
import dayjs from "dayjs";
const baseUrl = process.env.NEXT_PUBLIC_API_URL || endpointData.baseUrl;
const checkinBase = endpointData.resources.checkin.base;

// 01. List
export const fetchCheckInList = async (
  packageId?: string
): Promise<CheckInData[]> => {
  const url = packageId
    ? `${baseUrl}${checkinBase}?packageId=${packageId}`
    : `${baseUrl}${checkinBase}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("チェックインリストの取得に失敗しました。");
    }
    return await res.json();
  } catch (error: any) {
    console.error("fetchCheckInList 에러:", error.message || error);
    return [];
  }
};

// 02. Detail
export const fetchCheckInDetail = async (
  checkinId: number
): Promise<CheckInData | null> => {
  const detailEndpoint = endpointData.resources.checkin.detail; // 예: "/detail"
  const url = `${baseUrl}${checkinBase}${detailEndpoint}/${checkinId}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("チェックイン詳細情報の取得に失敗しました。");
    }
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

// 03. Checkinボタン
export const updateCheckInStatus = async (
  checkinId: number,
  newStatus: number
): Promise<any> => {
  try {
    const statusEndpoint = endpointData.resources.checkin.status;
    const url = `${baseUrl}${checkinBase}/${checkinId}${statusEndpoint}`;
    const response = await axios.put(
      url,
      { status: newStatus },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error: any) {
    console.error("Update Fail:", error.message || error);
    throw error;
  }
};

//04. Delete
export const deleteCheckIn = async (checkinId: number): Promise<boolean> => {
  try {
    const deleteEndpoint = endpointData.resources.checkin.delete;
    const url = `${baseUrl}${checkinBase}${deleteEndpoint}/${checkinId}`;
    await axios.delete(url);
    return true;
  } catch (error: any) {
    console.error("deleteCheckIn 에러:", error.message || error);
    throw error;
  }
};

// 05 Check Box Delete
export const deleteCheckInSelected = async (
  checkInIds: number[]
): Promise<void> => {
  try {
    const deleteEndpoint = endpointData.resources.checkin.delete;
    const url = `${baseUrl}${checkinBase}${deleteEndpoint}`;
    await axios.delete(url, {
      headers: { "Content-Type": "application/json" },
      data: { checkInIds },
    });
  } catch (error: any) {
    console.error("deleteCheckInSelected 에러:", error.message || error);
    throw error;
  }
};

// 06. CheckIn Edit
export const updateCheckIn = async (
  checkinId: number,
  data: any
): Promise<CheckInData> => {
  try {
    const editEndpoint = endpointData.resources.checkin.edit;
    const url = `${baseUrl}${checkinBase}${editEndpoint}/${checkinId}`;
    const response = await axios.put(url, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: any) {
    console.error("updateCheckIn 에러:", error.message || error);
    throw error;
  }
};
