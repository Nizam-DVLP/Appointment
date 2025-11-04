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
    <div className="mb-8 bg-white shadow-md rounded-2xl p-8 border border-gray-200 w-full overflow-y-auto">
      <h3 className="text-2xl font-semibold text-black mb-6 text-center">
        Step 2: Fill Employee Details
      </h3>

      {/* Employee Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Left */}
        <div className="space-y-4">
          <h4 className="font-semibold text-black border-b pb-2">
            Personal Information
          </h4>

          <label className="block text-sm text-black mb-1">
            Full Name *
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter full name "
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </label>

          <label className="block text-sm text-gray-600 mb-1">
            Date *
            <input
              type="date"
              name="date"
              value={data.date}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </label>
          <label className="block text-sm text-gray-600 mb-1">
            Salary
            <input
              type="text"
              name="salary"
              value={data.salary}
              onChange={handleChange}
              placeholder=""
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </label>
        </div>

        {/* Right */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-700 border-b pb-2">
            Job Information
          </h4>

          <label className="block text-sm text-gray-600 mb-1">
            Position *
            <input
              type="text"
              name="position"
              value={data.position}
              onChange={handleChange}
              placeholder="e.g., Business Development Associate"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </label>

          <label className="block text-sm text-gray-600 mb-1">
            Joining Date *
            <input
              type="date"
              name="joiningDate"
              value={data.joiningDate}
              onChange={handleChange}
              placeholder="Select joining date"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </label>

          <label className="block text-sm text-gray-600 mb-1">
            Probation Period (in months)
            <input
              type="text"
              name="probationMonths"
              value={data.probationMonths}
              onChange={handleChange}
              placeholder="e.g., 3–6 months"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </label>
          
        </div>
      </div>

      {/* 💰 Salary Section */}
      <div className="mt-2">
        <h4 className="font-semibold text-gray-700 border-b pb-2 mb-4">
          Salary Details (Enter by HR)
        </h4>

        {/* Input for total salary */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1 font-medium">
            Enter Total Monthly Salary (₹)
          </label>
          <input
            type="number"
            name="totalSalary"
            value={data.totalSalary}
            onChange={handleChange}
            placeholder="Enter total monthly salary"
            className="w-60 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm text-gray-700 bg-white">
            <thead className="bg-blue-100 text-gray-800">
              <tr>
                <th className="border p-3 text-left">Components</th>
                <th className="border p-3 text-center">Monthly (₹)</th>
                <th className="border p-3 text-center">Annual (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-blue-50 font-semibold">
                <td className="border p-3">Fixed Pay</td>
                <td colSpan={2}></td>
              </tr>

              <tr>
                <td className="border p-3">Basic Pay (50%)</td>
                <td className="border p-3 text-center">{basic.toFixed(2)}</td>
                <td className="border p-3 text-center">{(basic * 12).toFixed(2)}</td>
              </tr>

              <tr>
                <td className="border p-3">HRA (40% of Basic)</td>
                <td className="border p-3 text-center">{hra.toFixed(2)}</td>
                <td className="border p-3 text-center">{(hra * 12).toFixed(2)}</td>
              </tr>

              <tr>
                <td className="border p-3">Conveyance Allowance</td>
                <td className="border p-3 text-center">{conveyance.toFixed(2)}</td>
                <td className="border p-3 text-center">{(conveyance * 12).toFixed(2)}</td>
              </tr>

              <tr>
                <td className="border p-3">Special Allowance</td>
                <td className="border p-3 text-center">{special.toFixed(2)}</td>
                <td className="border p-3 text-center">{(special * 12).toFixed(2)}</td>
              </tr>

              <tr className="bg-blue-50 font-semibold">
                <td className="border p-3">Total</td>
                <td className="border p-3 text-center">{totalMonthly.toFixed(2)}</td>
                <td className="border p-3 text-center">{totalAnnual.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
