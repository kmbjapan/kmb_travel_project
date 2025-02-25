"use client";

import React, { useState } from "react";
import { Typography, Box, Paper, Button } from "@mui/material";
import { Person, Sync, Phone, Mail } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Buttons from "@/components/Common/Buttons";
// status関数
import { deleteCheckIn, updateCheckInStatus } from "@/services/checkInService";
import CircularProgress from "@mui/material/CircularProgress";
import { CheckInData } from "@/data/checkin/checkIn";

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

  // サーバーでまらったstatusの値がDefalt
  const [checkInStatus, setCheckInStatus] = useState<number>(status);

  const toggleCheckInStatus = async () => {
    const newStatus = checkInStatus === 0 ? 1 : 0;
    try {
      setLoading(true);
      await updateCheckInStatus(checkinId, newStatus);
      setCheckInStatus(newStatus);
    } catch (err) {
      console.error("status update error:", err);
      setError("status updateできない.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      const res = await deleteCheckIn(id);
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
        <Buttons
          isCheckInPage={true}
          status={checkInStatus}
          onStatusToggle={toggleCheckInStatus}
        />
        {loading && <CircularProgress size={24} style={{ marginLeft: 8 }} />}
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
