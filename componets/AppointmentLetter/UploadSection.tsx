"use client";
import React from "react";

interface UploadSectionProps {
  pdfFile: File | null;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const UploadSection: React.FC<UploadSectionProps> = ({ pdfFile, onUpload, fileInputRef }) => {
  return (
    <div className="mb-8 p-6 border-2 border-dashed border-indigo-300 rounded-2xl bg-indigo-50 shadow-sm">
      <h3 className="text-lg font-semibold text-indigo-800 mb-4">
        Step 1: Upload PDF Template
      </h3>
      <input type="file" ref={fileInputRef} accept=".pdf" onChange={onUpload} className="hidden" />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-md"
      >
        Select PDF Template
      </button>
      {pdfFile && (
        <p className="mt-3 text-sm text-indigo-700 font-medium">
          ✅ Selected: {pdfFile.name}
        </p>
      )}
    </div>
  );
};

export default UploadSection;
