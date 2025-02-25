// services/packageService.ts
// パッケージサービス (패키지 서비스)

import { PackageData } from "@/data/package/package";

// 環境変数を利用してAPIのベースURLを設定 (환경 변수를 사용해 API 베이스 URL 설정)
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

/**
 * パッケージ一覧を取得する関数
 * (패키지 리스트를 가져오는 함수)
 */
export const getPackageList = async (): Promise<PackageData[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/packages`);

    if (!response.ok) {
      throw new Error(`HTTPエラー! ステータス: ${response.status}`); // HTTP 오류! 상태 코드 출력
    }

    const data: PackageData[] = await response.json();
    return data;
  } catch (error: any) {
    console.error("パッケージデータの取得エラー:", error.message || error); // 패키지 데이터 가져오기 오류
    return [];
  }
};

/**
 * 選択されたパッケージを削除する関数
 * (선택된 패키지를 삭제하는 함수)
 */
export const deleteSelectedPackages = async (
  selectedIds: number[]
): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/packages/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ packageIds: selectedIds }),
    });

    const result = await response.json(); // 응답 데이터를 JSON으로 변환

    if (!response.ok) {
      throw new Error(result.message || "削除に失敗しました。"); // 삭제 실패 메시지 처리
    }

    return true;
  } catch (error: any) {
    console.error("削除エラー:", error.message || error);
    alert(error.message || "削除のエラー"); // 오류 메시지를 명확히 표시
    return false;
  }
};

// detailPacakgeをどうやってもらうか。
