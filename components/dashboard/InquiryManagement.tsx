"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface FrontDeskRecord {
  id: string;
  type: "Inquiry" | "Visitor" | "Call" | "Document" | "Lost & Found";
  name: string;
  phone: string;
  purpose: string;
  assignedStaff: string;
  date: string;
  time: string;
  status: "New" | "In Progress" | "Assigned" | "Resolved" | "Closed";
  priority?: "High" | "Normal" | "Low";
}

const mockRecords: FrontDeskRecord[] = [
  {
    id: "FD-1001",
    type: "Inquiry",
    name: "Mark Thompson",
    phone: "+1 234 567 890",
    purpose: "Admission for Grade 12",
    assignedStaff: "Ms. Sarah (Admission)",
    date: "2026-02-10",
    time: "09:30 AM",
    status: "New",
    priority: "High",
  },
  {
    id: "FD-1002",
    type: "Visitor",
    name: "James Wilson",
    phone: "+1 234 567 891",
    purpose: "Maintenance Inspection",
    assignedStaff: "Mr. Miller (Admin)",
    date: "2026-02-10",
    time: "10:15 AM",
    status: "In Progress",
  },
  {
    id: "FD-1003",
    type: "Call",
    name: "Linda Garcia",
    phone: "+1 234 567 892",
    purpose: "Inquiry about fee structure",
    assignedStaff: "Reception Desk",
    date: "2026-02-10",
    time: "11:00 AM",
    status: "Resolved",
  },
  {
    id: "FD-1004",
    type: "Document",
    name: "David Brown",
    phone: "+1 234 567 893",
    purpose: "Transfer Certificate Request",
    assignedStaff: "Mr. Wilson (Office)",
    date: "2026-02-09",
    time: "02:45 PM",
    status: "Assigned",
    priority: "Normal",
  },
  {
    id: "FD-1005",
    type: "Lost & Found",
    name: "Emily White",
    phone: "+1 234 567 894",
    purpose: "Found a blue uniform blazer",
    assignedStaff: "Lost & Found Dept",
    date: "2026-02-09",
    time: "12:30 PM",
    status: "New",
  },
];

const InquiryManagement = () => {
  const router = useRouter();
  const [filterType, setFilterType] = useState("All");

  const getBadgeStyles = (type: FrontDeskRecord["type"]) => {
    switch (type) {
      case "Inquiry":
        return "bg-blue-50 text-blue-600";
      case "Visitor":
        return "bg-purple-50 text-purple-600";
      case "Call":
        return "bg-indigo-50 text-indigo-600";
      case "Document":
        return "bg-amber-50 text-amber-600";
      case "Lost & Found":
        return "bg-red-50 text-red-600";
      default:
        return "bg-gray-50 text-gray-500";
    }
  };

  const getStatusStyles = (status: FrontDeskRecord["status"]) => {
    switch (status) {
      case "New":
        return "bg-gray-100 text-gray-600";
      case "In Progress":
        return "bg-blue-50 text-blue-600";
      case "Assigned":
        return "bg-purple-50 text-purple-600";
      case "Resolved":
        return "bg-teal-50 text-teal-600";
      case "Closed":
        return "bg-gray-900/10 text-gray-900";
      default:
        return "bg-gray-50 text-gray-400";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">
            Inquiries & Front Desk
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            Manage walk-ins, calls, and visitor tracking
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-2xl border border-gray-100">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
              Today
            </span>
            <span className="text-sm font-bold text-gray-700 pr-2">
              Feb 10, 2026
            </span>
          </div>
          <button 
            onClick={() => router.push("/dashboard/inquiry/new")}
            className="bg-[#14B8A6] text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-teal-500/20 hover:bg-[#0D9488] transition-all flex items-center gap-2"
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Entry
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          {
            label: "New Inquiries",
            count: 12,
            color: "text-blue-500",
            bg: "bg-blue-50",
          },
          {
            label: "Visitors Today",
            count: 24,
            color: "text-purple-500",
            bg: "bg-purple-50",
          },
          {
            label: "Follow-ups",
            count: 8,
            color: "text-amber-500",
            bg: "bg-amber-50",
          },
          {
            label: "Pending Docs",
            count: 5,
            color: "text-indigo-500",
            bg: "bg-indigo-50",
          },
          {
            label: "L&F Cases",
            count: 3,
            color: "text-red-500",
            bg: "bg-red-50",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
              {stat.label}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black text-gray-800">
                {stat.count}
              </span>
              <div
                className={
                  "w-8 h-8 rounded-xl " +
                  stat.bg +
                  " " +
                  stat.color +
                  " flex items-center justify-center"
                }
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Admission Pipeline Funnel Preview */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">
              Admission Pipeline Overview
            </h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase">
              Real-time status of all recruitment stages
            </p>
          </div>
          <button
            onClick={() => router.push("/dashboard/admission")}
            className="text-xs font-black text-teal-600 uppercase hover:underline"
          >
            View CRM
          </button>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-2">
          {[
            { stage: "Lead", count: 145, color: "bg-gray-100 text-gray-600" },
            {
              stage: "Interview",
              count: 82,
              color: "bg-blue-100 text-blue-600",
            },
            {
              stage: "Exam",
              count: 54,
              color: "bg-purple-100 text-purple-600",
            },
            { stage: "Offer", count: 21, color: "bg-amber-100 text-amber-600" },
            {
              stage: "Enrolled",
              count: 12,
              color: "bg-teal-100 text-teal-600",
            },
          ].map((step, idx) => (
            <React.Fragment key={step.stage}>
              <div className="flex-1 min-w-25 p-4 rounded-2xl bg-gray-50/50 border border-gray-100 flex flex-col items-center text-center">
                <span
                  className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase mb-1 ${step.color}`}
                >
                  {step.stage}
                </span>
                <span className="text-xl font-black text-gray-800">
                  {step.count}
                </span>
              </div>
              {idx < 4 && (
                <div className="hidden lg:block text-gray-200">
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="flex flex-wrap gap-2">
        {["Inquiry", "Visitor", "Call", "Document", "Lost & Found"].map(
          (type) => (
            <button
              key={type}
              className="flex-1 min-w-35 bg-white border border-gray-100 p-5 rounded-3xl shadow-sm hover:border-[#14B8A6]/30 hover:shadow-md transition-all text-left group"
            >
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-[#14B8A6] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">
                Quick Add
              </p>
              <p className="text-sm font-black text-gray-800">{type}</p>
            </button>
          ),
        )}
      </div>

      {/* List Filters */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search by name, phone or reference ID..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#14B8A6]/20 transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
          {[
            "All",
            "Inquiry",
            "Visitor",
            "Call",
            "Document",
            "Lost & Found",
          ].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={
                "px-6 py-3 rounded-2xl text-sm font-black transition-all whitespace-nowrap " +
                (filterType === type
                  ? "bg-gray-800 text-white shadow-lg shadow-gray-200"
                  : "bg-gray-50 text-gray-400 hover:bg-gray-100")
              }
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Unified Record List */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Type
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Name / Contact
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Purpose / Category
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                  Assigned Dept
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                  Status
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                  Date & Time
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {mockRecords
                .filter((r) => filterType === "All" || r.type === filterType)
                .map((record) => (
                  <tr
                    key={record.id}
                    className="hover:bg-gray-50/50 transition-colors cursor-pointer group"
                    onClick={() =>
                      router.push("/dashboard/inquiry/" + record.id)
                    }
                  >
                    <td className="px-6 py-5">
                      <span
                        className={
                          "px-2.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider " +
                          getBadgeStyles(record.type)
                        }
                      >
                        {record.type}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-gray-800">
                          {record.name}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400">
                          {record.phone}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="font-bold text-gray-600 truncate max-w-50 block">
                        {record.purpose}
                      </span>
                      {record.priority === "High" && (
                        <span className="text-[8px] font-black text-red-500 uppercase flex items-center gap-1 mt-1">
                          <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                          High Priority
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="text-xs font-bold text-gray-500">
                        {record.assignedStaff}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span
                        className={
                          "px-2.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider " +
                          getStatusStyles(record.status)
                        }
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-gray-700">
                          {record.time}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">
                          {record.date}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-teal-600 shadow-sm border border-transparent hover:border-teal-100 transition-all font-bold text-xs uppercase">
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InquiryManagement;
