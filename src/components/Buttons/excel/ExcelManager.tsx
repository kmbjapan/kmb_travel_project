"use client";

import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { deflate } from "zlib";

export default function ExcelManager() {
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/excel/download");
      if (!response.ok) {
        alert("download failed");
        return;
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "checkin_list.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("dwonload error:", error);
      alert("download error");
    } finally {
      setLoading(false);
    }
  };

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!uploadFile) {
      alert("fileを選択ください。");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", uploadFile);
      const response = await fetch("http://localhost:8080/api/excel/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Exel upload susscess");
      } else {
        alert("Exel upload failed");
      }
    } catch (error) {
      console.error("upload error:", error);
      alert("업로드 중 에러 발생");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: "16px 0" }}>
      <h2>Excel管理</h2>
      <div style={{ marginBottom: "16px" }}>
        <Button variant="contained" onClick={handleDownload} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Excel DownLoad"}
        </Button>
      </div>
      <div>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        <Button variant="contained" onClick={handleUpload} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Excel Upload"}
        </Button>
      </div>
    </div>
  );
}
