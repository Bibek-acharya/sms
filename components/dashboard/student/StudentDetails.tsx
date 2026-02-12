"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  LayoutGrid, 
  CalendarDays,
  AlertCircle,
  Check,
  UserX
} from "lucide-react";

interface StudentData {
  id: string;
  name: string;
  rollNumber: string;
  regNumber: string;
  class: string;
  section: string;
  academicYear: string;
  status: "Active" | "On Leave" | "Graduated" | "Transferred";
  photo: string;
  personal: {
    gender: string;
    dob: string;
    bloodGroup: string;
    nationality: string;
    address: string;
    medicalNotes: string;
  };
  parent: {
    fatherName: string;
    fatherContact: string;
    motherName: string;
    motherContact: string;
    guardianName?: string;
    relationship?: string;
    emergencyContact: string;
  };
  academics: {
    subjects: { name: string; type: "Core" | "Elective"; teacher: string }[];
    classTeacher: string;
    house: string;
    gpa: string;
    history: { year: string; class: string; result: string }[];
  };
  attendance: {
    today: string;
    percentage: number;
    late: number;
    halfDay: number;
    leaves: { type: string; status: string; date: string }[];
  };
  exams: {
    upcoming: { subject: string; date: string }[];
    results: { subject: string; marks: number; total: number; grade: string }[];
    gpaTrend: { term: string; gpa: string }[];
  };
  fees: {
    structure: { type: string; amount: number }[];
    paid: number;
    due: number;
    fine: number;
    history: {
      date: string;
      amount: number;
      method: string;
      receipt: string;
    }[];
  };
  documents: {
    name: string;
    type: string;
    status: "Verified" | "Pending";
    url: string;
  }[];
}

const mockStudentData: StudentData = {
  id: "S1001",
  name: "John Maxwell Doe",
  rollNumber: "24",
  regNumber: "REG-2024-001",
  class: "10",
  section: "A",
  academicYear: "2024-25",
  status: "Active",
  photo: "",
  personal: {
    gender: "Male",
    dob: "May 15, 2010 (14 years)",
    bloodGroup: "O+",
    nationality: "American",
    address: "123 Academic Lane, Knowledge City, ST 54321",
    medicalNotes: "Pollen allergy, carries EpiPen.",
  },
  parent: {
    fatherName: "Richard Doe",
    fatherContact: "+1 234 567 8901",
    motherName: "Mary Doe",
    motherContact: "+1 234 567 8902",
    emergencyContact: "+1 234 567 8999",
  },
  academics: {
    classTeacher: "Sarah Johnson",
    house: "Red House (Phoenix)",
    gpa: "3.8",
    subjects: [
      { name: "Mathematics", type: "Core", teacher: "Sarah Johnson" },
      { name: "Physics", type: "Core", teacher: "Robert Wilson" },
      { name: "Computer Science", type: "Elective", teacher: "Michael Chen" },
    ],
    history: [
      { year: "2023-24", class: "9", result: "A (3.75 GPA)" },
      { year: "2022-23", class: "8", result: "A- (3.6 GPA)" },
    ],
  },
  attendance: {
    today: "Present",
    percentage: 94.5,
    late: 2,
    halfDay: 1,
    leaves: [
      { type: "Sick Leave", status: "Approved", date: "Jan 12, 2024" },
      { type: "Casual Leave", status: "Rejected", date: "Feb 05, 2024" },
    ],
  },
  exams: {
    upcoming: [
      { subject: "Mid-Term Physics", date: "Mar 15, 2024" },
      { subject: "Calculus Quiz", date: "Mar 18, 2024" },
    ],
    results: [
      { subject: "Mathematics", marks: 92, total: 100, grade: "A+" },
      { subject: "Physics", marks: 88, total: 100, grade: "A" },
      { subject: "English", marks: 85, total: 100, grade: "A-" },
    ],
    gpaTrend: [
      { term: "Term 1", gpa: "3.7" },
      { term: "Term 2", gpa: "3.85" },
      { term: "Finals", gpa: "3.8" },
    ],
  },
  fees: {
    structure: [
      { type: "Tuition Fee", amount: 2500 },
      { type: "Lab Fee", amount: 300 },
      { type: "Library", amount: 150 },
    ],
    paid: 2800,
    due: 150,
    fine: 0,
    history: [
      {
        date: "Jan 05, 2024",
        amount: 1400,
        method: "Credit Card",
        receipt: "REC-001",
      },
      {
        date: "Feb 02, 2024",
        amount: 1400,
        method: "Bank Transfer",
        receipt: "REC-042",
      },
    ],
  },
  documents: [
    { name: "Birth Certificate", type: "PDF", status: "Verified", url: "#" },
    { name: "Last School TC", type: "Image", status: "Verified", url: "#" },
    { name: "Medical Form", type: "PDF", status: "Pending", url: "#" },
  ],
};

const StudentDetails = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Overview");
  const [attendanceView, setAttendanceView] = useState<"Month" | "Year">("Month");
  const [currentMonth, setCurrentMonth] = useState(1); // February
  const [currentYear, setCurrentYear] = useState(2026);

  const academicEvents = [
    { date: "2026-02-15", title: "Quarterly Examination", type: "Exam" },
    { date: "2026-02-25", title: "Spring Break", type: "Holiday" },
    { date: "2026-03-12", title: "Science Exhibition", type: "Event" },
  ];

  const tabs = [
    "Overview",
    "Academics",
    "Attendance",
    "Exams",
    "Fees",
    "Health",
    "Access",
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-600";
      case "On Leave":
        return "bg-amber-50 text-amber-600";
      case "Graduated":
        return "bg-blue-50 text-blue-600";
      case "Transferred":
        return "bg-red-50 text-red-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Sticky Header Section */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-50 rounded-full transition-colors hidden md:block"
              >
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-teal-50 rounded-3xl flex items-center justify-center text-[#14B8A6] text-2xl font-black border-4 border-white shadow-lg">
                  JD
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-xl sm:text-2xl font-black text-gray-800">
                    {mockStudentData.name}
                  </h1>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusColor(mockStudentData.status)}`}
                  >
                    {mockStudentData.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-bold text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <span className="text-gray-300">ID:</span>{" "}
                    {mockStudentData.id}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-gray-300">Class:</span>{" "}
                    {mockStudentData.class}-{mockStudentData.section}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-gray-300">Roll:</span>{" "}
                    {mockStudentData.rollNumber}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              <button
                onClick={() =>
                  router.push(`/dashboard/student/add?id=${mockStudentData.id}`)
                }
                className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-black text-xs shadow-lg hover:bg-black transition-all whitespace-nowrap uppercase tracking-widest"
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
                    strokeWidth="2.5"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Profile
              </button>
              <button className="flex items-center gap-2 bg-[#14B8A6] text-white px-5 py-2.5 rounded-xl font-black text-xs shadow-lg shadow-teal-500/20 hover:bg-[#0D9488] transition-all whitespace-nowrap uppercase tracking-widest">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                    strokeWidth="2.5"
                  />
                </svg>
                Call Parent
              </button>
              <button className="flex items-center gap-2 bg-white border border-gray-100 text-gray-600 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all whitespace-nowrap">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                    strokeWidth="2"
                  />
                </svg>
                Message
              </button>
              <button className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:text-gray-600 transition-all">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1 mt-6 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl text-sm font-black transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-[#14B8A6] text-white shadow-lg shadow-teal-500/20"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === "Overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Left Column - Personal Info */}
            <div className="lg:col-span-8 space-y-8">
              <section className="bg-white p-6 sm:p-8 rounded-4xl border border-gray-100 shadow-sm">
                <h3 className="text-sm font-black text-[#14B8A6] uppercase tracking-widest mb-8 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#14B8A6] rounded-full"></span>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                      Full Name
                    </p>
                    <p className="text-sm font-black text-gray-700">
                      {mockStudentData.name}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                      Date of Birth
                    </p>
                    <p className="text-sm font-black text-gray-700">
                      {mockStudentData.personal.dob}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                      Gender
                    </p>
                    <p className="text-sm font-black text-gray-700">
                      {mockStudentData.personal.gender}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                      Blood Group
                    </p>
                    <p className="text-sm font-black text-red-500">
                      {mockStudentData.personal.bloodGroup}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                      Nationality
                    </p>
                    <p className="text-sm font-black text-gray-700">
                      {mockStudentData.personal.nationality}
                    </p>
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                      Address
                    </p>
                    <p className="text-sm font-black text-gray-700 leading-relaxed">
                      {mockStudentData.personal.address}
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-white p-6 sm:p-8 rounded-4xl border border-gray-100 shadow-sm">
                <h3 className="text-sm font-black text-[#14B8A6] uppercase tracking-widest mb-8 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#14B8A6] rounded-full"></span>
                  Parent & Guardian Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div className="p-5 bg-gray-50 rounded-4xl border border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-3">
                        Father
                      </p>
                      <p className="text-sm font-black text-gray-800">
                        {mockStudentData.parent.fatherName}
                      </p>
                      <p className="text-xs font-bold text-[#14B8A6] mt-1">
                        {mockStudentData.parent.fatherContact}
                      </p>
                    </div>
                    <div className="p-5 bg-gray-50 rounded-4xl border border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-3">
                        Mother
                      </p>
                      <p className="text-sm font-black text-gray-800">
                        {mockStudentData.parent.motherName}
                      </p>
                      <p className="text-xs font-bold text-[#14B8A6] mt-1">
                        {mockStudentData.parent.motherContact}
                      </p>
                    </div>
                  </div>
                  <div className="bg-red-50/50 p-8 rounded-[2.5rem] border border-red-100 border-dashed flex flex-col justify-center text-center">
                    <p className="text-[10px] font-black text-red-400 uppercase mb-4 tracking-tighter">
                      Emergency Contact
                    </p>
                    <p className="text-2xl font-black text-red-600 tracking-tight">
                      {mockStudentData.parent.emergencyContact}
                    </p>
                    <p className="text-[10px] font-bold text-red-400/60 mt-3 italic uppercase">
                      Available 24/7 during school hours
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column - Brief Stats */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">
                  Medical Advisory
                </h4>
                <div className="flex gap-4 p-5 bg-amber-50 rounded-3xl border border-amber-100">
                  <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 shrink-0 shadow-sm shadow-amber-200/50">
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 9v2m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <p className="text-xs font-bold text-amber-700 leading-relaxed italic">
                    &ldquo;{mockStudentData.personal.medicalNotes}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Academics" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 bg-white p-8 rounded-4xl border border-gray-100 shadow-sm">
                <h3 className="text-sm font-black text-[#14B8A6] uppercase tracking-widest mb-8">
                  Subjects Enrolled
                </h3>
                <div className="space-y-4">
                  {mockStudentData.academics.subjects.map((subject, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-5 bg-gray-50 rounded-3xl group hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100"
                    >
                      <div className="flex items-center gap-5">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${subject.type === "Core" ? "bg-teal-50 text-teal-600" : "bg-purple-50 text-purple-600"}`}
                        >
                          {subject.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-gray-800">
                            {subject.name}
                          </p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase">
                            {subject.type} • {subject.teacher}
                          </p>
                        </div>
                      </div>
                      <button className="p-2.5 opacity-0 group-hover:opacity-100 transition-all bg-white rounded-xl text-gray-400 hover:text-[#14B8A6]">
                        <svg
                          width="20"
                          height="20"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M13 5l7 7-7 7M5 5l7 7-7 7"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                <div className="bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 text-center">
                    Class Teacher
                  </h4>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-teal-50 rounded-4xl mx-auto mb-4 flex items-center justify-center text-[#14B8A6] text-xl font-black">
                      SJ
                    </div>
                    <p className="font-black text-gray-800">
                      {mockStudentData.academics.classTeacher}
                    </p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">
                      Mathematics Dept
                    </p>
                  </div>
                </div>
                <div className="bg-indigo-50 p-8 rounded-[2.5rem] border border-indigo-100">
                  <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">
                    House / Group
                  </h4>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-indigo-100 rounded-3xl flex items-center justify-center text-2xl">
                      🔥
                    </div>
                    <div>
                      <p className="font-black text-indigo-900">
                        {mockStudentData.academics.house}
                      </p>
                      <p className="text-[10px] font-bold text-indigo-400 uppercase">
                        Sports & Activities
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Attendance" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="md:col-span-8 space-y-8">
              <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm min-h-120">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-[#14B8A6]" />
                      Attendance Calendar
                    </h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">
                      {attendanceView === "Month" 
                        ? `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(currentYear, currentMonth))} ${currentYear}`
                        : `Academic Year ${currentYear}`}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl">
                    <button
                      onClick={() => setAttendanceView("Month")}
                      className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${
                        attendanceView === "Month"
                          ? "bg-white text-[#14B8A6] shadow-sm"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      <LayoutGrid className="w-3 h-3" />
                      Monthly
                    </button>
                    <button
                      onClick={() => setAttendanceView("Year")}
                      className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${
                        attendanceView === "Year"
                          ? "bg-white text-[#14B8A6] shadow-sm"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      <CalendarDays className="w-3 h-3" />
                      Yearly
                    </button>
                  </div>
                </div>

                {attendanceView === "Month" ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-7 gap-1">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div key={day} className="text-[10px] font-black text-gray-400 uppercase text-center py-2">
                          {day}
                        </div>
                      ))}
                      {/* Empty cells for previous month padding */}
                      {Array.from({ length: new Date(currentYear, currentMonth, 1).getDay() }).map((_, i) => (
                        <div key={`empty-${i}`} className="aspect-square"></div>
                      ))}
                      {/* Days of current month */}
                      {Array.from({ length: new Date(currentYear, currentMonth + 1, 0).getDate() }).map((_, i) => {
                        const day = i + 1;
                        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const event = academicEvents.find(e => e.date === dateStr);
                        const isToday = day === 12 && currentMonth === 1 && currentYear === 2026;
                        
                        return (
                          <div
                            key={day}
                            className={`group relative aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-black transition-all cursor-pointer border ${
                              event 
                                ? event.type === "Holiday" 
                                  ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                                  : "bg-rose-50 text-rose-600 border-rose-100"
                                : isToday
                                  ? "bg-[#14B8A6] text-white border-[#14B8A6]"
                                  : day === 15 // Mocking an absence
                                    ? "bg-red-50 text-red-600 border-red-100"
                                    : "bg-gray-50 text-gray-400 hover:bg-gray-100 border-transparent hover:border-gray-200"
                            }`}
                          >
                            {day}
                            {event && (
                              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-current"></div>
                            )}
                            
                            {/* Simple tooltip on hover */}
                            {event && (
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-24 p-2 bg-gray-900 text-white text-[8px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 text-center">
                                {event.title}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-emerald-50 border border-emerald-100 rounded-md"></div>
                          <p className="text-[10px] font-bold text-gray-500 uppercase">Holiday</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-rose-50 border border-rose-100 rounded-md"></div>
                          <p className="text-[10px] font-bold text-gray-500 uppercase">Exam</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setCurrentMonth(prev => prev === 0 ? 11 : prev - 1)}
                          className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 transition-all"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setCurrentMonth(prev => prev === 11 ? 0 : prev + 1)}
                          className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 transition-all"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Yearly View - Mini Month Grids */
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-6">
                    {Array.from({ length: 12 }).map((_, mIdx) => (
                      <div key={mIdx} className="space-y-2">
                        <p className="text-[10px] font-black text-[#14B8A6] uppercase text-center">
                          {new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(currentYear, mIdx))}
                        </p>
                        <div className="grid grid-cols-7 gap-0.5">
                          {Array.from({ length: 30 }).map((_, dIdx) => {
                            const day = dIdx + 1;
                            const isHoliday = (mIdx === 1 && day === 25); // Simplified highlight for yearly view
                            return (
                              <div
                                key={dIdx}
                                className={`aspect-square rounded-xs ${
                                  isHoliday ? "bg-emerald-400" : "bg-gray-100"
                                }`}
                              ></div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="md:col-span-4 space-y-6">
              <div className="bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="w-3 h-3 text-emerald-500" />
                  <p className="text-[10px] font-black text-gray-400 uppercase">
                    Present Days
                  </p>
                </div>
                <p className="text-3xl font-black text-emerald-500">
                  22
                </p>
              </div>
              <div className="bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <UserX className="w-3 h-3 text-red-500" />
                  <p className="text-[10px] font-black text-gray-400 uppercase">
                    Absent Days
                  </p>
                </div>
                <p className="text-3xl font-black text-red-500">
                  1
                </p>
              </div>
              <div className="bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-3 h-3 text-amber-500" />
                  <p className="text-[10px] font-black text-gray-400 uppercase">
                    Late Entries
                  </p>
                </div>
                <p className="text-3xl font-black text-amber-500">
                  {mockStudentData.attendance.late}
                </p>
              </div>
              <div className="bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-2">
                  Half Days
                </p>
                <p className="text-3xl font-black text-blue-500">
                  {mockStudentData.attendance.halfDay}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Exams" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">
                      Recent Performance
                    </h3>
                    <button className="flex items-center gap-2 text-[#14B8A6] font-black text-[10px] uppercase border border-teal-100 px-4 py-2 rounded-xl hover:bg-teal-50 transition-all">
                      <svg
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Download (PDF)
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-y-3">
                      <thead>
                        <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          <th className="pb-4 px-4">Subject</th>
                          <th className="pb-4 px-4">Marks</th>
                          <th className="pb-4 px-4 text-center">Grade</th>
                          <th className="pb-4 px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockStudentData.exams.results.map((res, idx) => (
                          <tr
                            key={idx}
                            className="bg-gray-50/50 group hover:bg-white hover:shadow-md transition-all"
                          >
                            <td className="py-4 px-4 font-black text-gray-800 rounded-l-2xl">
                              {res.subject}
                            </td>
                            <td className="py-4 px-4 font-bold text-gray-500">
                              {res.marks}/{res.total}
                            </td>
                            <td className="py-4 px-4 text-center">
                              <span className="px-3 py-1 bg-white border border-gray-100 rounded-lg font-black text-[#14B8A6]">
                                {res.grade}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right rounded-r-2xl">
                              <button className="text-[10px] font-black text-gray-400 hover:text-orange-500 uppercase tracking-tighter">
                                Recheck
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <div className="bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">
                    Next Exam
                  </h4>
                  <div className="space-y-4">
                    {mockStudentData.exams.upcoming.map((ex, i) => (
                      <div
                        key={i}
                        className="p-4 bg-orange-50 border border-orange-100 rounded-2xl"
                      >
                        <p className="text-xs font-black text-orange-900">
                          {ex.subject}
                        </p>
                        <p className="text-[10px] font-bold text-orange-400 mt-1">
                          {ex.date}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Health" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm">
                  <h3 className="text-sm font-black text-red-500 uppercase tracking-widest mb-8 flex items-center gap-3">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Medical History & Profile
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 bg-red-50/30 rounded-3xl border border-red-50">
                      <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-2">
                        Allergies & Alerts
                      </p>
                      <p className="text-sm font-black text-red-700">
                        {mockStudentData.personal.medicalNotes}
                      </p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                        Blood Group
                      </p>
                      <p className="text-sm font-black text-gray-800">
                        {mockStudentData.personal.bloodGroup}
                      </p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                        Height / Weight
                      </p>
                      <p className="text-sm font-black text-gray-800">
                        154 cm / 48 kg
                      </p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                        Vaccination Status
                      </p>
                      <span className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                        Up to Date
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <div className="bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">
                    Hostel & Transport
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                      <span className="text-[10px] font-black uppercase text-gray-400">
                        Transport
                      </span>
                      <span className="text-xs font-black text-emerald-600">
                        Bus Route #14
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                      <span className="text-[10px] font-black uppercase text-gray-400">
                        Hostel
                      </span>
                      <span className="text-xs font-black text-gray-600">
                        Day Scholar
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Access" && (
          <div className="max-w-xl mx-auto py-10 animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-white p-10 rounded-5xl border border-gray-100 shadow-2xl text-center space-y-8">
              <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-500 mx-auto">
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
                    strokeWidth="2.5"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-11V7a4 4 0 10-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                  Portal Access
                </h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">
                  Manage student and guardian credentials
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-gray-50 rounded-3xl flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-[10px] font-black text-gray-400 uppercase">
                      Student Username
                    </p>
                    <p className="text-sm font-black text-gray-800">
                      john.doe.24
                    </p>
                  </div>
                  <button className="text-[10px] font-black text-emerald-600 uppercase underline decoration-2 underline-offset-4">
                    Reset Password
                  </button>
                </div>
                <div className="p-6 bg-gray-50 rounded-3xl flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-[10px] font-black text-gray-400 uppercase">
                      Parent Portal
                    </p>
                    <p className="text-sm font-black text-gray-800">
                      richard.doe.p
                    </p>
                  </div>
                  <button className="text-[10px] font-black text-emerald-600 uppercase underline decoration-2 underline-offset-4">
                    Reset Password
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-50 flex gap-4">
                <button className="flex-1 py-4 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">
                  Deactivate Access
                </button>
                <button className="flex-1 py-4 bg-emerald-50 text-emerald-600 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 hover:bg-emerald-100">
                  Sync Data
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Fees" && (
          <div className="relative">
            {/* Restricted Overlay Example */}
            <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm blur-[2px] pointer-events-none opacity-40">
              {/* Mock Fees Content */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="h-24 bg-gray-50 rounded-3xl"></div>
                <div className="h-24 bg-gray-50 rounded-3xl"></div>
                <div className="h-24 bg-gray-50 rounded-3xl"></div>
              </div>
              <div className="space-y-4">
                <div className="h-12 bg-gray-50 rounded-2xl w-full"></div>
                <div className="h-12 bg-gray-50 rounded-2xl w-3/4"></div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-2xl text-center max-w-sm mx-4">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm10-11V7a4 4 0 1 0-8 0v4h8z"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-gray-800 mb-3">
                  Restricted View
                </h3>
                <p className="text-sm font-bold text-gray-500 mb-8 leading-relaxed">
                  Financial records are only visible to Accounts, Admins, and
                  Parents.
                </p>
                <Link
                  href="/dashboard/finance/student/ST-2001"
                  className="w-full bg-[#14B8A6] text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-teal-500/20 hover:scale-[1.02] transition-all text-center block"
                >
                  Go to Financial Portal
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;
