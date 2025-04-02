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
import { fetchPackagesByDate } from "@/services/packagesService";

// チェックインフォームのデータ型
export interface CheckInFormData {
  guestName: string;
  guestCount: number;
  guestPhone: string;
  guestEmail: string;
  specialRequests: string;
  packageDepature: string | null;
  packageId: string;
}

// パッケージデータ型
interface Package {
  packageId: number;
  packageName: string;
}

// チェックインフォームコンポーネントのプロパティ型
interface CheckInFormProps {
  // 編集時は初期データを渡す（新規登録の場合はundefined）
  initialData?: CheckInFormData;
  onSubmit: (data: CheckInFormData) => void;
}

const CheckInForm: React.FC<CheckInFormProps> = ({ initialData, onSubmit }) => {
  // 初期データが存在すればその値を、なければデフォルト値を設定
  const [formData, setFormData] = useState<CheckInFormData>(
    initialData || {
      guestName: "",
      guestCount: 1,
      guestPhone: "",
      guestEmail: "",
      specialRequests: "",
      packageDepature: null,
      packageId: "",
    }
  );

  // 利用可能なパッケージのリスト状態
  const [availablePackages, setAvailablePackages] = useState<Package[]>([]);

  // 出発予定日が変更されたら、その日付に対応するパッケージを取得する
  useEffect(() => {
    const fetchPackages = async () => {
      if (!formData.packageDepature) {
        setAvailablePackages([]);
        return;
      }
      const packages = await fetchPackagesByDate(formData.packageDepature);
      setAvailablePackages(packages);
    };

    fetchPackages();
  }, [formData.packageDepature]);

  // 日付変更ハンドラ
  const handleDateChange = (date: Dayjs | null) => {
    const formattedDate = date ? date.format("YYYY-MM-DD") : null;
    setFormData((prevState) => ({
      ...prevState,
      packageDepature: formattedDate,
      packageId: "", // 日付変更時はパッケージ選択をリセット
    }));
  };

  // テキストフィールド変更ハンドラ
  const handleTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // パッケージ選択変更ハンドラ
  const handlePackageChange = (e: SelectChangeEvent<string>) => {
    setFormData((prevState) => ({
      ...prevState,
      packageId: e.target.value,
    }));
  };

  // フォーム送信ハンドラ
  const submitForm = () => {
    if (!formData.packageId) {
      alert("パッケージを選択してください。");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6 border mb-20">
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? "チェックイン編集" : "チェックイン登録"}
      </h2>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* 出発予定日 - 既に選択されている場合は読み取り専用 */}
        {initialData?.packageDepature ? (
          <TextField
            fullWidth
            label="出発予定日"
            value={initialData.packageDepature}
            variant="outlined"
            InputProps={{ readOnly: true }}
          />
        ) : (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="出発予定日"
              value={
                formData.packageDepature
                  ? dayjs(formData.packageDepature)
                  : null
              }
              onChange={handleDateChange}
              slotProps={{
                textField: { fullWidth: true, variant: "outlined" },
              }}
            />
          </LocalizationProvider>
        )}

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

        {/* 顧客情報入力 */}
        <h3 className="text-lg font-semibold">顧客情報</h3>
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
            label="電話番号"
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

        {initialData ? (
          <Buttons
            isEditPage={true}
            onEditClick={submitForm}
            title="更新する"
          />
        ) : (
          <Buttons
            isCreatePage={true}
            onCreateClick={submitForm}
            title="登録する"
          />
        )}
      </form>
    </div>
  );
};

export default CheckInForm;
