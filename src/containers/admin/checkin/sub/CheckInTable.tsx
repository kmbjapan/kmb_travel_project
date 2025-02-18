"use client";

import React, { useEffect, useState } from "react";
import Buttons from "@/components/Common/Buttons";
import {
  ButtonGroup,
  Checkbox,
  Chip,
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
import { updateCheckInStatus } from "@/services/checkInService";

interface CheckInData {
  checkinId: number;
  guestName: string;
  guestPhone: string;
  guestCount: number;
  guestEmail: string;
  specialRequests: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  packageName: string;
  departureDate: string;
  staffName: string;
}

interface CheckIntableProps {
  checkinList: CheckInData[];
}

const CheckInTable = ({ checkinList }: CheckIntableProps) => {
  // 로컬 상태에 props로 받은 checkinList를 저장
  const [localCheckinList, setLocalCheckinList] =
    useState<CheckInData[]>(checkinList);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  // 부모로부터 checkinList가 변경되면 로컬 상태 업데이트
  useEffect(() => {
    setLocalCheckinList(checkinList);
  }, [checkinList]);

  // 체크인 상태 토글 함수
  const toggleStatus = async (checkinId: number, currentStatus: number) => {
    const newStatus = currentStatus === 0 ? 1 : 0;
    try {
      setLoadingId(checkinId); // 업데이트 시작: 해당 항목을 로딩 상태로 설정
      await updateCheckInStatus(checkinId, newStatus);
      // 로컬 상태 업데이트: 해당 체크인 항목의 status 값 변경
      setLocalCheckinList((prevList) =>
        prevList.map((item) =>
          item.checkinId === checkinId ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error("상태 업데이트 에러:", error);
    } finally {
      setLoadingId(null); // 업데이트 종료: 로딩 상태 초기화
    }
  };

  const sortedCheckinList = [...localCheckinList].sort(
    (a, b) => a.checkinId - b.checkinId
  );

  // 2.CheckBox関連
  // 2-1.配列の形で全体の情報を盛り込む
  const [selected, setSelected] = useState<number[]>([]);

  // 2-2. CheckBox押すとpackageIdを選択したりとか、
  const handleCheckboxClick = (packageId: number) => {
    setSelected((prevSelected) =>
      prevSelected.includes(packageId)
        ? prevSelected.filter((id) => id !== packageId)
        : [...prevSelected, packageId]
    );
  };
  // 2-3. CheckBox押すと全体選択する。
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = checkinList.map((ckl) => ckl.checkinId);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  // ...
  useEffect(() => {
    console.log("  ID 체쿠:", selected);
  }, [selected]);

  // 2-4. CheckBoxについてDeleteHandlerAPI要請
  const handleDeleteSelected = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/checkin/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ checkInIds: selected }),
      });
      if (response.ok) {
        console.log("Delete Sucessed");
        alert("**顧客名簿**を削除しました。");
        window.location.href = "/admin/checkin";
      } else {
        // console.error("Delete Failed", response.status);
        const errorData = await response.json();
        alert(errorData.message || "削除のError。");
      }
    } catch (error) {
      console.error("Delete Error", error);
      alert("削除のエラー");
    }
  };

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table sx={{ minWidth: 650 }} aria-label="check-in table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              {/* 2.CheckBox関連::全体クリックする */}
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
                {/* 2.CheckBox関連:: 個別クリックする */}
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isItemSelected}
                    onChange={() => handleCheckboxClick(cki.checkinId)}
                    sx={{
                      color: "blue",
                      "&.Mui-checked": {
                        color: "blue",
                      },
                    }}
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
      <Buttons isDeleteVisible={true} onDeleteClick={handleDeleteSelected} />
    </TableContainer>
  );
};

export default CheckInTable;
