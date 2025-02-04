"use client";

import React, { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField, Button, Typography } from "@mui/material";

type PackageFormProps = {
  initialData?: {
    packageName: string;
    maxPeople: string;
    assignedPerson: string;
    departureDate: Date | null;
    busDriver: string;
    busInfo1: string;
    busInfo2: string;
    tourDescription: string;
  };
};

const PackageForm: React.FC<PackageFormProps> = ({ initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      packageName: "",
      maxPeople: "",
      assignedPerson: "",
      departureDate: null,
      busDriver: "",
      busInfo1: "",
      busInfo2: "",
      tourDescription: "",
    }
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prevState) => ({
      ...prevState,
      departureDate: date,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <Typography variant="h5" className="text-center font-semibold mb-6">
        {initialData ? "パッケージ編集" : "新規登録"}
      </Typography>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            fullWidth
            label="パッケージ名"
            name="packageName"
            value={formData.packageName}
            onChange={handleChange}
            variant="outlined"
            className="bg-gray-50"
          />
          <TextField
            fullWidth
            label="担当者"
            name="assignedPerson"
            value={formData.assignedPerson}
            onChange={handleChange}
            variant="outlined"
            className="bg-gray-50"
          />
          <TextField
            fullWidth
            label="最大定員"
            name="maxPeople"
            type="number"
            value={formData.maxPeople}
            onChange={handleChange}
            variant="outlined"
            className="bg-gray-50"
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="出発予定"
              value={formData.departureDate}
              onChange={handleDateChange}
              slotProps={{
                textField: { fullWidth: true, variant: "outlined" },
              }}
            />
          </LocalizationProvider>
          <TextField
            fullWidth
            label="バス運転手"
            name="busDriver"
            value={formData.busDriver}
            onChange={handleChange}
            variant="outlined"
            className="bg-gray-50"
          />
          <TextField
            fullWidth
            label="バス情報1"
            name="busInfo1"
            value={formData.busInfo1}
            onChange={handleChange}
            variant="outlined"
            className="bg-gray-50"
          />
          <TextField
            fullWidth
            label="バス情報2"
            name="busInfo2"
            value={formData.busInfo2}
            onChange={handleChange}
            variant="outlined"
            className="bg-gray-50"
          />
        </div>

        <TextField
          fullWidth
          label="ツアー説明"
          name="tourDescription"
          value={formData.tourDescription}
          onChange={handleChange}
          multiline
          rows={4}
          variant="outlined"
          className="bg-gray-50"
        />

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
