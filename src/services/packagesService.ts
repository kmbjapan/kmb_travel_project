// services/packageService.ts
import axios from "axios";
import { PackageData, ReferenceData } from "@/data/package/package";
import endpointData from "../endpoint.json";
import dayjs from "dayjs";

// 환경 변수 우선: NEXT_PUBLIC_API_URL 있으면 사용, 없으면 endpoint.json의 baseUrl 사용
const baseUrl = process.env.NEXT_PUBLIC_API_URL || endpointData.baseUrl;
const packagesBase = endpointData.resources.packages.base;
const byDateEndpoint = endpointData.resources.packages.bydate;

/**
 * 01. 패키지 리스트를 가져오는 함수
 */
export const getPackageList = async (): Promise<PackageData[]> => {
  try {
    const url = `${baseUrl}${packagesBase}`;
    const response = await axios.get<PackageData[]>(url);
    return response.data;
  } catch (error: any) {
    console.error("패키지 데이터 가져오기 오류:", error.message || error);
    return [];
  }
};

/**
 * 02. 선택된 패키지들을 삭제하는 함수
 */
export const deleteSelectedPackages = async (
  selectedIds: number[]
): Promise<boolean> => {
  try {
    const url = `${baseUrl}${packagesBase}${endpointData.resources.packages.delete}`;
    await axios.delete(url, {
      data: { packageIds: selectedIds },
      headers: { "Content-Type": "application/json" },
    });
    return true;
  } catch (error: any) {
    console.error("삭제 오류:", error.message || error);
    alert(error.message || "삭제 오류 발생");
    return false;
  }
};

/**
 * 03. 패키지 상세 정보를 가져오는 함수
 */
export const getPackageDetail = async (
  packageId: number
): Promise<PackageData> => {
  try {
    const url = `${baseUrl}${packagesBase}${endpointData.resources.packages.detail}/${packageId}`;
    const response = await axios.get<PackageData>(url);
    const data = response.data;
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
  } catch (error: any) {
    console.error("패키지 상세 정보 가져오기 오류:", error.message || error);
    throw error;
  }
};

/**
 * 04. 패키지를 생성하는 함수
 */
export const createPackage = async (data: any): Promise<PackageData> => {
  const requestData = {
    packageName: data.packageName,
    busNumber1: data.busNumber1,
    busNumber2: data.busNumber2,
    totalSeats: Number(data.totalSeats),
    departureDate: data.departureDate
      ? dayjs(data.departureDate).format("YYYY-MM-DD")
      : "",
    driverId: data.driverId,
    courseId: data.courseId,
    staffId: data.staffId,
    status: 0,
  };

  try {
    const url = `${baseUrl}${packagesBase}${endpointData.resources.packages.create}`;
    const response = await axios.post<PackageData>(url, requestData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: any) {
    console.error("패키지 생성 오류:", error.message || error);
    throw error;
  }
};

/**
 * 05. 참조 데이터를 가져오는 함수
 */
export const getReferenceData = async (): Promise<ReferenceData> => {
  try {
    const url = `${baseUrl}${packagesBase}${endpointData.resources.packages.referenceData}`;
    const response = await axios.get<ReferenceData>(url);
    return response.data;
  } catch (error: any) {
    console.error("참조 데이터 가져오기 오류:", error.message || error);
    throw error;
  }
};

/**
 * 06. 패키지 업데이트 함수
 * 업데이트 엔드포인트는 `/edit/:id`로 구성되어 있다고 가정합니다.
 */
export const updatePackage = async (
  packageId: number,
  data: any
): Promise<PackageData> => {
  const requestData = {
    ...data,
    departureDate: data.departureDate
      ? dayjs(data.departureDate).format("YYYY-MM-DD")
      : "",
  };

  try {
    // 엔드포인트: baseUrl + packagesBase + "/edit/" + packageId
    const url = `${baseUrl}${packagesBase}/edit/${packageId}`;
    const response = await axios.put<PackageData>(url, requestData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: any) {
    console.error("패키지 수정 오류:", error.message || error);
    throw error;
  }
};

// 07.  指定された(出発日付)に基づいて(パッケージ情報)を呼び出す。
// 使用先: CheckInForm.tsx
export const fetchPackagesByDate = async (
  departure: string
): Promise<PackageData[]> => {
  if (!departure) return [];
  const url = `${baseUrl}${packagesBase}${byDateEndpoint}?departure=${departure}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("パッケージデータの取得に失敗しました。");
    }
    return await res.json();
  } catch (error: any) {
    console.error("fetchPackagesByDate エラー:", error.message || error);
    return [];
  }
};
