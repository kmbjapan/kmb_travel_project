"use client";

import React, { useState } from "react";
import dayjs from "dayjs";
import { Typography, Box, Paper, Chip } from "@mui/material";
import { TravelExplore } from "@mui/icons-material";
import Buttons from "@/components/Common/Buttons";
import { useRouter } from "next/navigation";
import { PackageData } from "@/data/package/package";
import { deleteSelectedPackages } from "@/services/packagesService";

const computeStatus = (status: number): number => {
  return status;
};

const getStatusText = (status: number): string => {
  switch (status) {
    case 0:
      return "出発前";
    case 1:
      return "出発";
    case 2:
      return "完了";
    default:
      return "Unknown";
  }
};

const getStatusColor = (status: number): string => {
  switch (status) {
    case 0:
      return "bg-blue-100 text-blue-700";
    case 1:
      return "bg-green-100 text-green-700";
    case 2:
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const PackageInfoList: React.FC<PackageData> = ({
  packageId,
  packageName,
  departureDate,
  busNumber1,
  busNumber2,
  status,
  currentSeats,
  totalSeats,
  courseName,
  staffName,
  driverName,
  createdAt,
  updatedAt,
  packageCode,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      const res = await deleteSelectedPackages([id]);
      alert("パッケージを削除しました。");
      window.location.href = "/admin/packages";
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const computedStatus = computeStatus(status);

  return (
    <Paper className="w-full p-4 shadow-md rounded-lg mb-4">
      <Box className="flex items-center">
        <TravelExplore />
        <Box className="text-2xl ml-2 mb-10">パッケージ基本情報</Box>
      </Box>
      <Box className="flex justify-between mb-4">
        <Box>
          <Typography className="text-gray-500 text-sm">状態</Typography>
          <Box className="mt-1">
            <Chip
              label={getStatusText(computedStatus)}
              className={`px-3 py-1 text-xs font-medium rounded-lg ${getStatusColor(
                computedStatus
              )}`}
            />
          </Box>
        </Box>
        <Box className="text-right mb-4">
          <Typography className="text-gray-500 text-sm">出発予定</Typography>
          <Typography className="text-sm mt-1">
            {departureDate ? dayjs(departureDate).format("YYYY-MM-DD") : "未定"}{" "}
          </Typography>
        </Box>
        <Box>
          <Typography className="text-gray-500 text-sm">管理番号</Typography>
          <Typography className="text-sm mt-1">
            {packageCode ?? "未設定"}
          </Typography>
        </Box>
      </Box>
      <Box className="border-t border-gray-300 my-4" />
      <Box className="grid grid-cols-1 gap-4 mb-10">
        <Box>
          <Typography className="text-gray-500 text-2xl">
            パッケージ名
          </Typography>
          <Typography className="text-sm mt-1 pl-20">{packageName}</Typography>
        </Box>
      </Box>
      <Box className="grid grid-cols-2 gap-4 mb-10 text-right">
        <Box>
          <Typography className="text-gray-500 text-sm">コース</Typography>
          <Typography className="text-sm mt-1">{courseName}</Typography>
        </Box>
        <Box>
          <Typography className="text-gray-500 text-sm">担当者</Typography>
          <Typography className="text-sm mt-1">{staffName} 様</Typography>
        </Box>
      </Box>
      <Box className="grid grid-cols-2 gap-4 mb-10 text-right">
        <Box>
          <Typography className="text-gray-500 text-sm">バス情報1</Typography>
          <Typography className="text-sm mt-1">{busNumber1}</Typography>
        </Box>
        <Box>
          <Typography className="text-gray-500 text-sm">バス情報2</Typography>
          <Typography className="text-sm mt-1">{busNumber2}</Typography>
        </Box>
        <Box>
          <Typography className="text-gray-500 text-sm">バス運転手</Typography>
          <Typography className="text-sm mt-1">{driverName} 様</Typography>
        </Box>
      </Box>
      <Box className="border-t border-gray-300 my-4" />

      <Box className="flex justify-between mt-4">
        <Buttons onBackClick={() => window.history.back()} />
        <Box className="flex space-x-2">
          <Buttons
            onDeleteClick={handleDelete}
            isDeleteVisible={true}
            id={packageId}
          />
          <Buttons
            onEditClick={() => router.push(`/admin/packages/edit/${packageId}`)}
            isEditPage={true}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default PackageInfoList;
