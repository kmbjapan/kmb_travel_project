"use client";

import React, { useEffect, useState } from "react";
import {
  ButtonGroup,
  Checkbox,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";
import Buttons from "@/components/Common/Buttons";
import {
  deleteCheckInSelected,
  updateCheckInStatus,
} from "@/services/checkInService";
import { CheckInData } from "@/data/checkin/checkIn";

interface CheckInTableProps {
  checkinList: CheckInData[]; // 親コンポーネントからデータを受け取る(`CheckInList.tsx`에서 데이터를 받아옴)
}

const CheckInTable: React.FC<CheckInTableProps> = ({ checkinList }) => {
  // ローカル状態にpropsで受け取ったデータを保存(로컬 상태에 props로 받은 데이터를 저장)
  const [localCheckinList, setLocalCheckinList] =
    useState<CheckInData[]>(checkinList);
  // 状態変更時のローディング管理(상태 변경 시 로딩 중인지 관리)
  const [loadingId, setLoadingId] = useState<number | null>(null);

  // 親コンポーネントからのデータ変更を監視してローカル状態を更新(부모 컴포넌트에서 받은 데이터가 변경되면 로컬 상태를 업데이트)
  useEffect(() => {
    setLocalCheckinList(checkinList);
  }, [checkinList]);

  // ステータスを切り替える関数(체크인 상태를 변경하는 함수)
  const toggleStatus = async (checkinId: number, currentStatus: number) => {
    const newStatus = currentStatus === 0 ? 1 : 0;
    try {
      setLoadingId(checkinId); // ✅ 更新開始: ローディング状態に設定(업데이트 시작: 해당 항목을 로딩 상태로 설정)
      await updateCheckInStatus(checkinId, newStatus);
      // ローカル状態を更新: チェックインのステータスを変更(로컬 상태 업데이트: 해당 체크인 항목의 status 값 변경)
      setLocalCheckinList((prevList) =>
        prevList.map((item) =>
          item.checkinId === checkinId ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error("ステータス更新エラー:", error);
    } finally {
      setLoadingId(null);
      // 更新終了: ローディング状態を解除(업데이트 종료: 로딩 상태 초기화)
    }
  };

  // チェックインリストをID順にソート(체크인 리스트를 ID 순으로 정렬)
  const sortedCheckinList = [...localCheckinList].sort(
    (a, b) => a.checkinId - b.checkinId
  );

  // チェックボックスの選択管理(체크박스 선택 상태 관리)
  const [selected, setSelected] = useState<number[]>([]);

  // チェックボックスをクリックするとIDを選択・解除(체크박스를 클릭하면 ID를 선택/해제)
  const handleCheckboxClick = (checkinId: number) => {
    setSelected((prevSelected) =>
      prevSelected.includes(checkinId)
        ? prevSelected.filter((id) => id !== checkinId)
        : [...prevSelected, checkinId]
    );
  };

  //  "全選択" チェックボックスの処理("전체 선택" 체크박스 클릭 시 모든 ID 선택 또는 해제)
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = checkinList.map((ckl) => ckl.checkinId);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  // 選択されたチェックインデータを削除(선택된 체크인 데이터를 삭제)
  const handleDeleteSelected = async () => {
    try {
      await deleteCheckInSelected(selected);
      alert("**顧客名簿**を削除しました。");
      window.location.href = "/admin/checkin";
    } catch (error) {
      console.error("削除エラー:", error);
      alert("削除のエラー");
    }
  };

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table sx={{ minWidth: 650 }} aria-label="check-in table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              {/* ✅ 全選択のチェックボックス(전체 선택 체크박스) */}
              <Checkbox
                checked={
                  checkinList.length > 0 &&
                  selected.length === checkinList.length
                }
                indeterminate={
                  selected.length > 0 && selected.length < checkinList.length
                }
                onChange={handleSelectAllClick}
                sx={{
                  color: "blue",
                  "&.Mui-checked": {
                    color: "blue",
                  },
                }}
              />
            </TableCell>
            <TableCell>番号</TableCell>
            <TableCell>顧客名</TableCell>
            <TableCell>人数</TableCell>
            <TableCell>連絡先</TableCell>
            <TableCell>出発予定</TableCell>
            <TableCell>特異事項</TableCell>
            <TableCell>状態</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedCheckinList.map((cki, index) => {
            const isItemSelected = selected.includes(cki.checkinId);
            return (
              <TableRow key={cki.checkinId} hover>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isItemSelected}
                    onChange={() => handleCheckboxClick(cki.checkinId)}
                    sx={{ color: "blue", "&.Mui-checked": { color: "blue" } }}
                  />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell sx={{ color: "primary.main", cursor: "pointer" }}>
                  <Link href={`/admin/checkin/detail/${cki.checkinId}`}>
                    {cki.guestName}
                  </Link>
                </TableCell>
                <TableCell>{cki.guestCount}</TableCell>
                <TableCell>{cki.guestPhone}</TableCell>
                <TableCell>{cki.departureDate}</TableCell>
                <TableCell>{cki.specialRequests}</TableCell>
                <TableCell>
                  <ButtonGroup size="small">
                    {loadingId === cki.checkinId ? (
                      <CircularProgress size={24} />
                    ) : (
                      <Buttons
                        isCheckInPage={true}
                        status={cki.status}
                        onStatusToggle={() =>
                          toggleStatus(cki.checkinId, cki.status)
                        }
                      />
                    )}
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* ✅ 選択されたデータを削除するボタン(선택된 데이터를 삭제하는 버튼) */}
      <Buttons isDeleteVisible={true} onDeleteClick={handleDeleteSelected} />
    </TableContainer>
  );
};

export default CheckInTable;
