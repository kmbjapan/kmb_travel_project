"use client";

import React from "react";
import CSVExportButton from "@/components/Buttons/csv/CSVExportButton";
import CSVUploadButton from "@/components/Buttons/csv/CSVUploadButton";

interface CSVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CSVModal: React.FC<CSVModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[580px]">
        <h2 className="text-xl font-semibold mb-4">CSV管理</h2>
        <p className="text-gray-600 mb-4">
          CSVのダウンロードまたはアップロードを行います。
        </p>

        <div className="mb-4">
          <CSVExportButton />
        </div>

        <div className="mb-4">
          <CSVUploadButton />
        </div>

        <div className="text-right">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow"
            onClick={onClose}
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default CSVModal;
