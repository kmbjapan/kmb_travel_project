"use client";

import React, { useState } from "react";
import dayjs from "dayjs";
import { Typography, Box, Paper, Button } from "@mui/material";
import { Person, Sync, Phone, Mail } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Buttons from "@/components/Common/Buttons";

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
  departureDate: string;
  packageName: string;
  staffName: string;
}

const CheckInInfoList: React.FC<CheckInData> = ({
  checkinId,
  guestName,
  guestCount,
  guestEmail,
  guestPhone,
  specialRequests,
  status,
  createdAt,
  updatedAt,
  departureDate,
  packageName,
  staffName,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8080/api/checkin/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("削除を失敗しました。");
      alert("顧客情報を削除しました。");
      window.location.href = "/admin/checkin";
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();
  // 初期状態は "before"（チェックイン前）とする
  const [checkInStatus, setCheckInStatus] = useState<string>("before");

  // チェックイン状態のトグル関数
  const toggleCheckInStatus = () => {
    setCheckInStatus((prevStatus) =>
      prevStatus === "before" ? "checked-in" : "before"
    );
  };

  return (
    <Paper className="w-full p-6 shadow-md rounded-lg bg-white">
      {/* パッケージ情報 */}
      <Box className="mb-6">
        <Typography variant="h6" className="font-semibold flex items-center">
          📦 パッケージ情報
        </Typography>
        <Box className="grid grid-cols-2 gap-4 mt-2">
          <Box>
            <Typography className="text-gray-600">パッケージ名</Typography>
            <Typography className="text-lg">{packageName}</Typography>
          </Box>
          <Box className="text-right">
            <Typography className="text-gray-600">出発予定</Typography>
            <Typography className="text-lg">{departureDate}</Typography>
          </Box>
        </Box>
      </Box>

      {/* 顧客情報 */}
      <Box className="mb-6">
        <Typography variant="h6" className="font-semibold flex items-center">
          <Person className="mr-2" /> 顧客情報
        </Typography>
        <Box className="grid grid-cols-2 gap-4 mt-2">
          <Box>
            <Typography className="text-gray-600">顧客名</Typography>
            <Typography className="text-lg">{guestName}</Typography>
          </Box>
          <Box>
            <Typography className="text-gray-600">人数</Typography>
            <Typography className="text-lg">{guestCount}名</Typography>
          </Box>
          <Box className="flex items-center">
            <Phone className="mr-2 text-gray-600" />
            <Typography className="text-lg">{guestPhone}</Typography>
          </Box>
          <Box className="flex items-center">
            <Mail className="mr-2 text-gray-600" />
            <Typography className="text-lg">{guestEmail}</Typography>
          </Box>
        </Box>
      </Box>

      {/* 特記事項 */}
      <Box className="mb-6">
        <Typography className="text-gray-600">特記事項</Typography>
        <textarea
          className="w-full mt-2 p-2 border rounded-lg"
          rows={3}
          placeholder="特記事項を入力してください..."
          defaultValue={specialRequests}
        />
      </Box>

      {/* 状態 */}
      <Box className="mb-6">
        <Typography variant="h6" className="font-semibold flex items-center">
          <Sync className="mr-2" /> 状態
        </Typography>
        <Button
          variant="contained"
          className={`mt-2 px-6 py-2 rounded-lg ${
            checkInStatus === "checked-in"
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-red-500 hover:bg-red-600"
          } text-white`}
          onClick={toggleCheckInStatus}
        >
          {checkInStatus === "checked-in"
            ? "チェックイン済み"
            : "チェックイン前"}
        </Button>
      </Box>

      {/* アクションボタン */}
      <Box className="flex justify-between mt-4">
        <Buttons onBackClick={() => router.push(`/admin/checkin`)} />

        <Box className="flex space-x-2">
          <Buttons
            onEditClick={() => router.push(`/admin/checkin/edit/${checkinId}`)}
            isEditPage={true}
          />
          <Buttons
            onDeleteClick={handleDelete}
            isDeleteVisible={true}
            id={checkinId}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default CheckInInfoList;
