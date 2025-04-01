"use client";

import React, { useState } from "react";

const CSVUploadButton = () => {
  const [fileName, setFileName] =
    useState<string>("ファイルを選択してください。");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  const handleUpload = async () => {
    const fileInput = document.getElementById(
      "csvFileInput"
    ) as HTMLInputElement;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("CSVファをイル選択してください!");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
      const response = await fetch("http://localhost:8080/api/csv/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("csv upload failed");
      }

      alert("CSVのupload成功!");
      setFileName("ファをイル選択してください");
    } catch (error) {
      console.error("CSV upload Error:", error);
      alert("CSV upload failed");
    }
  };

  return (
    <div className="flex gap-4 items-center">
      <input
        id="csvFileInput"
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="hidden"
      />

      <label
        htmlFor="csvFileInput"
        className="bg-gray-400 hover:bg-blue-300 text-white px-4 py-2 shadow cursor-pointer "
      >
        顧客データアップロード
      </label>
      <span>{fileName}</span>

      <button
        onClick={handleUpload}
        className="bg-gray-400 hover:bg-blue-300 text-white px-4 py-2 shadow "
      >
        登録
      </button>
    </div>
  );
};

export default CSVUploadButton;
