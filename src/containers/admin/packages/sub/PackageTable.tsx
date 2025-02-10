"use client"; // 클라이언트 컴포넌트임을 명시

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

// PackageTable 컴포넌트가 받는 props 인터페이스
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
  // getStatusColor는 MUI Chip 컴포넌트의 color prop에 맞춰서 설정할 수 있도록
  // 여기서는 단순히 문자열을 반환하는데, 실제 프로젝트에서는 MUI의 색상 속성에 맞춰 조정해야 합니다.
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
            // departureDate에 따라 동적으로 상태를 계산합니다.
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
                <TableCell>{pkg.departureDate}</TableCell>
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
