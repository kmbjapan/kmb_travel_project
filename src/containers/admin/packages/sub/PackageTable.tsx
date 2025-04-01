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
  Button,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PackageData } from "@/data/package/package";
import { deleteSelectedPackages } from "@/services/packagesService";
import { Delete } from "@mui/icons-material";

// インターフェース定義
interface PackageTableProps {
  packages: PackageData[];
}

// ステータスのテキスト取得関数
const getStatusText = (status: number): string => {
  switch (status) {
    case 0:
      return "出発前";
    case 1:
      return "出発";
    case 2:
      return "完了";
    default:
      return "不明";
  }
};

// ステータスの色取得関数
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

const PackageTable: React.FC<PackageTableProps> = ({ packages }) => {
  const [selected, setSelected] = useState<number[]>([]);

  // 個別チェックボックスのクリックハンドラー
  const handleCheckboxClick = (packageId: number) => {
    setSelected((prevSelected) =>
      prevSelected.includes(packageId)
        ? prevSelected.filter((id) => id !== packageId)
        : [...prevSelected, packageId]
    );
  };

  // 全体選択チェックボックスのクリックハンドラー
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = packages.map((pkg) => pkg.packageId);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  // 選択されたパッケージを削除
  const handleDeleteSelected = async () => {
    if (selected.length === 0) {
      alert("削除するパッケージを選択してください。");
      return;
    }

    const success = await deleteSelectedPackages(selected);
    if (success) {
      alert("パッケージを削除しました。");
      window.location.href = "/admin/packages";
    }
  };

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                checked={
                  packages.length > 0 && selected.length === packages.length
                }
                indeterminate={
                  selected.length > 0 && selected.length < packages.length
                }
                onChange={handleSelectAllClick}
                sx={{ color: "blue", "&.Mui-checked": { color: "blue" } }}
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
            return (
              <TableRow key={pkg.packageId} hover>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isItemSelected}
                    onChange={() => handleCheckboxClick(pkg.packageId)}
                    sx={{ color: "blue", "&.Mui-checked": { color: "blue" } }}
                  />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
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
                    label={getStatusText(pkg.status)}
                    color={getStatusColor(pkg.status) as any}
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
      {/* <Buttons isDeleteVisible={true} onDeleteClick={handleDeleteSelected} /> */}
      <Button
        variant="outlined"
        onClick={handleDeleteSelected}
        color="error"
        startIcon={<Delete />}
      >
        削除
      </Button>
    </TableContainer>
  );
};

export default PackageTable;
