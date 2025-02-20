"use client";

import React from "react";
import CSVExportButton from "@/components/Common/CSVExportButton";
import CSVUploadButton from "@/components/Common/CSVUploadButton";

interface CSVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CSVModal: React.FC<CSVModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // 모달이 닫혀 있으면 아무것도 렌더링하지 않음

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[580px]">
        <h2 className="text-xl font-semibold mb-4">CSV管理</h2>
        <p className="text-gray-600 mb-4">
          CSVのダウンロードまたはアップロードを行います。
        </p>

        {/* CSV 다운로드 버튼 */}
        <div className="mb-4">
          <CSVExportButton />
        </div>

        {/* CSV 업로드 버튼 */}
        <div className="mb-4">
          <CSVUploadButton />
        </div>

        {/* 닫기 버튼 */}
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
