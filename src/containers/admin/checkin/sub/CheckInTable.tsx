"use client";

import React, { useEffect, useState } from "react";
import Buttons from "@/components/Common/Buttons";
import {
  ButtonGroup,
  Chip,
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

  // 부모로부터 checkinList가 변경되면 로컬 상태 업데이트
  useEffect(() => {
    setLocalCheckinList(checkinList);
  }, [checkinList]);

  // 체크인 상태 토글 함수
  const toggleStatus = async (checkinId: number, currentStatus: number) => {
    const newStatus = currentStatus === 0 ? 1 : 0;
    try {
      await updateCheckInStatus(checkinId, newStatus);
      // 로컬 상태 업데이트: 해당 체크인 항목의 status 값을 변경
      setLocalCheckinList((prevList) =>
        prevList.map((item) =>
          item.checkinId === checkinId ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error("상태 업데이트 에러:", error);
    }
  };

  // 로컬 상태를 기준으로 정렬
  const sortedCheckinList = [...localCheckinList].sort(
    (a, b) => a.checkinId - b.checkinId
  );

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table sx={{ minWidth: 650 }} aria-label="check-in table">
        <TableHead>
          <TableRow>
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
          {sortedCheckinList.map((cki) => (
            <TableRow key={cki.checkinId} hover>
              <TableCell>{cki.checkinId}</TableCell>
              <TableCell sx={{ color: "primary.main", cursor: "pointer" }}>
                <Link href={`/admin/checkin/detail/${cki.checkinId}`}>
                  {cki.guestName}
                </Link>
              </TableCell>
              <TableCell>{cki.guestCount}</TableCell>
              <TableCell>{cki.guestPhone} </TableCell>
              <TableCell>{cki.departureDate}</TableCell>
              <TableCell>{cki.specialRequests}</TableCell>
              <TableCell>
                <ButtonGroup size="small">
                  {/* <Link href={`/admin/packages/detail/${cki.checkInId}`}>
                    <Buttons
                      onPackageDetailClick={() =>
                        console.log(`パッケージ詳細クリック: ${cki.checkInId}`)
                      }
                      isPackageDetailVisble={true}
                    />
                  </Link> */}
                  <Buttons
                    isCheckInPage={true}
                    status={cki.status}
                    onStatusToggle={() =>
                      toggleStatus(cki.checkinId, cki.status)
                    }
                  />
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CheckInTable;
