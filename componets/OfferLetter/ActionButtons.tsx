import React from "react";

export default function ActionButtons({ isProcessing, pdfFile, editedPdfUrl, onSubmit, onDownload, onReset }: any) {
  return (
    <div className="flex flex-wrap justify-center gap-4 pt-6">
      <button
        type="button"
        onClick={onSubmit}
        disabled={!pdfFile || isProcessing}
        className="bg-blue-500 text-white px-8 py-3 rounded-lg transition"
      >
        {isProcessing ? "Generating..." : "Generate  Letter"}
      </button>

      {editedPdfUrl && (
        <button
          type="button"
          onClick={onDownload}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition"
        >
          Download PDF
        </button>
      )}

      <button
        type="button"
        onClick={onReset}
        className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg transition"
      >
        Reset
      </button>
    </div>
  );
}
