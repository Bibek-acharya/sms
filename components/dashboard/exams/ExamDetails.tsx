"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

interface TimetableItem {
  subject: string;
  date: string;
  time: string;
  room: string;
  duration: string;
}

interface MarkSection {
  name: string;
  teacher: string;
  status: string;
  progress: number;
}

interface ExamData {
  id: string | string[];
  name: string;
  type: string;
  academicYear: string;
  classes: string[];
  startDate: string;
  endDate: string;
  status: string;
  timetable: TimetableItem[];
  admitCards: { generated: number; total: number; status: string };
  subjects: Array<{
    name: string;
    fullMarks: number;
    passMarks: number;
    internalWeight: number;
    externalWeight: number;
  }>;
  marksEntry: {
    progress: number;
    sections: MarkSection[];
  };
  performance: {
    passRate: number;
    averageMarks: number;
    topPerformers: Array<{ name: string; rank: number; score: number }>;
  };
}

const ExamDetails = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for the detailed view
  const examData: ExamData = {
    id: id || "unknown",
    name: "Final Examination 2025",
    type: "Final",
    academicYear: "2025-2026",
    classes: ["Grade 8", "Grade 9", "Grade 10"],
    startDate: "2025-11-10",
    endDate: "2025-11-25",
    status: "Scheduled",
    timetable: [
      {
        subject: "Mathematics",
        date: "Nov 10, 2025",
        time: "09:00 AM - 12:00 PM",
        room: "Hall A",
        duration: "3h",
      },
      {
        subject: "Science",
        date: "Nov 12, 2025",
        time: "09:00 AM - 12:00 PM",
        room: "Hall B",
        duration: "3h",
      },
      {
        subject: "English",
        date: "Nov 14, 2025",
        time: "01:00 PM - 04:00 PM",
        room: "Room 101",
        duration: "3h",
      },
    ],
    admitCards: { generated: 450, total: 450, status: "Issued" },
    subjects: [
      {
        name: "Mathematics",
        fullMarks: 100,
        passMarks: 35,
        internalWeight: 20,
        externalWeight: 80,
      },
      {
        name: "Science",
        fullMarks: 100,
        passMarks: 35,
        internalWeight: 20,
        externalWeight: 80,
      },
    ],
    marksEntry: {
      progress: 65,
      sections: [
        {
          name: "8A",
          teacher: "Mr. Miller",
          status: "Completed",
          progress: 100,
        },
        {
          name: "8B",
          teacher: "Ms. Wilson",
          status: "In-Progress",
          progress: 45,
        },
        { name: "9A", teacher: "Dr. Smith", status: "Pending", progress: 0 },
      ],
    },
    performance: {
      passRate: 92,
      averageMarks: 76,
      topPerformers: [
        { name: "Alice Blue", rank: 1, score: 98 },
        { name: "Bob Green", rank: 2, score: 96 },
      ],
    },
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "timetable", label: "Timetable" },
    { id: "admit-cards", label: "Admit Cards" },
    { id: "config", label: "Configuration" },
    { id: "marks", label: "Marks Entry" },
    { id: "results", label: "Results" },
    { id: "reports", label: "Analytics" },
    { id: "info", label: "Instructions & Notes" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab data={examData} />;
      case "timetable":
        return <TimetableTab data={examData} />;
      case "admit-cards":
        return <AdmitCardTab data={examData} />;
      case "config":
        return <ConfigTab data={examData} />;
      case "marks":
        return <MarksEntryTab data={examData} />;
      case "results":
        return <ResultsTab data={examData} />;
      case "reports":
        return <ReportsTab data={examData} />;
      case "info":
        return <InfoTab data={examData} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-5">
          <button
            onClick={() => router.back()}
            className="p-2.5 hover:bg-gray-50 rounded-2xl transition-colors text-gray-400 hover:text-[#14B8A6]"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-gray-800">
                {examData.name}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600`}
              >
                {examData.status}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {examData.type} • {examData.academicYear} •{" "}
              {examData.classes.join(", ")}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button
            onClick={() => router.push(`/dashboard/exams/${id}/marks`)}
            className="flex-1 sm:flex-none px-4 py-2 bg-teal-50 text-[#14B8A6] rounded-xl text-sm font-bold border border-teal-100 hover:bg-teal-100 transition-all flex items-center justify-center gap-2"
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Enter Marks
          </button>
          <button className="flex-1 sm:flex-none px-4 py-2 border border-gray-100 bg-white text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
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
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Export PDF
          </button>
          <button className="flex-1 sm:flex-none px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all flex items-center justify-center gap-2">
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit Exam
          </button>
          <button className="flex-1 sm:flex-none px-6 py-2 bg-[#14B8A6] text-white rounded-xl text-sm font-bold shadow-lg shadow-teal-500/20 hover:bg-[#0D9488] transition-all">
            Publish Results
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-white border border-gray-100 rounded-3xl overflow-x-auto no-scrollbar shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-[#14B8A6] text-white shadow-md shadow-teal-500/20"
                : "text-gray-500 hover:text-[#14B8A6] hover:bg-teal-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-100">{renderTabContent()}</div>
    </div>
  );
};

// --- Sub-components ---

const OverviewTab = ({ data }: { data: ExamData }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="md:col-span-2 space-y-6">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-6">
          Exam Statistics
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Pass Rate
            </p>
            <p className="text-3xl font-black text-[#14B8A6]">
              {data.performance.passRate}%
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Avg Marks
            </p>
            <p className="text-3xl font-black text-blue-500">
              {data.performance.averageMarks}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Start Date
            </p>
            <p className="text-sm font-bold text-gray-700 mt-2">
              {data.startDate}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              End Date
            </p>
            <p className="text-sm font-bold text-gray-700 mt-2">
              {data.endDate}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-6">
          Marks Submission Progress
        </h3>
        <div className="space-y-6">
          {data.marksEntry.sections.map((section, i: number) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center font-bold text-gray-600 text-xs">
                    {section.name}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-gray-700">
                      {section.teacher}
                    </p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">
                      {section.status}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-500">
                  {section.progress}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${section.progress === 100 ? "bg-teal-500" : "bg-[#14B8A6]"}`}
                  style={{ width: `${section.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="space-y-6">
      <div className="bg-[#14B8A6] p-8 rounded-3xl shadow-xl shadow-teal-500/20 text-white">
        <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <button className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2">
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Download Admit Cards
          </button>
          <button className="w-full bg-white text-[#14B8A6] py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2">
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Generate Admit Cards
          </button>
          <button className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2">
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Lock Exam
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-6 font-primary">
          Academic Calendar
        </h3>
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex flex-col items-center justify-center text-[#14B8A6] shrink-0 font-bold">
              <span className="text-[10px]">NOV</span>
              <span className="text-sm">10</span>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-700">Exam Starts</p>
              <p className="text-xs text-gray-400">All primary sections</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex flex-col items-center justify-center text-amber-600 shrink-0 font-bold">
              <span className="text-[10px]">NOV</span>
              <span className="text-sm">25</span>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-700">Exam Ends</p>
              <p className="text-xs text-gray-400">Practical evaluations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TimetableTab = ({ data }: { data: ExamData }) => (
  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="p-8 border-b border-gray-50 flex justify-between items-center">
      <h3 className="font-bold text-lg text-gray-800 font-primary">
        Exam Schedule
      </h3>
      <button className="text-[#14B8A6] text-sm font-bold hover:underline">
        + Edit Schedule
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">
              Subject
            </th>
            <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">
              Date
            </th>
            <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">
              Time Slot
            </th>
            <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">
              Room
            </th>
            <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest text-center">
              Duration
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.timetable.map((row, i: number) => (
            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-8 py-6 font-bold text-gray-700">
                {row.subject}
              </td>
              <td className="px-8 py-6 text-sm text-gray-600">{row.date}</td>
              <td className="px-8 py-6 text-sm text-gray-600">{row.time}</td>
              <td className="px-8 py-6 text-sm text-gray-600">{row.room}</td>
              <td className="px-8 py-6 text-sm text-gray-600 text-center">
                <span className="px-3 py-1 bg-gray-100 rounded-full font-bold">
                  {row.duration}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const AdmitCardTab = ({ data }: { data: ExamData }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center text-[#14B8A6] mb-4">
        <svg
          width="32"
          height="32"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        Admit Cards Ready
      </h3>
      <p className="text-sm text-gray-400 mb-6">
        {data.admitCards.generated} out of {data.admitCards.total} cards have
        been generated.
      </p>
      <button className="px-8 py-3 bg-[#14B8A6] text-white rounded-2xl font-bold shadow-lg shadow-teal-500/20 hover:bg-[#0D9488] transition-all">
        Download All (PDF)
      </button>
    </div>
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-6">Settings</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
          <div>
            <p className="text-sm font-bold text-gray-700">Fee-due Lock</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase">
              Restrict defaulters
            </p>
          </div>
          <div className="w-12 h-6 bg-[#14B8A6] rounded-full relative p-1 cursor-pointer">
            <div className="w-4 h-4 bg-white rounded-full absolute right-1 shadow-sm" />
          </div>
        </div>
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
          <div>
            <p className="text-sm font-bold text-gray-700">Seat Numbering</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase">
              Auto-assign seats
            </p>
          </div>
          <div className="w-12 h-6 bg-gray-200 rounded-full relative p-1 cursor-pointer">
            <div className="w-4 h-4 bg-white rounded-full absolute left-1 shadow-sm" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ConfigTab = ({ data }: { data: ExamData }) => (
  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-8">
    <div className="flex justify-between items-center mb-8">
      <h3 className="text-lg font-bold text-gray-800">Subject Configuration</h3>
      <button className="text-[#14B8A6] text-sm font-bold hover:underline">
        + Add Subject
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.subjects.map((sub, i: number) => (
        <div
          key={i}
          className="p-6 border border-gray-100 rounded-3xl hover:border-[#14B8A6]/20 transition-all"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-gray-800 text-lg">{sub.name}</span>
            <span className="px-3 py-1 bg-teal-50 text-[#14B8A6] text-[10px] font-bold rounded-full">
              CORE
            </span>
          </div>
          <div className="grid grid-cols-2 gap-y-4">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase">
                Full Marks
              </p>
              <p className="text-lg font-bold text-gray-700">{sub.fullMarks}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase">
                Pass Marks
              </p>
              <p className="text-lg font-bold text-gray-700">{sub.passMarks}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase">
                Internal / External
              </p>
              <p className="text-lg font-bold text-gray-700">
                {sub.internalWeight} / {sub.externalWeight}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MarksEntryTab = ({ data }: { data: ExamData }) => (
  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center py-20">
    <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center text-[#14B8A6] mx-auto mb-6">
      <svg
        width="32"
        height="32"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">
      Marks Entry is Open
    </h3>
    <p className="text-sm text-gray-400 mb-8 max-w-sm mx-auto">
      Teachers can now enter marks for {data.name} respective subjects. System
      will automatically calculate grades based on the defined formula.
    </p>
    <div className="flex justify-center gap-3">
      <button className="px-8 py-3 bg-[#14B8A6] text-white rounded-2xl font-bold shadow-lg shadow-teal-500/20 hover:bg-[#0D9488] transition-all">
        Go to Marks Sheet
      </button>
      <button className="px-8 py-3 border border-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-50 transition-all">
        Bulk Upload (Excel)
      </button>
    </div>
  </div>
);

const ResultsTab = ({ data }: { data: ExamData }) => (
  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center py-20">
    <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mx-auto mb-6">
      <svg
        width="32"
        height="32"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">Result Processing</h3>
    <p className="text-sm text-gray-400 mb-8 max-w-md mx-auto">
      Grade calculation and rank processing for {data.name} are currently
      locked. Please ensure all marks entries are completed before proceeding to
      result generation.
    </p>
    <div className="flex justify-center gap-3">
      <button
        className="px-8 py-3 bg-gray-400 text-white rounded-2xl font-bold cursor-not-allowed"
        disabled
      >
        Calculate Results
      </button>
      <button className="px-8 py-3 border border-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-50 transition-all">
        Preview Report Card
      </button>
    </div>
  </div>
);

const ReportsTab = ({ data }: { data: ExamData }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-6">
        Pass vs Fail Ratio
      </h3>
      <div className="flex items-center gap-10">
        <div className="w-32 h-32 rounded-full border-12 border-teal-500 flex items-center justify-center border-l-red-500">
          <span className="text-xl font-bold text-gray-700">
            {data.performance.passRate}%
          </span>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-teal-500" />
            <span className="text-sm font-bold text-gray-600">
              Passed Students
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-sm font-bold text-gray-600">
              Need Improvement
            </span>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-6 font-primary">
        Top Performers
      </h3>
      <div className="space-y-4">
        {data.performance.topPerformers.map((student, i: number) => (
          <div
            key={i}
            className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100/50"
          >
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-xs">
                #{student.rank}
              </span>
              <span className="font-bold text-gray-800">{student.name}</span>
            </div>
            <span className="px-3 py-1 bg-white rounded-lg text-[#14B8A6] font-black text-sm">
              {student.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const InfoTab = ({ data }: { data: ExamData }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Exam Instructions
      </h3>
      <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 italic text-gray-600 text-sm leading-relaxed">
        "Students are required to carry their physical admit cards. Use of
        scientific calculators is permitted only for Physics and Mathematics
        papers. Late entry beyond 15 minutes is strictly prohibited."
      </div>
      <div className="space-y-4">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Attached Documents
        </h4>
        <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 group cursor-pointer hover:border-[#14B8A6]/30 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
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
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-700">
                Exam_Policy_2025.pdf
              </p>
              <p className="text-[10px] text-gray-400">
                2.4 MB • Shared with Staff
              </p>
            </div>
          </div>
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            className="text-gray-300 group-hover:text-[#14B8A6]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </div>
      </div>
    </div>

    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
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
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        Internal Notes
      </h3>
      <div className="space-y-4">
        <div className="p-5 bg-teal-50/50 rounded-2xl border border-teal-100/50 relative">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-bold text-[#14B8A6] uppercase">
              Admin Remark
            </span>
            <span className="text-[10px] text-gray-400">Feb 10, 2026</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            Exam hall A requires IT equipment setup for the Computer Science
            practical. Coordinator needs to verify seating capacity again.
          </p>
        </div>
        <button className="w-full py-4 border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 text-sm font-medium hover:bg-gray-50 hover:border-[#14B8A6]/30 transition-all flex items-center justify-center gap-2">
          <Plus size={18} />
          Add Internal Remark
        </button>
      </div>
    </div>
  </div>
);

export default ExamDetails;
