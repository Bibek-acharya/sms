"use client";

import React, { useState } from "react";

const ReportGenerator = () => {
  const [reportType, setReportType] = useState("academic");
  const [dateRange, setDateRange] = useState("this-month");

  const reportTypes = [
    { id: "academic", label: "Academic Performance", icon: "🎓" },
    { id: "attendance", label: "Attendance Summary", icon: "📅" },
    { id: "finance", label: "Financial Overview", icon: "💰" },
    { id: "staff", label: "Staff Performance", icon: "👥" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-end items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <button className="bg-[#14B8A6] text-white px-6 py-2.5 rounded-lg font-bold shadow-lg shadow-teal-500/20 hover:bg-[#0D9488] transition-all flex items-center gap-2 w-full md:w-auto justify-center">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-gray-50 space-y-6">
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-1">
                Select Report Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                {reportTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setReportType(type.id)}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                      reportType === type.id
                        ? "bg-white border-[#14B8A6] shadow-sm text-[#14B8A6]"
                        : "bg-transparent border-gray-100 text-gray-500 hover:bg-white"
                    }`}
                  >
                    <span className="text-xl">{type.icon}</span>
                    <span className="text-sm font-bold text-left">
                      {type.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-1">
                Date Range
              </label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full bg-white border border-gray-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 transition-all text-gray-600"
              >
                <option value="today">Today</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
                <option value="this-quarter">This Quarter</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-100 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-700">
                Preview: {reportTypes.find((t) => t.id === reportType)?.label}
              </h3>
              <span className="px-3 py-1 rounded-full bg-teal-50 text-[#14B8A6] text-[10px] font-bold uppercase tracking-wider">
                Real-time Data
              </span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-[#F8FAFC] rounded-2xl flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-gray-300 animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-bold text-gray-700">Generating Preview...</p>
                <p className="text-xs text-gray-400 mt-1">
                  Fetching latest metrics from database
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-auto pt-6 border-t border-gray-50">
              {[
                { label: "Confidence", value: "99.8%" },
                { label: "Data Points", value: "1,240" },
                { label: "Last Sync", value: "2m ago" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-sm font-bold text-gray-700">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;
