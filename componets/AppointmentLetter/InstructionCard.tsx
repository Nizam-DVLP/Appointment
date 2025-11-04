"use client";
import React from "react";

const InstructionCard = () => (
  <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 mt-8 shadow-sm">
    <h3 className="font-semibold text-amber-800 mb-3 text-lg">How to Use:</h3>
    <ol className="text-sm text-amber-700 space-y-2 list-decimal ml-5">
      <li>Upload your PDF appointment letter template</li>
      <li>Fill in the employee details in the form</li>
      <li>Click “Generate” to fill the PDF</li>
      <li>Download the completed appointment letter</li>
    </ol>
    <p className="text-xs text-amber-600 mt-4">
      <strong>Note:</strong> You may need to adjust text positions in the code for your specific PDF.
    </p>
  </div>
);

export default InstructionCard;
