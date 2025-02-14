"use client";

import React, { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import Buttons from "@/components/Common/Buttons";

// 체크인 폼 데이터 타입
interface CheckInFormData {
  guestName: string;
  guestCount: number;
  guestPhone: string;
  guestEmail: string;
  specialRequests: string;
  packageDepature: string | null;
  packageId: string;
}

type CheckInFormProps = {
  onSubmit?: (data: CheckInFormData) => void;
};

// 패키지 데이터 타입
interface Package {
  packageId: number;
  packageName: string;
}

const CheckInForm: React.FC<CheckInFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<CheckInFormData>({
    guestName: "",
    guestCount: 1,
    guestPhone: "",
    guestEmail: "",
    specialRequests: "",
    packageDepature: null,
    packageId: "",
  });

  // 패키지 리스트 상태
  const [availablePackages, setAvailablePackages] = useState<Package[]>([]);

  // 출발일이 변경되면 해당 날짜의 패키지를 조회
  useEffect(() => {
    const fetchPackagesByDate = async () => {
      if (!formData.packageDepature) {
        setAvailablePackages([]);
        return;
      }
      try {
        const res = await fetch(
          `http://localhost:8080/api/packages/by-date?departure=${formData.packageDepature}`
        );
        if (!res.ok) {
          throw new Error("パッケージデータを取得できませんでした。");
        }
        const packages: Package[] = await res.json();
        setAvailablePackages(packages);
      } catch (error) {
        console.error("パッケージの取得エラー:", error);
      }
    };

    fetchPackagesByDate();
  }, [formData.packageDepature]);

  // 출발일 변경 핸들러
  const handleDateChange = (date: Dayjs | null) => {
    const formattedDate = date ? date.format("YYYY-MM-DD") : null;
    setFormData((prevState) => ({
      ...prevState,
      packageDepature: formattedDate,
      packageId: "",
    }));
  };

  // 텍스트 필드 변경 핸들러
  const handleTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 패키지 선택 핸들러
  const handlePackageChange = (e: SelectChangeEvent<string>) => {
    setFormData((prevState) => ({
      ...prevState,
      packageId: e.target.value,
    }));
  };

  // 제출 핸들러
  const submitForm = () => {
    if (!formData.packageId) {
      alert("パッケージを選択してください。");
      return;
    }
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6 border mb-20">
      <h2 className="text-xl font-semibold mb-4">チェックイン登録</h2>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* 出発予定日の選択 */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="出発予定"
            value={
              formData.packageDepature ? dayjs(formData.packageDepature) : null
            }
            onChange={handleDateChange}
            slotProps={{
              textField: { fullWidth: true, variant: "outlined" },
            }}
          />
        </LocalizationProvider>

        {/* パッケージ選択 */}
        <FormControl fullWidth>
          <InputLabel id="package-select-label">パッケージ選択</InputLabel>
          <Select
            labelId="package-select-label"
            name="packageId"
            value={formData.packageId || ""}
            onChange={handlePackageChange}
            label="パッケージ選択"
          >
            <MenuItem value="">
              <em>選択してください</em>
            </MenuItem>
            {availablePackages.map((pkg) => (
              <MenuItem key={pkg.packageId} value={String(pkg.packageId)}>
                {pkg.packageName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* 顧客基本情報 */}
        <h3 className="text-lg font-semibold">顧客基本情報</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            fullWidth
            label="顧客名"
            name="guestName"
            variant="outlined"
            value={formData.guestName}
            onChange={handleTextFieldChange}
          />
          <TextField
            fullWidth
            label="連絡先"
            name="guestPhone"
            variant="outlined"
            value={formData.guestPhone}
            onChange={handleTextFieldChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            fullWidth
            label="人数"
            name="guestCount"
            type="number"
            variant="outlined"
            value={formData.guestCount}
            onChange={handleTextFieldChange}
          />
          <TextField
            fullWidth
            label="メールアドレス"
            name="guestEmail"
            variant="outlined"
            value={formData.guestEmail}
            onChange={handleTextFieldChange}
          />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <TextField
            fullWidth
            label="特記事項"
            name="specialRequests"
            variant="outlined"
            multiline
            rows={4}
            value={formData.specialRequests}
            onChange={handleTextFieldChange}
          />
        </div>

        <Buttons
          isCreatePage={true}
          onCreateClick={submitForm}
          title="登録する"
        />
      </form>
    </div>
  );
};

export default CheckInForm;
