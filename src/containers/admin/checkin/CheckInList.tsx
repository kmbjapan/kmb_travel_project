"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchCheckInList } from "@/services/getCheckInList";
import Buttons from "@/components/Common/Buttons";
import SearchBar from "@/components/Common/SearchBar";
import CheckInTable from "./sub/CheckInTable";
import InputBox from "@/components/Common/InputBox";
import CSVModal from "@/components/Modal/CSVModal";
import ExcelModal from "@/components/Modal/ExcelModal";

import { CheckInData } from "@/data/checkin/checkIn";

interface CheckInListProps {
  id?: string;
}

const CheckInList: React.FC<CheckInListProps> = ({ id }) => {
  // ✅ チェックインデータを保存する状態
  const [checkinData, setCheckinData] = useState<CheckInData[]>([]);
  // ✅ CSVモーダルの状態を管理
  const [isCSVModalOpen, setCSVModalOpen] = useState(false);
  // ✅ Excelモーダルの状態を管理
  const [isExcelModalOpen, setExcelModalOpen] = useState(false);
  // ✅ Next.jsのルーターを使用
  const router = useRouter();

  // ✅ チェックインデータを取得
  // ✅ 체크인 데이터를 가져오기
  useEffect(() => {
    fetchCheckInList(id).then(setCheckinData);
  }, [id]);

  // ✅ パッケージ情報の抽出 (id がある場合のみ設定)
  // ✅ 패키지 정보 추출 (id가 있을 때만 설정)
  const packageInfo =
    id && checkinData.length > 0
      ? {
          packageName: checkinData[0].packageName,
          departureDate: checkinData[0].departureDate,
          staffName: checkinData[0].staffName,
        }
      : null;

  return (
    <div className="space-y-4 border border-gray-300 p-6 rounded-lg">
      {/* ✅ パッケージ情報入力フィールド */}
      {/* ✅ 패키지 정보 입력 필드 */}
      <div className="flex items-center gap-4 mb-6">
        <div className="grid grid-cols-2 gap-1">
          <InputBox
            label="パッケージ名"
            value={packageInfo?.packageName ?? ""}
          />
          <InputBox label="出発予定" value={packageInfo?.departureDate ?? ""} />
          <InputBox label="担当者" value={packageInfo?.staffName ?? ""} />
          <SearchBar
            label="顧客名"
            onSearch={(value) => console.log("検索語:", value)}
            isCreatePage={true}
          />
        </div>
      </div>

      {/* ✅ 新しいチェックインデータを登録するボタン */}
      {/* ✅ 새로운 체크인 데이터를 등록하는 버튼 */}
      <Buttons
        onCreateClick={() =>
          router.push(
            id ? `/admin/checkin/create/${id}` : "/admin/checkin/create"
          )
        }
        title="新規顧客登録する"
      />

      {/* ✅ Excel & CSV管理モーダル */}
      {/* ✅ Excel & CSV 관리 모달 */}
      <ExcelModal
        isOpen={isExcelModalOpen}
        onClose={() => setExcelModalOpen(false)}
      />
      <CSVModal
        isOpen={isCSVModalOpen}
        onClose={() => setCSVModalOpen(false)}
      />

      {/* ✅ CSV & Excel 管理ボタン */}
      {/* ✅ CSV & Excel 관리 버튼 */}
      <div className="flex justify-end">
        <button
          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 shadow"
          onClick={() => setExcelModalOpen(true)}
        >
          Excel管理
        </button>
        <button
          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 shadow"
          onClick={() => setCSVModalOpen(true)}
        >
          CSV管理
        </button>
      </div>

      {/* ✅ チェックインデータテーブル */}
      {/* ✅ 체크인 데이터 테이블 */}
      <CheckInTable checkinList={checkinData} />
    </div>
  );
};

export default CheckInList;
