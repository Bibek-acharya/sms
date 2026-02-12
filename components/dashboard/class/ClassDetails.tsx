"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface Section {
  id: string;
  name: string;
  teacher: string;
  teacherImage: string;
  students: number;
  room: string;
  shift: string;
  attendance: number;
  avgGPA: number;
}

interface Subject {
  name: string;
  sections: { [key: string]: string };
  periods: number;
  lab: boolean;
}

interface ClassData {
  id: string | string[];
  name: string;
  academicYear: string;
  totalSections: number;
  totalStudents: number;
  status: string;
  classTeachers: string[];
  sections: Section[];
  subjects: Subject[];
  stats: {
    gender: { male: number; female: number };
    newAdmissions: number;
    transfers: { in: number; out: number };
  };
  attendance: {
    today: number;
    monthly: number;
    absentees: number;
  };
  exams: {
    status: string;
    readiness: number;
    avgMarks: number;
    passRatio: number;
    syllabusCompletion: number;
  };
  fees: {
    plan: string;
    totalDues: string;
    paidCount: number;
    unpaidCount: number;
    defaulters: number;
  };
}

const ClassDetails = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for the detailed view
  const classData: ClassData = {
    id: id || "unknown",
    name: "Grade 8",
    academicYear: "2025-2026",
    totalSections: 3,
    totalStudents: 95,
    status: "Active",
    classTeachers: ["Mr. David Miller", "Ms. Sarah Wilson"],
    sections: [
      {
        id: "8A",
        name: "A",
        teacher: "Mr. David Miller",
        teacherImage: "https://i.pravatar.cc/150?u=david",
        students: 32,
        room: "R-801",
        shift: "Morning",
        attendance: 94,
        avgGPA: 3.8,
      },
      {
        id: "8B",
        name: "B",
        teacher: "Ms. Sarah Wilson",
        teacherImage: "https://i.pravatar.cc/150?u=sarah",
        students: 31,
        room: "R-802",
        shift: "Morning",
        attendance: 91,
        avgGPA: 3.6,
      },
      {
        id: "8C",
        name: "C",
        teacher: "Ms. Emily Chen",
        teacherImage: "https://i.pravatar.cc/150?u=emily",
        students: 32,
        room: "R-803",
        shift: "Morning",
        attendance: 89,
        avgGPA: 3.7,
      },
    ],
    subjects: [
      {
        name: "Mathematics",
        sections: { A: "Mr. Miller", B: "Mr. Miller", C: "Ms. Lee" },
        periods: 6,
        lab: false,
      },
      {
        name: "Science",
        sections: { A: "Dr. Smith", B: "Dr. Smith", C: "Dr. Smith" },
        periods: 5,
        lab: true,
      },
      {
        name: "English",
        sections: { A: "Ms. Davis", B: "Ms. Davis", C: "Ms. Davis" },
        periods: 5,
        lab: false,
      },
    ],
    stats: {
      gender: { male: 48, female: 47 },
      newAdmissions: 12,
      transfers: { in: 5, out: 2 },
    },
    attendance: {
      today: 92,
      monthly: 91.5,
      absentees: 8,
    },
    exams: {
      status: "Upcoming (Mid-term)",
      readiness: 85,
      avgMarks: 78,
      passRatio: 94,
      syllabusCompletion: 75,
    },
    fees: {
      plan: "Standard Grade 8",
      totalDues: "$45,000",
      paidCount: 82,
      unpaidCount: 13,
      defaulters: 5,
    },
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "academic", label: "Subjects & Teachers" },
    { id: "students", label: "Students" },
    { id: "timetable", label: "Timetable" },
    { id: "performance", label: "Performance" },
    { id: "finance", label: "Fees" },
    { id: "resources", label: "Resources" },
    { id: "logs", label: "Activity" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab data={classData} router={router} />;
      case "academic":
        return <AcademicTab data={classData} />;
      case "students":
        return <StudentsTab data={classData} />;
      case "timetable":
        return <TimetableTab data={classData} />;
      case "performance":
        return <PerformanceTab data={classData} />;
      case "finance":
        return <FinanceTab data={classData} />;
      case "resources":
        return <ResourcesTab data={classData} />;
      case "logs":
        return <LogsTab data={classData} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-5">
          <button
            onClick={() => router.back()}
            className="p-2.5 hover:bg-gray-50 rounded-xl transition-colors text-gray-400 hover:text-[#14B8A6]"
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
                {classData.name}
              </h1>
              <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                {classData.status}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
                Academic Year: {classData.academicYear}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
                {classData.totalSections} Sections
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
                {classData.totalStudents} Students
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-4 py-2 border border-gray-100 bg-white text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
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
          <button className="flex-1 sm:flex-none px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2">
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
            Edit Class
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-white border border-gray-100 rounded-2xl overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
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

// --- Tab Components ---

const OverviewTab = ({
  data,
  router,
}: {
  data: ClassData;
  router: AppRouterInstance;
}) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.sections.map((section) => (
        <div
          key={section.id}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-[#14B8A6]/30 transition-all group"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-[#14B8A6] font-bold text-xl">
                {section.name}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">
                  Section {section.name}
                </h3>
                <p className="text-gray-400 text-xs">Room: {section.room}</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
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
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-xl">
            <div className="relative w-10 h-10 overflow-hidden rounded-full">
              <Image
                src={section.teacherImage}
                alt={section.teacher}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                Class Teacher
              </p>
              <p className="text-sm font-semibold text-gray-700">
                {section.teacher}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-3 border border-gray-50 rounded-xl bg-white">
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">
                Students
              </p>
              <p className="text-lg font-bold text-gray-800">
                {section.students}
              </p>
            </div>
            <div className="p-3 border border-gray-50 rounded-xl bg-white">
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">
                Attendance
              </p>
              <p className="text-lg font-bold text-[#14B8A6]">
                {section.attendance}%
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() =>
                router.push(`/dashboard/class/${data.id}/section/${section.id}`)
              }
              className="flex-1 py-2 text-xs font-bold text-[#14B8A6] bg-teal-50 rounded-lg hover:bg-[#14B8A6] hover:text-white transition-all"
            >
              View Students
            </button>
            <button className="px-3 py-2 text-gray-400 hover:text-[#14B8A6] hover:bg-teal-50 rounded-lg transition-all">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AcademicTab = ({ data }: { data: ClassData }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
      <h3 className="font-bold text-gray-800">Subject Mapping & Teachers</h3>
      <button className="text-[#14B8A6] text-sm font-bold hover:underline">
        + Map New Subject
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">
              Subject
            </th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">
              Section A
            </th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">
              Section B
            </th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">
              Section C
            </th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">
              Periods/Week
            </th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">
              Lab
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.subjects.map((sub, idx) => (
            <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4 font-semibold text-gray-700">
                {sub.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 capitalize cursor-pointer hover:text-[#14B8A6] transition-colors">
                {sub.sections.A}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 capitalize cursor-pointer hover:text-[#14B8A6] transition-colors">
                {sub.sections.B}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 capitalize cursor-pointer hover:text-[#14B8A6] transition-colors">
                {sub.sections.C}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 text-center">
                {sub.periods}
              </td>
              <td className="px-6 py-4 text-center">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${sub.lab ? "bg-amber-50 text-amber-600" : "bg-gray-100 text-gray-400"}`}
                >
                  {sub.lab ? "YES" : "NO"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const StudentsTab = ({ data }: { data: ClassData }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="font-bold text-gray-800">Enrollment Summary</h3>
      <button className="px-4 py-2 bg-[#14B8A6] text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#0D9488] transition-all shadow-md shadow-teal-500/10">
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
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          />
        </svg>
        Assign Students
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-6">Gender Distribution</h3>
        <div className="flex items-center gap-10">
          <div className="relative w-32 h-32">
            {/* Simple semi-circle or progress circle would go here */}
            <div className="w-full h-full rounded-full border-8 border-gray-100 flex items-center justify-center">
              <span className="text-xl font-bold text-[#14B8A6]">
                {data.totalStudents}
              </span>
            </div>
          </div>
          <div className="space-y-4 flex-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-400" />
                <span className="text-sm text-gray-600">Male</span>
              </div>
              <span className="font-bold text-gray-800">
                {data.stats.gender.male}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-pink-400" />
                <span className="text-sm text-gray-600">Female</span>
              </div>
              <span className="font-bold text-gray-800">
                {data.stats.gender.female}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-6">Admission Insights</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-teal-50 rounded-2xl">
            <p className="text-xs text-[#14B8A6] font-bold uppercase mb-1">
              New Admissions
            </p>
            <p className="text-2xl font-bold text-gray-800">
              {data.stats.newAdmissions}
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-2xl">
            <p className="text-xs text-blue-500 font-bold uppercase mb-1">
              Transfer-In
            </p>
            <p className="text-2xl font-bold text-gray-800">
              {data.stats.transfers.in}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TimetableTab = ({ data }: { data: ClassData }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
    <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center text-[#14B8A6] mx-auto mb-4">
      <svg
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
    <h3 className="text-lg font-bold text-gray-800 mb-2">Timetable View</h3>
    <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
      The weekly schedule for {data.name} sections is being managed. You can
      switch between sections to view specific clashes.
    </p>
    <div className="flex justify-center gap-3">
      <button className="px-6 py-2 bg-[#14B8A6] text-white rounded-lg text-sm font-bold shadow-lg shadow-teal-500/20">
        Edit Timetable
      </button>
      <button className="px-6 py-2 border border-gray-100 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-50">
        Preview All
      </button>
    </div>
  </div>
);

const PerformanceTab = ({ data }: { data: ClassData }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <p className="text-xs text-gray-400 font-bold uppercase mb-1">
        Avg Marks
      </p>
      <p className="text-2xl font-bold text-gray-800">{data.exams.avgMarks}%</p>
      <div className="mt-4 h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#14B8A6]"
          style={{ width: `${data.exams.avgMarks}%` }}
        />
      </div>
    </div>
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <p className="text-xs text-gray-400 font-bold uppercase mb-1">
        Pass Ratio
      </p>
      <p className="text-2xl font-bold text-gray-800">
        {data.exams.passRatio}%
      </p>
      <div className="mt-4 h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500"
          style={{ width: `${data.exams.passRatio}%` }}
        />
      </div>
    </div>
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <p className="text-xs text-gray-400 font-bold uppercase mb-1">Syllabus</p>
      <p className="text-2xl font-bold text-gray-800">
        {data.exams.syllabusCompletion}%
      </p>
      <div className="mt-4 h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-500"
          style={{ width: `${data.exams.syllabusCompletion}%` }}
        />
      </div>
    </div>
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <p className="text-xs text-gray-400 font-bold uppercase mb-1">
        Next Exam
      </p>
      <p className="text-lg font-bold text-gray-800 truncate">
        {data.exams.status}
      </p>
      <button className="mt-4 text-xs font-bold text-[#14B8A6] hover:underline">
        View Schedule
      </button>
    </div>
  </div>
);

const FinanceTab = ({ data }: { data: ClassData }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
    <div className="flex justify-between items-center mb-8">
      <div>
        <h3 className="font-bold text-gray-800">Fees Snapshot</h3>
        <p className="text-xs text-gray-400 mt-1">
          Class-wide fee plan: {data.fees.plan}
        </p>
      </div>
      <div className="text-right">
        <p className="text-xs text-gray-400 font-bold uppercase">Total Dues</p>
        <p className="text-2xl font-bold text-[#14B8A6]">
          {data.fees.totalDues}
        </p>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="p-4 bg-teal-50/50 rounded-2xl border border-teal-50">
        <p className="text-xs text-[#14B8A6] font-bold uppercase mb-1">
          Paid Students
        </p>
        <p className="text-2xl font-bold text-gray-800">
          {data.fees.paidCount}
        </p>
      </div>
      <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-50">
        <p className="text-xs text-amber-600 font-bold uppercase mb-1">
          Unpaid / Pending
        </p>
        <p className="text-2xl font-bold text-gray-800">
          {data.fees.unpaidCount}
        </p>
      </div>
      <div className="p-4 bg-red-50/50 rounded-2xl border border-red-50 text-red-600">
        <p className="text-xs font-bold uppercase mb-1">Chronic Defaulters</p>
        <p className="text-2xl font-bold">{data.fees.defaulters}</p>
      </div>
    </div>
  </div>
);

const ResourcesTab = ({ data }: { data: ClassData }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="font-bold text-gray-800">Resources for {data.name}</h3>
      <button className="text-[#14B8A6] text-sm font-bold hover:underline">
        + Upload Resource
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        "Class Syllabus.pdf",
        "Academic Calendar.pdf",
        "Math Study Material.zip",
        "English Projects.pdf",
      ].map((file, i) => (
        <div
          key={i}
          className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between group hover:border-[#14B8A6]/30 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-[#14B8A6] transition-colors">
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
              <p className="text-sm font-semibold text-gray-700">{file}</p>
              <p className="text-[10px] text-gray-400">Added: Feb 08, 2026</p>
            </div>
          </div>
          <button className="p-2 text-gray-400 hover:text-[#14B8A6]">
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
                d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  </div>
);

const LogsTab = ({ data }: { data: ClassData }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6">
    <div className="space-y-6">
      {[
        {
          action: "Teacher Reassigned",
          details: `Mr. Miller assigned to ${data.name} Section A Mathematics`,
          time: "2 hours ago",
        },
        {
          action: "Section Created",
          details: `Section C added to ${data.name}`,
          time: "1 day ago",
        },
        {
          action: "Timetable Updated",
          details: "Friday 4th period clash resolved",
          time: "2 days ago",
        },
      ].map((log, i) => (
        <div key={i} className="flex gap-4 items-start">
          <div className="w-2 h-2 rounded-full bg-[#14B8A6] mt-2 shrink-0" />
          <div>
            <p className="text-sm font-bold text-gray-800">{log.action}</p>
            <p className="text-xs text-gray-500 mb-1">{log.details}</p>
            <p className="text-[10px] text-gray-400 uppercase font-bold">
              {log.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ClassDetails;
