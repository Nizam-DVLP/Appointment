import React from "react";

export default function UploadSection({ fileInputRef, pdfFile, handleFileUpload }: any) {
  return (
    <div className="p-6 border-2 border-dashed border-blue-300 rounded-xl bg-blue-50">
      <h3 className="text-lg font-semibold text-blue-800 mb-4">Step 1: Upload PDF Template</h3>
      <input
        type="file"
        ref={fileInputRef}
        accept=".pdf"
        onChange={handleFileUpload}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition"
      >
        Select PDF Template
      </button>
      {pdfFile && <p className="mt-2 text-sm text-blue-700">✓ Selected: {pdfFile.name}</p>}
    </div>
  );
}
