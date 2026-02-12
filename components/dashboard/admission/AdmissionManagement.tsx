"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface AdmissionApplicant {
  id: string;
  name: string;
  class: string;
  parentName: string;
  parentPhone: string;
  source: string;
  date: string;
  status:
    | "Inquiry"
    | "Application Submitted"
    | "Under Review"
    | "Interview Scheduled"
    | "Offered"
    | "Admitted"
    | "Rejected";
}

const mockApplicants: AdmissionApplicant[] = [
  {
    id: "ADM-2025-001",
    name: "John Doe Jr.",
    class: "Grade 1",
    parentName: "John Doe",
    parentPhone: "+1 234 567 890",
    source: "Website",
    date: "2025-02-01",
    status: "Inquiry",
  },
  {
    id: "ADM-2025-002",
    name: "Sarah Smith",
    class: "Grade 5",
    parentName: "Robert Smith",
    parentPhone: "+1 234 567 891",
    source: "Referral",
    date: "2025-01-28",
    status: "Interview Scheduled",
  },
  {
    id: "ADM-2025-003",
    name: "Michael Johnson",
    class: "Grade 8",
    parentName: "Linda Johnson",
    parentPhone: "+1 234 567 892",
    source: "Walk-in",
    date: "2025-02-05",
    status: "Application Submitted",
  },
  {
    id: "ADM-2025-004",
    name: "Emily Davis",
    class: "Grade 1",
    parentName: "Mark Davis",
    parentPhone: "+1 234 567 893",
    source: "Website",
    date: "2025-01-20",
    status: "Admitted",
  },
];

const AdmissionManagement = () => {
  const router = useRouter();

  const getStatusColor = (status: AdmissionApplicant["status"]) => {
    switch (status) {
      case "Inquiry":
        return "bg-gray-100 text-gray-500 text-xs font-bold";
      case "Application Submitted":
        return "bg-blue-50 text-blue-600 text-xs font-bold";
      case "Under Review":
        return "bg-amber-50 text-amber-600 text-xs font-bold";
      case "Interview Scheduled":
        return "bg-purple-50 text-purple-600 text-xs font-bold";
      case "Offered":
        return "bg-teal-50 text-teal-600 text-xs font-bold";
      case "Admitted":
        return "bg-green-50 text-green-600 text-xs font-bold";
      case "Rejected":
        return "bg-red-50 text-red-600 text-xs font-bold";
      default:
        return "bg-gray-50 text-gray-400 text-xs font-bold";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">
            Admissions
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            Track student inquiries and applications journey
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Academic Year
            </span>
            <select className="bg-transparent border-none text-sm font-bold text-gray-700 focus:ring-0 p-0">
              <option>2025-2026</option>
              <option>2024-2025</option>
            </select>
          </div>
          <button
            onClick={() => router.push("/dashboard/admission/new")}
            className="bg-[#14B8A6] text-white px-6 py-2.5 rounded-2xl text-sm font-bold shadow-lg shadow-teal-500/20 hover:bg-[#0D9488] transition-all flex items-center gap-2"
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
            New Admission
          </button>
        </div>
      </div>

      {/* Pipeline Funnel */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {[
          { label: "Total Inquiries", count: 124, color: "bg-blue-500" },
          { label: "Applications", count: 85, color: "bg-indigo-500" },
          { label: "Pending Test", count: 12, color: "bg-amber-500" },
          { label: "Offered", count: 42, color: "bg-teal-500" },
          { label: "Confirmed", count: 38, color: "bg-green-500" },
          { label: "Rejected", count: 15, color: "bg-red-400" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
              {item.label}
            </p>
            <div className="flex items-end gap-2">
              <h3 className="text-2xl font-black text-gray-800">
                {item.count}
              </h3>
              <div className={`w-1.5 h-1.5 rounded-full mb-2 ${item.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 group w-full">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#14B8A6] transition-colors"
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
            placeholder="Search by student, parent or phone..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#14B8A6]/20 transition-all"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
          <select className="bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm font-bold text-gray-600 focus:ring-2 focus:ring-[#14B8A6]/20">
            <option>All Classes</option>
            <option>Grade 1</option>
            <option>Grade 2</option>
          </select>
          <select className="bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm font-bold text-gray-600 focus:ring-2 focus:ring-[#14B8A6]/20">
            <option>All Sources</option>
            <option>Website</option>
            <option>Referral</option>
            <option>Walk-in</option>
          </select>
          <button className="bg-gray-50 p-3 rounded-2xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all">
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Admission List */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                  ID
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                  Applicant
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                  Grade
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                  Parent Details
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                  Status
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                  Date
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockApplicants.map((applicant) => (
                <tr
                  key={applicant.id}
                  className="hover:bg-gray-50/50 transition-colors cursor-pointer group"
                  onClick={() =>
                    router.push(`/dashboard/admission/${applicant.id}`)
                  }
                >
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-gray-400">
                      #{applicant.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center text-[#14B8A6] font-black text-xs uppercase">
                        {applicant.name.charAt(0)}
                      </div>
                      <span className="font-bold text-gray-800 text-sm">
                        {applicant.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                      {applicant.class}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-700">
                        {applicant.parentName}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400">
                        {applicant.parentPhone}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1.5 rounded-full uppercase tracking-wider ${getStatusColor(applicant.status)}`}
                    >
                      {applicant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-xs font-bold text-gray-500">
                      {applicant.date}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-teal-600 shadow-sm border border-transparent hover:border-teal-100 transition-all">
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
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-teal-600 shadow-sm border border-transparent hover:border-teal-100 transition-all">
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
                            strokeWidth="2"
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center font-bold text-xs text-gray-500">
          <span>Showing 4 of 124 applicants</span>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-white rounded-xl border border-gray-100 hover:border-teal-200 transition-all disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button className="px-4 py-2 bg-white rounded-xl border border-gray-100 hover:border-teal-200 transition-all">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionManagement;
