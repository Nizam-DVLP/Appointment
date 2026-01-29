"use client";
import React from "react";

interface UploadSectionProps {
  pdfReady: boolean;
}

const UploadSection: React.FC<UploadSectionProps> = ({ pdfReady }) => {
  return (
    <div className="mb-8 p-6 border-2 border-dashed border-indigo-300 rounded-2xl bg-indigo-50 shadow-sm">
      <h3 className="text-lg font-semibold text-indigo-800 mb-4">
        Step 1: Appointment Letter Template
      </h3>

      {pdfReady ? (
        <p className="text-sm text-green-700 font-medium">
          ✅ Template loaded from backend
        </p>
      ) : (
        <p className="text-sm text-orange-600">
          Loading template...
        </p>
      )}
    </div>
  );
};

export default UploadSection;
