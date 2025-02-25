"use client";

import React, { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ReferenceData } from "@/data/package/package";
import { getReferenceData } from "@/services/packagesService";

import {
  TextField,
  Button,
  Typography,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

type PackageFormProps = {
  initialData?: {
    packageName: string;
    totalSeats: string;
    departureDate: string | null;
    busNumber1: string;
    busNumber2: string;
    driverId?: string | number;
    courseId?: string | number;
    staffId?: string | number;
    status: number;
  };
  onSubmit?: (data: any) => void;
};

const PackageForm: React.FC<PackageFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState(
    initialData || {
      packageName: "",
      totalSeats: "",
      departureDate: null,
      busNumber1: "",
      busNumber2: "",
      driverId: "",
      courseId: "",
      staffId: "",
      status: 0,
    }
  );

  const [referenceData, setReferenceData] = useState<ReferenceData>({
    drivers: [],
    staffs: [],
    courses: [],
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // TODO::packageService.tsに共同化
  useEffect(() => {
    const fetchReferenceData = async () => {
      try {
        const data = await getReferenceData();
        setReferenceData(data);
      } catch (error) {
        console.error("参照データ取得エラー:", error);
      }
    };
    fetchReferenceData();
  }, []);

  if (
    referenceData.courses.length === 0 ||
    referenceData.drivers.length === 0 ||
    referenceData.staffs.length === 0
  ) {
    return <p>データを呼び出す中</p>;
  }

  // Selectを変更するやつ
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value ? Number(value) : "",
    }));
  };

  // TextFieldを変更するやつ
  const handleTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Dayjs | null) => {
    setFormData((prevState) => ({
      ...prevState,
      departureDate: date ? date.format("YYYY-MM-DD") : null,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.driverId) {
      alert("ドライバーを選択してください。");
      return;
    }
    if (!formData.courseId) {
      alert("コースを選択してください。");
      return;
    }
    if (!formData.staffId) {
      alert("担当者を選択してください。");
      return;
    }
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <Typography variant="h5" className="text-center font-semibold mb-6">
        {initialData ? "パッケージ編集" : "新規登録"}
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* パッケージの名 */}
          <TextField
            fullWidth
            label="パッケージ名"
            name="packageName"
            value={formData.packageName}
            onChange={handleTextFieldChange}
            variant="outlined"
            className="bg-gray-50"
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel id="status-select-label">状態</InputLabel>
            <Select
              labelId="status-select-label"
              label="状態"
              name="status"
              value={String(formData.status)}
              onChange={handleSelectChange}
            >
              <MenuItem value="0">出発前</MenuItem>
              <MenuItem value="1">出発</MenuItem>
              <MenuItem value="2">完了</MenuItem>
            </Select>
          </FormControl>
          {/* コースの選択 */}
          <FormControl fullWidth variant="outlined" className="bg-gray-50">
            <InputLabel id="course-select-label">コース</InputLabel>
            <Select
              labelId="course-select-label"
              label="コース"
              name="courseId"
              value={formData.courseId !== "" ? String(formData.courseId) : ""}
              onChange={handleSelectChange}
            >
              <MenuItem value="">
                <em>選択してください</em>
              </MenuItem>
              {referenceData.courses.map((course) => (
                <MenuItem key={course.courseId} value={course.courseId}>
                  {course.courseName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* ドライバー選択 */}
          <FormControl fullWidth variant="outlined" className="bg-gray-50">
            <InputLabel id="driver-select-label">ドライバー</InputLabel>
            <Select
              labelId="driver-select-label"
              label="ドライバー"
              name="driverId"
              value={formData.driverId !== "" ? String(formData.driverId) : ""}
              onChange={handleSelectChange}
            >
              <MenuItem value="">
                <em>選択してください</em>
              </MenuItem>
              {referenceData.drivers.map((driver) => (
                <MenuItem key={driver.driverId} value={driver.driverId}>
                  {driver.driverName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* スタッフ選択 */}
          <FormControl fullWidth variant="outlined" className="bg-gray-50">
            <InputLabel id="staff-select-label">担当者</InputLabel>
            <Select
              labelId="staff-select-label"
              label="担当者"
              name="staffId"
              value={formData.staffId !== "" ? String(formData.staffId) : ""}
              onChange={handleSelectChange}
            >
              <MenuItem value="">
                <em>選択してください</em>
              </MenuItem>
              {referenceData.staffs.map((staff) => (
                <MenuItem key={staff.staffId} value={staff.staffId}>
                  {staff.staffName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* 最大定員 */}
          <TextField
            fullWidth
            label="最大定員"
            name="totalSeats"
            type="number"
            value={formData.totalSeats}
            onChange={handleTextFieldChange}
            variant="outlined"
            className="bg-gray-50"
          />
          {/* 出発予定の日 */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="出発予定"
              value={
                formData.departureDate ? dayjs(formData.departureDate) : null
              }
              onChange={handleDateChange}
              slotProps={{
                textField: { fullWidth: true, variant: "outlined" },
              }}
            />
          </LocalizationProvider>
          {/* バス情報1 */}
          <TextField
            fullWidth
            label="バス情報1"
            name="busNumber1"
            value={formData.busNumber1}
            onChange={handleTextFieldChange}
            variant="outlined"
            className="bg-gray-50"
          />
          {/* バス情報2 */}
          <TextField
            fullWidth
            label="バス情報2"
            name="busNumber2"
            value={formData.busNumber2}
            onChange={handleTextFieldChange}
            variant="outlined"
            className="bg-gray-50"
          />
        </div>
        <div className="flex justify-center mt-4">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            {initialData ? "更新する" : "登録する"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PackageForm;
