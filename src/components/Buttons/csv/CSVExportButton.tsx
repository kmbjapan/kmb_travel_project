"use client";

import React from "react";

const CSVExportButton: React.FC = () => {
  const handleDownloadCSV = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/csv/check-ins");
      if (!response.ok) throw new Error("CSV Download Failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "check_ins.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download Error:", error);
    }
  };

  return (
    <button
      onClick={handleDownloadCSV}
      className="bg-gray-400 hover:bg-blue-300 text-white px-4 py-2 shadow "
    >
      顧客データダウンロード
    </button>
  );
};

export default CSVExportButton;
