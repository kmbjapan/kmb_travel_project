"use client";

import React from "react";
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

// ダミーデータの例
// const dummyPackages = [
//   {
//     checkInId: 1,
//     guestName: "キム",
//     guestCount: 4,
//     guestPhone: "080-1234-5678",
//     packageDepature: "2025-03-01",
//     specialRequests: "足の障害があります。",
//     status: "active",
//   },
//   {
//     checkInId: 2,
//     guestName: "木村良平",
//     guestCount: 3,
//     guestPhone: "090-1234-5678",
//     packageDepature: "2025-04-15",
//     specialRequests: "子供が2歳です。",
//     status: "inactive",
//   },
//   {
//     checkInId: 3,
//     guestName: "松下零落",
//     guestCount: 2,
//     guestPhone: "070-1234-5678",
//     packageDepature: "2025-04-15",
//     specialRequests: "",
//     status: "inactive",
//   },
// ];

const CheckInTable = ({ checkinList }: CheckIntableProps) => {
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
          {checkinList.map((cki) => (
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
                  <Buttons isCheckInPage={true}></Buttons>
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
