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
  Checkbox,
  Box,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckBox } from "@mui/icons-material";

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
      const newSelecteds = packages.map((pkg) => pkg.packageId);
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
      const response = await fetch(
        "http://localhost:8080/api/packages/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ packageIds: selected }),
        }
      );
      if (response.ok) {
        console.log("Delete Sucessed");
        alert("**パッケージ**を削除しました。");
        window.location.href = "/admin/packages";
      } else {
        // console.error("Delete Failed", response.status);
        const errorData = await response.json();
        alert(errorData.message || "パッケージで**顧客名簿**があります。");
      }
    } catch (error) {
      console.error("Delete Error", error);
      alert("削除のエラー");
    }
  };

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              {/* 2.CheckBox関連::全体クリックする */}
              <Checkbox
                checked={
                  packages.length > 0 && selected.length === packages.length
                }
                indeterminate={
                  selected.length > 0 && selected.length < packages.length
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
            <TableCell>NO</TableCell>
            <TableCell>パッケージ名</TableCell>
            <TableCell>コース</TableCell>
            <TableCell>最大定員</TableCell>
            <TableCell>出発予定</TableCell>
            <TableCell>状態</TableCell>
            <TableCell>管理</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {packages.map((pkg, index) => {
            const isItemSelected = selected.includes(pkg.packageId);
            const computedStatus = pkg.status;
            return (
              <TableRow key={pkg.packageId} hover>
                {/*  2.CheckBox関連:: 個別クリックする */}
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isItemSelected}
                    onChange={() => handleCheckboxClick(pkg.packageId)}
                    sx={{
                      color: "blue",
                      "&.Mui-checked": {
                        color: "blue",
                      },
                    }}
                  />
                </TableCell>
                {/*  フロントで番号を分ける */}
                {/* <TableCell>{pkg.packageId}</TableCell> */}
                <TableCell>{index + 1}</TableCell>
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
                      href={`/admin/checkin/packages/${pkg.packageId}`}
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
      <Buttons isDeleteVisible={true} onDeleteClick={handleDeleteSelected} />
    </TableContainer>
  );
};

export default PackageTable;
