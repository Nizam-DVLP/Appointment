"use client";
import React from "react";

interface ActionButtonsProps {
  onGenerate: () => void;
  onDownload: () => void;
  onReset: () => void;
  isProcessing: boolean;
  hasPdf: boolean;
  canDownload: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onGenerate,
  onDownload,
  onReset,
  isProcessing,
  hasPdf,
  canDownload,
}) => {
  return (
    <div className="flex gap-4 justify-center pt-6">
      <button
        onClick={onGenerate}
        disabled={!hasPdf || isProcessing}
        className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-medium transition-all shadow-md"
      >
        {isProcessing ? "Generating..." : "Generate Letter"}
      </button>

      {canDownload && (
        <button
          onClick={onDownload}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-medium transition-all shadow-md"
        >
          Download PDF
        </button>
      )}

      <button
        onClick={onReset}
        className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-medium transition-all shadow-md"
      >
        Reset
      </button>
    </div>
  );
};

export default ActionButtons;
