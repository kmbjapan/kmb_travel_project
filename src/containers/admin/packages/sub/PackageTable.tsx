"use client";

import dayjs from "dayjs";
import Buttons from "@/components/Common/Buttons";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  ButtonGroup,
} from "@mui/material";
import Link from "next/link";

interface PackageData {
  packageId: number;
  packageName: string;
  busNumber1: string;
  busNumber2: string;
  status: number;
  departureDate: string;
  totalSeats: number;
  courseName: string;
  driverName: string;
  staffName: string;
}

interface PackageTableProps {
  packages: PackageData[];
}

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
      return "info";
    case 1:
      return "success";
    case 2:
      return "error";
    default:
      return "default";
  }
};

const PackageTable = ({ packages }: PackageTableProps) => {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>番号</TableCell>
            <TableCell>パッケージ名</TableCell>
            <TableCell>コース</TableCell>
            <TableCell>最大定員</TableCell>
            <TableCell>出発予定</TableCell>
            <TableCell>状態</TableCell>
            <TableCell>管理</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {packages.map((pkg) => {
            const computedStatus = pkg.status;
            return (
              <TableRow key={pkg.packageId} hover>
                <TableCell>{pkg.packageId}</TableCell>
                <TableCell sx={{ color: "primary.main", cursor: "pointer" }}>
                  <Link
                    href={`/admin/packages/detail/${pkg.packageId}`}
                    passHref
                  >
                    {pkg.packageName}
                  </Link>
                </TableCell>
                <TableCell>{pkg.courseName}</TableCell>
                <TableCell>{pkg.totalSeats} 名</TableCell>
                <TableCell>
                  {pkg.departureDate
                    ? dayjs(pkg.departureDate).format("YYYY-MM-DD")
                    : "未定"}
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusText(computedStatus)}
                    color={getStatusColor(computedStatus) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <ButtonGroup size="small" className="mr-1">
                    <Link
                      href={`/admin/packages/detail/${pkg.packageId}`}
                      passHref
                    >
                      <Buttons
                        onPackageDetailClick={() =>
                          console.log(`Click Detail Package ${pkg.packageId}`)
                        }
                        isPackageDetailVisble={true}
                      />
                    </Link>
                  </ButtonGroup>
                  <ButtonGroup size="small">
                    <Link
                      href={`/admin/checkin/detail/${pkg.packageId}`}
                      passHref
                    >
                      <Buttons
                        onCheckInListClick={() =>
                          console.log(`Check-in for package ${pkg.packageId}`)
                        }
                        isCheckinListVisible={true}
                      />
                    </Link>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PackageTable;
