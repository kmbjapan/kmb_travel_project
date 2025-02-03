"use client";
// React
import React, { useState, useEffect } from "react";

//Next.js
import { useRouter } from "next/router";

//MUI
import {
  Box,
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

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
  // onSubmit: (data: any) => void;
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
    // onSubmit(formData);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          {initialData ? "パッケージ編集" : "新規登録"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="パッケージ名"
                name="packageName"
                value={formData.packageName}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="担当者"
                name="assignedPerson"
                value={formData.assignedPerson}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="最大定員"
                name="maxPeople"
                type="number"
                value={formData.maxPeople}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="バス運転手"
                name="busDriver"
                value={formData.busDriver}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="バス情報1"
                    name="busInfo1"
                    value={formData.busInfo1}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="バス情報2"
                    name="busInfo2"
                    value={formData.busInfo2}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="ツアー説明"
                name="tourDescription"
                value={formData.tourDescription}
                onChange={handleChange}
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              onClick={console.log}
            >
              {initialData ? "更新する" : "登録する"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default PackageForm;
