"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";

const StaffDetails = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const [activeTab, setActiveTab] = React.useState("overview");

  // Mock data for the detailed view
  const staffData = {
    id: id,
    name: "Sarah Johnson",
    role: "Mathematics Teacher",
    department: "Science & Mathematics",
    email: "sarah.j@school.com",
    contact: "+1 234 567 8901",
    status: "Active",
    joiningDate: "August 15, 2021",
    gender: "Female",
    dob: "May 12, 1988",
    address: "123 Education Lane, Learning City, ED 12345",
    qualification: "M.Sc Mathematics, B.Ed",
    experience: "8 Years",
    bloodGroup: "O+",
    emergencyContact: "+1 234 567 0000",
    skills: ["Algebra", "Calculus", "Class Management", "Student Mentoring"],
    employeeCode: "EMP-2021-042",
    designation: "Senior Teacher",
    employmentType: "Permanent",
    workShift: "08:00 AM - 03:00 PM",
    reportingManager: "Dr. Robert Wilson",
    roleSpecific: {
      subjects: ["Advanced Algebra", "Calculus I", "Geometry"],
      classes: ["Grade 10-A", "Grade 11-B", "Grade 12-A"],
      weeklyWorkload: "22 Hours",
    },
    attendance: {
      status: "Present",
      monthlyPercentage: 96.5,
      leaves: {
        sick: 2,
        casual: 3,
        unpaid: 0,
      },
    },
    payroll: {
      baseSalary: "$4,500",
      bankName: "Global City Bank",
      accountNo: "**** **** 8829",
      restricted: true,
    },
    documents: [
      { name: "National ID Proof", type: "PDF", date: "Aug 12, 2021" },
      { name: "Academic Certificates", type: "ZIP", date: "Aug 12, 2021" },
      { name: "Contract Agreement", type: "PDF", date: "Sep 01, 2021" },
    ],
    permissions: [
      { module: "Student Management", access: "View & Edit" },
      { module: "Exam Records", access: "Approval Authority" },
      { module: "Financials", access: "No Access" },
      { module: "HR Analytics", access: "Read Only" },
      { module: "Inventory/Labs", access: "Manage" },
      { module: "Announcements", access: "Broadcast" },
      { module: "Library", access: "View Only" },
    ],
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "personal", label: "Personal" },
    { id: "work", label: "Work Details" },
    { id: "permissions", label: "Permissions" },
    { id: "documents", label: "Documents" },
    { id: "security", label: "Security" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Top Navigation & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-400 hover:text-gray-600"
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
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Staff Profile</h2>
            <p className="text-xs text-gray-500">
              Employee ID: #STF-{staffData.id}
            </p>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="p-2.5 bg-teal-50 text-[#14B8A6] rounded-xl hover:bg-teal-100 transition-colors">
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
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </button>
          <button className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
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
                d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </button>
          <button className="p-2.5 bg-orange-50 text-orange-600 rounded-xl hover:bg-orange-100 transition-colors">
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </button>
          <div className="w-px h-8 bg-gray-100 mx-1 hidden sm:block"></div>
          <button className="flex-1 sm:flex-none px-4 py-2 bg-[#14B8A6] text-white rounded-xl text-sm font-bold hover:bg-[#0D9488] transition-all shadow-lg shadow-teal-500/20">
            Edit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Essential Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  staffData.status === "Active"
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {staffData.status}
              </span>
            </div>

            <div className="relative w-28 h-28 mb-4 mt-2">
              <div className="w-full h-full rounded-4xl bg-linear-to-br from-teal-50 to-white flex items-center justify-center text-[#14B8A6] text-3xl font-black border-4 border-white shadow-xl ring-1 ring-gray-100">
                {staffData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            </div>

            <h3 className="text-xl font-black text-gray-800 uppercase tracking-tight">
              {staffData.name}
            </h3>
            <p className="text-sm text-gray-400 font-bold mb-1">
              ID: {staffData.employeeCode}
            </p>
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 bg-[#14B8A6]/10 text-[#14B8A6] rounded-lg text-[10px] font-black uppercase">
                {staffData.role}
              </span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span className="text-[10px] text-gray-400 font-bold uppercase">
                {staffData.department}
              </span>
            </div>

            <div className="w-full grid grid-cols-2 gap-4 pt-6 border-t border-gray-50">
              <div className="text-left">
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1 leading-none">
                  Shift
                </p>
                <p className="text-xs text-gray-700 font-bold">
                  {staffData.workShift}
                </p>
              </div>
              <div className="text-left">
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1 leading-none">
                  Attendance
                </p>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-xs text-gray-700 font-bold">
                    {staffData.attendance.status}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h4 className="font-black text-gray-800 mb-6 text-xs uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#14B8A6] rounded-full"></span>
              Performance & Stats
            </h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[10px] font-bold uppercase mb-1.5">
                  <span className="text-gray-400">Monthly Attendance</span>
                  <span className="text-[#14B8A6]">
                    {staffData.attendance.monthlyPercentage}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#14B8A6] rounded-full"
                    style={{
                      width: `${staffData.attendance.monthlyPercentage}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="bg-orange-50 p-3 rounded-2xl text-center">
                  <p className="text-[10px] text-orange-400 font-bold uppercase mb-1">
                    Leaves
                  </p>
                  <p className="text-sm font-black text-orange-600">
                    {staffData.attendance.leaves.sick +
                      staffData.attendance.leaves.casual}
                  </p>
                </div>
                <div className="bg-teal-50 p-3 rounded-2xl text-center">
                  <p className="text-[10px] text-teal-400 font-bold uppercase mb-1">
                    Workload
                  </p>
                  <p className="text-sm font-black text-[#14B8A6]">22h</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-2xl text-center">
                  <p className="text-[10px] text-blue-400 font-bold uppercase mb-1">
                    Rating
                  </p>
                  <p className="text-sm font-black text-blue-600">4.8</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Tabs & Details */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-150">
            {/* Scrollable Tabs Wrapper */}
            <div className="overflow-x-auto no-scrollbar border-b border-gray-50 bg-[#F8FAFC]">
              <div className="flex px-4 whitespace-nowrap">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-6 text-xs font-black uppercase tracking-widest transition-all relative ${
                      activeTab === tab.id
                        ? "text-[#14B8A6]"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#14B8A6]"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-8">
              {activeTab === "overview" && (
                <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                  <section>
                    <h5 className="text-[#14B8A6] font-black text-[10px] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                      Role Specific Information
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gray-50 p-4 rounded-2xl">
                        <label className="text-[10px] text-gray-400 font-bold uppercase block mb-1">
                          Subjects
                        </label>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {staffData.roleSpecific.subjects.map((s, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-white border border-gray-100 rounded-lg text-[10px] font-bold text-gray-600 uppercase"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-2xl">
                        <label className="text-[10px] text-gray-400 font-bold uppercase block mb-1">
                          Assigned Classes
                        </label>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {staffData.roleSpecific.classes.map((c, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-white border border-gray-100 rounded-lg text-[10px] font-bold text-gray-600 uppercase"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-2xl">
                        <label className="text-[10px] text-gray-400 font-bold uppercase block mb-1">
                          Weekly Workload
                        </label>
                        <p className="text-sm text-gray-700 font-black mt-1 uppercase">
                          {staffData.roleSpecific.weeklyWorkload}
                        </p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h5 className="text-[#14B8A6] font-black text-[10px] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                      Access & Permissions
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {staffData.permissions.map((p, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-4 border border-gray-50 rounded-2xl hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-xs font-bold text-gray-700 uppercase">
                            {p.module}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase ${
                              p.access.includes("Write") ||
                              p.access.includes("Authority")
                                ? "bg-teal-50 text-[#14B8A6]"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {p.access}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {activeTab === "personal" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 animate-in slide-in-from-right-4 duration-500">
                  <div className="space-y-6">
                    <h6 className="text-[10px] font-black uppercase tracking-widest text-[#14B8A6]">
                      Basic Info
                    </h6>
                    <div className="space-y-4">
                      <div className="flex justify-between border-b border-gray-50 pb-2">
                        <span className="text-xs text-gray-400 font-bold uppercase">
                          Full Name
                        </span>
                        <span className="text-xs text-gray-700 font-black uppercase">
                          {staffData.name}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-gray-50 pb-2">
                        <span className="text-xs text-gray-400 font-bold uppercase">
                          Gender
                        </span>
                        <span className="text-xs text-gray-700 font-black uppercase">
                          {staffData.gender}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-gray-50 pb-2">
                        <span className="text-xs text-gray-400 font-bold uppercase">
                          DOB
                        </span>
                        <span className="text-xs text-gray-700 font-black uppercase">
                          {staffData.dob}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-gray-50 pb-2">
                        <span className="text-xs text-gray-400 font-bold uppercase">
                          Blood Group
                        </span>
                        <span className="text-xs text-gray-700 font-black uppercase">
                          {staffData.bloodGroup}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h6 className="text-[10px] font-black uppercase tracking-widest text-[#14B8A6]">
                      Contact Info
                    </h6>
                    <div className="space-y-4">
                      <div className="flex justify-between border-b border-gray-50 pb-2">
                        <span className="text-xs text-gray-400 font-bold uppercase">
                          Phone
                        </span>
                        <span className="text-xs text-gray-700 font-black uppercase">
                          {staffData.contact}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-gray-50 pb-2">
                        <span className="text-xs text-gray-400 font-bold uppercase">
                          Email
                        </span>
                        <span className="text-xs text-gray-700 font-black lowercase">
                          {staffData.email}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-gray-50 pb-2">
                        <span className="text-xs text-gray-400 font-bold uppercase">
                          Emergency
                        </span>
                        <span className="text-xs text-gray-700 font-black uppercase">
                          {staffData.emergencyContact}
                        </span>
                      </div>
                      <div className="pt-2">
                        <span className="text-[10px] text-gray-400 font-bold uppercase block mb-1">
                          Residence
                        </span>
                        <p className="text-xs text-gray-700 font-bold leading-relaxed">
                          {staffData.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "work" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in slide-in-from-right-4 duration-500">
                  <div className="space-y-6">
                    <h6 className="text-[10px] font-black uppercase tracking-widest text-[#14B8A6]">
                      Organization Details
                    </h6>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-2xl">
                        <label className="text-[9px] text-gray-400 font-bold uppercase block mb-1">
                          Employee Code
                        </label>
                        <span className="text-sm text-gray-800 font-black uppercase">
                          {staffData.employeeCode}
                        </span>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-2xl">
                        <label className="text-[9px] text-gray-400 font-bold uppercase block mb-1">
                          Designation
                        </label>
                        <span className="text-sm text-gray-800 font-black uppercase">
                          {staffData.designation}
                        </span>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-2xl">
                        <label className="text-[9px] text-gray-400 font-bold uppercase block mb-1">
                          Department
                        </label>
                        <span className="text-sm text-gray-800 font-black uppercase">
                          {staffData.department}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h6 className="text-[10px] font-black uppercase tracking-widest text-[#14B8A6]">
                      Contractual Info
                    </h6>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-2xl">
                          <label className="text-[9px] text-gray-400 font-bold uppercase block mb-1">
                            Joining Date
                          </label>
                          <span className="text-[11px] text-gray-800 font-black uppercase">
                            {staffData.joiningDate}
                          </span>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-2xl">
                          <label className="text-[9px] text-gray-400 font-bold uppercase block mb-1">
                            Type
                          </label>
                          <span className="text-[11px] text-gray-800 font-black uppercase">
                            {staffData.employmentType}
                          </span>
                        </div>
                      </div>
                      <div className="bg-teal-50/30 p-4 rounded-2xl border border-teal-50">
                        <label className="text-[9px] text-[#14B8A6] font-bold uppercase block mb-1">
                          Reporting Manager
                        </label>
                        <span className="text-sm text-gray-800 font-black uppercase">
                          {staffData.reportingManager}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "permissions" && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                  <div className="bg-gray-900 p-6 rounded-3xl text-white flex items-center justify-between shadow-xl mb-8">
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-tight">
                        Active Permissions
                      </h4>
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">
                        Role-Based Access Control State
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-[#14B8A6]">
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
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {staffData.permissions.map((p, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-5 border border-gray-100 rounded-3xl hover:bg-gray-50 transition-all"
                      >
                        <div className="flex flex-col">
                          <span className="text-[10px] text-gray-400 font-black uppercase mb-1">
                            {p.module}
                          </span>
                          <span className="text-xs font-black text-gray-800 uppercase italic">
                            {p.access}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map((dot, idx) => (
                            <div
                              key={idx}
                              className={`w-1.5 h-1.5 rounded-full ${idx < (p.access === "Read Only" ? 1 : 3) ? "bg-emerald-500" : "bg-gray-200"}`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="flex flex-col items-center justify-center py-10 animate-in fade-in duration-700">
                  <div className="w-full max-w-md space-y-6">
                    <div className="p-8 bg-white border border-gray-100 rounded-4xl shadow-sm space-y-6">
                      <div className="flex items-center gap-4 border-b border-gray-50 pb-6">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-[#14B8A6]">
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
                              d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 003 20c0-2.554 1.442-4.76 3.546-5.859m15.19 2.974a.613.613 0 010 .832c-.206.21-.546.21-.716 0l-1.411-1.411a.613.613 0 010-.832c.206-.21.547-.21.716 0l1.411 1.411z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            Username
                          </p>
                          <p className="text-sm font-black text-gray-800 uppercase italic">
                            sarah_j_2026
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            Status
                          </span>
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-black uppercase tracking-widest">
                            Active
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            Two-Factor
                          </span>
                          <div className="w-8 h-4 bg-emerald-500 rounded-full p-0.5">
                            <div className="w-3 h-3 bg-white rounded-full ml-auto" />
                          </div>
                        </div>
                      </div>
                      <button className="w-full py-4 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">
                        Reset Password
                      </button>
                    </div>
                    <div className="p-6 bg-red-50 border border-red-100 rounded-3xl flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-500 shadow-sm border border-red-50">
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-black text-red-900 uppercase">
                          Suspend Account
                        </p>
                        <p className="text-[9px] font-bold text-red-500/60 uppercase">
                          Disable all system access
                        </p>
                      </div>
                      <button className="text-[10px] font-black text-red-600 uppercase tracking-widest underline decoration-2 underline-offset-4">
                        Execute
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "documents" && (
                <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                  {staffData.documents.map((doc, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 border border-gray-50 rounded-3xl hover:border-[#14B8A6]/20 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xs ${
                            doc.type === "PDF"
                              ? "bg-red-50 text-red-500"
                              : "bg-blue-50 text-blue-500"
                          }`}
                        >
                          {doc.type}
                        </div>
                        <div>
                          <p className="text-sm font-black text-gray-700 uppercase">
                            {doc.name}
                          </p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                            Uploaded on {doc.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2.5 text-gray-400 hover:text-[#14B8A6] hover:bg-teal-50 rounded-xl transition-all">
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
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                        <button className="p-2.5 text-gray-400 hover:text-[#14B8A6] hover:bg-teal-50 rounded-xl transition-all">
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
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4v-12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-6 mt-4 border-2 border-dashed border-gray-100 rounded-3xl text-gray-400 hover:border-[#14B8A6]/30 hover:text-[#14B8A6] transition-all flex flex-col items-center gap-2 group">
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      className="group-hover:scale-110 transition-transform"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                      Upload New Document
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDetails;
