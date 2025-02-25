"use client";

import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import DriverTable from "./sub/DriverTable";

const theme = createTheme({
  palette: {
    primary: { main: "#3b82f6" }, // 테일윈드 blue-500
    secondary: { main: "#8b5cf6" }, // 테일윈드 purple-500
  },
});

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <DriverTable />
      </div>
    </ThemeProvider>
  );
};

export default Home;
