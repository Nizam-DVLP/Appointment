"use client";
import React from "react";

interface EmployeeFormProps {
  data: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ data, handleChange }) => {
  // Input: Total Monthly Salary
  const totalSalary = Number(data.totalSalary || 0);

  // 🧮 Salary Calculations
  const basic = totalSalary * 0.5; // 50% Basic Pay
  const hra = basic * 0.5; // 40% of Basic
  const conveyance = 1600; // Fixed
  const special = totalSalary - (basic + hra + conveyance); // Remaining amount

  // Totals
  const totalMonthly = basic + hra + conveyance + special;
  const totalAnnual = totalMonthly * 12;

  return (
    <div className="mb-8 bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-3xl p-8 border border-blue-100 w-full overflow-y-auto">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-2">
          Step 2: Fill Employee Details
        </h3>
        <p className="text-gray-500 text-sm">Complete the information below to generate the offer letter</p>
      </div>

      {/* Employee Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Left */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <span className="text-indigo-600 text-xl">👤</span>
            </div>
            <h4 className="font-semibold text-gray-800 text-lg">
              Personal Information
            </h4>
          </div>
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700 mb-2 block">
                Full Name <span className="text-red-500">*</span>
              </span>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all hover:border-gray-300 bg-gray-50 focus:bg-white"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700 mb-2 block">
               Date of Joining  <span className="text-red-500">*</span>
              </span>
              <input
                type="date"
                name="date"
                value={data.date}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all hover:border-gray-300 bg-gray-50 focus:bg-white"
                required
              />
            </label>
          </div>
        </div>

        {/* Right */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <span className="text-emerald-600 text-xl">💼</span>
            </div>
            <h4 className="font-semibold text-gray-800 text-lg">
              Job Information
            </h4>
          </div>
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700 mb-2 block">
                Position <span className="text-red-500">*</span>
              </span>
              <input
                type="text"
                name="position"
                value={data.position}
                onChange={handleChange}
                placeholder="e.g., Business Development Associate"
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all hover:border-gray-300 bg-gray-50 focus:bg-white"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700 mb-2 block">
                Allocated Date <span className="text-red-500">*</span>
              </span>
              <input
                type="date"
                name="joiningDate"
                value={data.joiningDate}
                onChange={handleChange}
                placeholder="Select joining date"
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all hover:border-gray-300 bg-gray-50 focus:bg-white"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700 mb-2 block">
                Probation Period (in months)
              </span>
              <input
                type="text"
                name="probationMonths"
                value={data.probationMonths}
                onChange={handleChange}
                placeholder="e.g., 3–6 months"
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all hover:border-gray-300 bg-gray-50 focus:bg-white"
              />
            </label>
          </div>
        </div>
      </div>

      {/* 💰 Salary Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
            <span className="text-amber-600 text-xl">💰</span>
          </div>
          <h4 className="font-semibold text-gray-800 text-lg">
            Salary Details
          </h4>
        </div>

        {/* Input for total salary */}
        <div className="mb-6 bg-gradient-to-r from-indigo-50 to-blue-50 p-5 rounded-xl border border-indigo-100">
          <label className="block">
            <span className="text-sm font-medium text-gray-700 mb-2 block">
              Enter Total Monthly Salary (₹)
            </span>
            <input
              type="number"
              name="totalSalary"
              value={data.totalSalary}
              onChange={handleChange}
              placeholder="Enter total monthly salary"
              className="w-full md:w-80 p-3 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-lg font-semibold text-gray-800 bg-white"
            />
          </label>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-gray-700 bg-white">
            <thead className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
              <tr>
                <th className="border-b border-indigo-400 p-4 text-left font-semibold">Components</th>
                <th className="border-b border-indigo-400 p-4 text-center font-semibold">Monthly (₹)</th>
                <th className="border-b border-indigo-400 p-4 text-center font-semibold">Annual (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-indigo-50">
                <td className="border-b border-gray-200 p-4 font-bold text-indigo-900">Fixed Pay</td>
                <td className="border-b border-gray-200" colSpan={2}></td>
              </tr>

              <tr className="hover:bg-gray-50 transition-colors">
                <td className="border-b border-gray-200 p-4 pl-8">Basic Pay (50%)</td>
                <td className="border-b border-gray-200 p-4 text-center font-medium">{basic.toFixed(2)}</td>
                <td className="border-b border-gray-200 p-4 text-center font-medium">{(basic * 12).toFixed(2)}</td>
              </tr>

              <tr className="hover:bg-gray-50 transition-colors">
                <td className="border-b border-gray-200 p-4 pl-8">HRA (40% of Basic)</td>
                <td className="border-b border-gray-200 p-4 text-center font-medium">{hra.toFixed(2)}</td>
                <td className="border-b border-gray-200 p-4 text-center font-medium">{(hra * 12).toFixed(2)}</td>
              </tr>

              <tr className="hover:bg-gray-50 transition-colors">
                <td className="border-b border-gray-200 p-4 pl-8">Conveyance Allowance</td>
                <td className="border-b border-gray-200 p-4 text-center font-medium">{conveyance.toFixed(2)}</td>
                <td className="border-b border-gray-200 p-4 text-center font-medium">{(conveyance * 12).toFixed(2)}</td>
              </tr>

              <tr className="hover:bg-gray-50 transition-colors">
                <td className="border-b border-gray-200 p-4 pl-8">Special Allowance</td>
                <td className="border-b border-gray-200 p-4 text-center font-medium">{special.toFixed(2)}</td>
                <td className="border-b border-gray-200 p-4 text-center font-medium">{(special * 12).toFixed(2)}</td>
              </tr>

              <tr className="bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold">
                <td className="p-4">Total</td>
                <td className="p-4 text-center text-lg">₹ {totalMonthly.toFixed(2)}</td>
                <td className="p-4 text-center text-lg">₹ {totalAnnual.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;