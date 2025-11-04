import React from "react";

export default function InstructionsBox() {
  return (
    <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
      <h3 className="font-semibold text-amber-800 mb-3">How to Use</h3>
      <ol className="text-sm text-amber-700 space-y-2">
        <li>1. Upload your PDF appointment letter template.</li>
        <li>2. Fill in the employee details.</li>
        <li>3. Click "Generate Appointment Letter".</li>
        <li>4. Download the filled PDF.</li>
      </ol>
      <p className="text-xs text-amber-600 mt-4">
        <strong>Note:</strong> The text coordinates may need adjustment depending on your PDF template.
      </p>
    </div>
  );
}
