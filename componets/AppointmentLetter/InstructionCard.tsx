"use client";
import React from "react";

const InstructionCard = () => (
  <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 p-8 rounded-3xl border-2 border-amber-200 mt-8 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden">
    {/* Decorative background pattern */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
    <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-100 rounded-full -ml-12 -mb-12 opacity-50"></div>
    
    <div className="relative z-10">
      {/* Header with icon */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
          <span className="text-2xl">📋</span>
        </div>
        <h3 className="font-bold text-amber-900 text-2xl">How to Use</h3>
      </div>

      {/* Steps */}
      <ol className="space-y-4 mb-6">
        <li className="flex items-start gap-3 group">
          <div className="w-8 h-8 bg-amber-500 text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
            1
          </div>
          <p className="text-amber-800 font-medium pt-1">
            Upload your appointment letter PDF template
          </p>
        </li>
        
        <li className="flex items-start gap-3 group">
          <div className="w-8 h-8 bg-amber-500 text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
            2
          </div>
          <p className="text-amber-800 font-medium pt-1">
            Fill in the employee details in the form below
          </p>
        </li>
        
        <li className="flex items-start gap-3 group">
          <div className="w-8 h-8 bg-amber-500 text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
            3
          </div>
          <p className="text-amber-800 font-medium pt-1">
            Click "Generate" to automatically fill the PDF
          </p>
        </li>
        
        <li className="flex items-start gap-3 group">
          <div className="w-8 h-8 bg-amber-500 text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
            4
          </div>
          <p className="text-amber-800 font-medium pt-1">
            Download the completed appointment letter
          </p>
        </li>
      </ol>

      {/* Note section */}
      <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-amber-200 shadow-sm">
        <div className="flex items-start gap-2">
          <span className="text-xl">💡</span>
          <div>
            <p className="text-sm font-semibold text-amber-900 mb-1">Pro Tip:</p>
            <p className="text-sm text-amber-700">
              You may need to adjust text positions in the code for your specific PDF template to ensure perfect alignment.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default InstructionCard;