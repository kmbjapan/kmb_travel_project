import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Grid,
  Stack,
  Paper,
} from "@mui/material";
import Link from "next/link";
import { TravelExplore } from "@mui/icons-material";

interface InfoProps {
  tourId: number;
  packageName: string;
  course: string;
  maxPeople: number;
  assignedPerson: string;
  departureDate: string;
  busDriver: string;
  busInfo1: string;
  busInfo2: string;
  tourDescription: string;
  status: string;
}

const PackageInfoList: React.FC<InfoProps> = ({
  tourId,
  packageName,
  course,
  maxPeople,
  assignedPerson,
  departureDate,
  busDriver,
  busInfo1,
  busInfo2,
  tourDescription,
  status,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "出発":
        return "bg-green-100 text-green-700";
      case "出発前":
        return "bg-blue-100 text-blue-700";
      case "完了":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Paper className="max-w-3xl p-4 shadow-md rounded-lg mb-4">
      <Box className="flex justify-left ">
        <TravelExplore />
        <Box className="text-2xl ml-2">パッケージ基本情報</Box>
      </Box>
      <br></br>
      <br></br>
      <br></br>

      <Box className="flex justify-between mb-4">
        <Box>
          <Typography className="text-gray-500 text-s">状態</Typography>
          <Box className="mt-1">
            <Chip
              label={status}
              className={`px-3 py-1 text-xs font-medium rounded-lg ${getStatusColor(
                status
              )}`}
            />
          </Box>
        </Box>
        <Box className="text-right mb-4">
          <Typography className="text-gray-500 text-s">出発予定</Typography>
          <Typography className="text-sm mt-1">{departureDate}</Typography>
        </Box>
      </Box>

      <hr className="border-t border-gray-300 my-4" />

      <Box className="grid grid-cols-1 gap-4 mb-10 ">
        <Box>
          <Typography className="text-gray-500 text-2xl ">
            パッケージ名
          </Typography>
          <Typography className="text-sm mt-1 pl-20">{packageName}</Typography>
        </Box>
      </Box>

      <Box className="grid grid-cols-2 gap-4 mb-10 text-right">
        <Box>
          <Typography className="text-gray-500 text-s ">コース</Typography>
          <Typography className="text-sm mt-1">{course}</Typography>
        </Box>
        <Box>
          <Typography className="text-gray-500 text-s">担当者</Typography>
          <Typography className="text-sm mt-1">{assignedPerson}　様</Typography>
        </Box>
      </Box>

      <Box className="grid grid-cols-2 gap-4 mb-10 text-right">
        <Box>
          <Typography className="text-gray-500 text-s">バス情報1</Typography>
          <Typography className="text-sm mt-1">{busInfo1}</Typography>
        </Box>
        <Box>
          <Typography className="text-gray-500 text-s">バス情報2</Typography>
          <Typography className="text-sm mt-1">{busInfo2}</Typography>
        </Box>
        <Box>
          <Typography className="text-gray-500 text-s">バス運転手</Typography>
          <Typography className="text-sm mt-1">{busDriver}　様</Typography>
        </Box>
      </Box>

      <Box className="grid grid-cols-2 gap-4 mb-10 text-right">
        <Box>
          <Typography className="text-gray-500 text-s">最大定員</Typography>
          <Typography className="text-sm mt-1">{maxPeople}名</Typography>
        </Box>
        <Box>
          <Typography className="text-gray-500 text-s">現在人数</Typography>
          <Typography className="text-sm mt-1">{tourId}名</Typography>
        </Box>
      </Box>

      <hr className="border-t border-gray-300 my-4" />

      <Box className="text-right mb-4">
        <Link href={`/admin/packages/detail/${tourId}`} passHref>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg">
            詳細を見る
          </Button>
        </Link>
      </Box>
    </Paper>
  );
};

export default PackageInfoList;
