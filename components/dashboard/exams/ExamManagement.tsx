"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Exam {
  id: string;
  name: string;
  type: "Unit" | "Terminal" | "Final" | "Practical" | "Entrance";
  academicYear: string;
  classes: string[];
  startDate: string;
  endDate: string;
  status: "Draft" | "Scheduled" | "Ongoing" | "Completed" | "Result Published";
  indicators: {
    timetable: boolean;
    admitCards: boolean;
    marksEntryProgress: number;
  };
}

const mockExams: Exam[] = [
  {
    id: "1",
    name: "Final Examination 2025",
    type: "Final",
    academicYear: "2025-2026",
    classes: ["Grade 8", "Grade 9", "Grade 10"],
    startDate: "2025-11-10",
    endDate: "2025-11-25",
    status: "Scheduled",
    indicators: {
      timetable: true,
      admitCards: true,
      marksEntryProgress: 0,
    },
  },
  {
    id: "2",
    name: "Mid-Term Assessment",
    type: "Terminal",
    academicYear: "2025-2026",
    classes: ["All Classes"],
    startDate: "2026-02-15",
    endDate: "2026-02-28",
    status: "Draft",
    indicators: {
      timetable: false,
      admitCards: false,
      marksEntryProgress: 0,
    },
  },
  {
    id: "3",
    name: "Mathematics Unit Test II",
    type: "Unit",
    academicYear: "2025-2026",
    classes: ["Grade 10-A", "Grade 10-B"],
    startDate: "2026-02-05",
    endDate: "2026-02-05",
    status: "Ongoing",
    indicators: {
      timetable: true,
      admitCards: false,
      marksEntryProgress: 45,
    },
  },
  {
    id: "4",
    name: "Internal Practical 2025",
    type: "Practical",
    academicYear: "2025-2026",
    classes: ["Grade 11", "Grade 12"],
    startDate: "2025-12-01",
    endDate: "2025-12-15",
    status: "Completed",
    indicators: {
      timetable: true,
      admitCards: true,
      marksEntryProgress: 100,
    },
  },
];

const ExamManagement = () => {
  const router = useRouter();
  const [filterType, setFilterType] = useState("All");

  const getStatusColor = (status: Exam["status"]) => {
    switch (status) {
      case "Draft":
        return "bg-gray-100 text-gray-500";
      case "Scheduled":
        return "bg-blue-50 text-blue-600";
      case "Ongoing":
        return "bg-amber-50 text-amber-600";
      case "Completed":
        return "bg-teal-50 text-teal-600";
      case "Result Published":
        return "bg-green-50 text-green-600";
      default:
        return "bg-gray-50 text-gray-400";
    }
  };

  const filteredExams =
    filterType === "All"
      ? mockExams
      : mockExams.filter((exam) => exam.type === filterType);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Examinations</h1>
          <p className="text-gray-500 text-sm">
            Manage schedules, marks, and results
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <select className="bg-[#F8FAFC] border-none rounded-xl px-4 py-2 text-sm font-medium text-gray-600 focus:ring-2 focus:ring-[#14B8A6]/20">
            <option>2025-2026</option>
            <option>2024-2025</option>
          </select>
          <button
            onClick={() => router.push("/dashboard/exams/create")}
            className="bg-[#14B8A6] text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-teal-500/20 hover:bg-[#0D9488] transition-all"
          >
            + Create New Exam
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {["All", "Unit", "Terminal", "Final", "Practical", "Entrance"].map(
          (type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                filterType === type
                  ? "bg-[#14B8A6] text-white shadow-md shadow-teal-500/20"
                  : "bg-white text-gray-500 border border-gray-100 hover:border-[#14B8A6]/30"
              }`}
            >
              {type}
            </button>
          ),
        )}
      </div>

      {/* Exam Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredExams.map((exam) => (
          <div
            key={exam.id}
            onClick={() => router.push(`/dashboard/exams/${exam.id}`)}
            className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-[#14B8A6]/20 transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(exam.status)}`}
              >
                {exam.status}
              </span>
              <div className="flex gap-2">
                {exam.indicators.timetable && (
                  <div
                    className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-[#14B8A6]"
                    title="Timetable Ready"
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
                {exam.indicators.admitCards && (
                  <div
                    className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600"
                    title="Admit Cards Issued"
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#14B8A6] transition-colors mb-1">
              {exam.name}
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              {exam.type} • {exam.academicYear}
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                  <svg
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <span>{exam.classes.join(", ")}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                  <svg
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span>
                  {exam.startDate} — {exam.endDate}
                </span>
              </div>
            </div>

            {exam.indicators.marksEntryProgress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  <span>Marks Entry Status</span>
                  <span>{exam.indicators.marksEntryProgress}%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#14B8A6] rounded-full transition-all duration-1000"
                    style={{ width: `${exam.indicators.marksEntryProgress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
              <div className="flex gap-4">
                <button className="text-[#14B8A6] text-xs font-bold hover:underline">
                  View Details
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/dashboard/exams/${exam.id}/marks`);
                  }}
                  className="text-gray-500 text-xs font-bold hover:text-[#14B8A6] hover:underline flex items-center gap-1"
                >
                  <svg
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Enter Marks
                </button>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
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
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamManagement;
