"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ChevronLeft,
  Save,
  Send,
  CheckCircle2,
  FileUp,
  AlertCircle,
  Users,
  BookOpen,
  Search,
  MoreVertical,
  Check,
  X,
  Lock,
  Download,
  Filter,
  ArrowRight,
  Plus,
} from "lucide-react";

type EntryStatus = "Not Entered" | "Draft" | "Submitted" | "Locked";

interface StudentMark {
  id: string;
  name: string;
  rollNo: string;
  marks: number | "";
  maxMarks: number;
  grade: string;
  remarks: string;
  status: EntryStatus;
}

type TabType = "subject" | "marks" | "upload" | "validation" | "publish";

const MarksEntryForm = () => {
  const router = useRouter();
  const params = useParams();

  const [activeTab, setActiveTab] = useState<TabType>("subject");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [searchQuery, setSearchQuery] = useState("");

  const [marks, setMarks] = useState<StudentMark[]>([
    {
      id: "1",
      name: "Amelia Earhart",
      rollNo: "101",
      marks: 85,
      maxMarks: 100,
      grade: "A",
      remarks: "Excellent",
      status: "Submitted",
    },
    {
      id: "2",
      name: "Buzz Aldrin",
      rollNo: "102",
      marks: 72,
      maxMarks: 100,
      grade: "B",
      remarks: "",
      status: "Draft",
    },
    {
      id: "3",
      name: "Charles Darwin",
      rollNo: "103",
      marks: "",
      maxMarks: 100,
      grade: "-",
      remarks: "",
      status: "Not Entered",
    },
    {
      id: "4",
      name: "Dorothy Vaughan",
      rollNo: "104",
      marks: 98,
      maxMarks: 100,
      grade: "A+",
      remarks: "Outstanding performance",
      status: "Submitted",
    },
    {
      id: "5",
      name: "Enrico Fermi",
      rollNo: "105",
      marks: 45,
      maxMarks: 100,
      grade: "C",
      remarks: "Needs improvement",
      status: "Draft",
    },
  ]);

  const handleMarkChange = (id: string, value: string) => {
    setMarks((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, marks: value === "" ? "" : Number(value), status: "Draft" }
          : m,
      ),
    );
  };

  const handleBack = () => {
    router.back();
  };

  const getStatusColor = (status: EntryStatus) => {
    switch (status) {
      case "Locked":
        return "bg-gray-100 text-gray-500 border-gray-200";
      case "Submitted":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "Draft":
        return "bg-amber-50 text-amber-600 border-amber-100";
      default:
        return "bg-red-50 text-red-400 border-red-100";
    }
  };

  const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: "subject", label: "Subject", icon: BookOpen },
    { id: "marks", label: "Marks Entry", icon: Users },
    { id: "upload", label: "Bulk Upload", icon: FileUp },
    { id: "validation", label: "Validation", icon: CheckCircle2 },
    { id: "publish", label: "Publish", icon: Send },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-24">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-2.5 hover:bg-gray-50 rounded-2xl transition-colors text-gray-400 hover:text-[#14B8A6]"
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#14B8A6] uppercase tracking-widest mb-1">
                <span>Academic</span>
                <span className="text-gray-300">/</span>
                <span>Final Exam 2025</span>
                <span className="text-gray-300">/</span>
                <span className="text-gray-500 underline underline-offset-4 decoration-2">
                  Marks Entry
                </span>
              </div>
              <h1 className="text-2xl font-black text-gray-900">
                Exam Marks Entry
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex-1 md:flex-none px-5 py-2.5 bg-gray-50 text-gray-600 rounded-xl text-sm font-bold border border-gray-100 hover:bg-gray-100 transition-all">
              Save Draft
            </button>
            <button className="flex-1 md:flex-none px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold shadow-lg shadow-gray-200 hover:bg-black transition-all flex items-center justify-center gap-2">
              <Check size={18} />
              Submit Marks
            </button>
          </div>
        </div>

        {/* Context Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-50">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Selected Class
            </p>
            <p className="text-sm font-bold text-gray-700">
              Grade 10 - Section A
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Entry Progress
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#14B8A6]">85%</span>
              <div className="flex-1 h-1.5 bg-gray-50 rounded-full overflow-hidden max-w-25">
                <div className="h-full bg-[#14B8A6]" style={{ width: "85%" }} />
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Examiner
            </p>
            <p className="text-sm font-bold text-gray-700">Ms. Sarah Wilson</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Submission Deadline
            </p>
            <p className="text-sm font-bold text-red-500">Feb 15, 2026</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl whitespace-nowrap transition-all border ${
              activeTab === tab.id
                ? "bg-[#14B8A6] text-white border-[#14B8A6] shadow-md shadow-teal-500/20"
                : "bg-white text-gray-500 border-gray-100 hover:border-[#14B8A6]/30"
            }`}
          >
            <tab.icon size={18} />
            <span className="text-sm font-bold">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm min-h-125">
        {activeTab === "subject" && (
          <div className="p-8 animate-in fade-in duration-500">
            <div className="max-w-md mx-auto space-y-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-teal-50 rounded-3xl flex items-center justify-center text-[#14B8A6] mx-auto mb-4 border-2 border-white shadow-sm">
                  <BookOpen size={36} strokeWidth={2.5} />
                </div>
                <h2 className="text-xl font-black text-gray-900">
                  Select Subject
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Configure which subjects marks you are entering
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Academic Year
                  </label>
                  <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-700 focus:ring-2 focus:ring-[#14B8A6]/20 appearance-none">
                    <option>2025-2026 (Current)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Class & Section
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-700 focus:ring-2 focus:ring-[#14B8A6]/20">
                      <option>Grade 10</option>
                      <option>Grade 9</option>
                    </select>
                    <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-700 focus:ring-2 focus:ring-[#14B8A6]/20">
                      <option>Section A</option>
                      <option>Section B</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Subject
                  </label>
                  <div className="space-y-3">
                    {["Mathematics", "Physics", "Chemistry", "English"].map(
                      (sub) => (
                        <label
                          key={sub}
                          className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${selectedSubject === sub ? "border-[#14B8A6] bg-teal-50/30" : "border-gray-100 hover:border-[#14B8A6]/30"}`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="subject"
                              className="hidden"
                              checked={selectedSubject === sub}
                              onChange={() => setSelectedSubject(sub)}
                            />
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${selectedSubject === sub ? "bg-[#14B8A6] text-white" : "bg-gray-100 text-gray-400"}`}
                            >
                              <BookOpen size={18} />
                            </div>
                            <div>
                              <p
                                className={`text-sm font-bold transition-colors ${selectedSubject === sub ? "text-gray-900" : "text-gray-600"}`}
                              >
                                {sub}
                              </p>
                              <p className="text-[10px] text-gray-400 font-medium tracking-tight">
                                Status:{" "}
                                {sub === "Mathematics"
                                  ? "Started"
                                  : "Not Started"}
                              </p>
                            </div>
                          </div>
                          {selectedSubject === sub && (
                            <CheckCircle2
                              size={20}
                              className="text-[#14B8A6]"
                            />
                          )}
                        </label>
                      ),
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab("marks")}
                  className="w-full py-4 bg-[#14B8A6] text-white rounded-2xl font-black shadow-lg shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  Start Marks Entry
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "marks" && (
          <div className="animate-in fade-in duration-500">
            <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-gray-900 flex items-center gap-3">
                  {selectedSubject} Marks Entry
                  <span className="px-3 py-1 bg-teal-50 text-[#14B8A6] rounded-lg text-[10px] uppercase font-black">
                    Grade 10A
                  </span>
                </h2>
                <p className="text-sm text-gray-400">
                  Total 45 students enrolled for this exam
                </p>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search student or roll no..."
                  className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#14B8A6]/20 w-full md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Roll No
                    </th>
                    <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Student Name
                    </th>
                    <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Marks Obtained
                    </th>
                    <th className="px-6 py-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest w-24">
                      Max Marks
                    </th>
                    <th className="px-6 py-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest w-24">
                      Grade
                    </th>
                    <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Remarks
                    </th>
                    <th className="px-6 py-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {marks.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-gray-50/30 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <span className="text-sm font-black text-[#14B8A6] bg-teal-50 px-2 py-1 rounded-lg">
                          #{student.rollNo}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 border border-white flex items-center justify-center text-xs font-bold text-gray-500 uppercase tracking-tighter">
                            {student.name.charAt(0)}
                          </div>
                          <span className="text-sm font-bold text-gray-700">
                            {student.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative max-w-25">
                          <input
                            type="number"
                            value={student.marks}
                            onChange={(e) =>
                              handleMarkChange(student.id, e.target.value)
                            }
                            className={`w-full p-2.5 bg-white border rounded-xl text-center text-sm font-black focus:outline-none transition-all ${
                              student.marks === ""
                                ? "border-red-100 bg-red-50/20"
                                : "border-gray-100 focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6]"
                            }`}
                            placeholder="00"
                            max={student.maxMarks}
                          />
                          {student.marks !== "" &&
                            Number(student.marks) > student.maxMarks && (
                              <div className="absolute -top-1 -right-1 bg-red-500 text-white p-0.5 rounded-full ring-2 ring-white">
                                <AlertCircle size={10} />
                              </div>
                            )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-xs font-bold text-gray-400">
                          / {student.maxMarks}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-xs font-black border ${student.marks !== "" ? "bg-white border-teal-50 text-[#14B8A6]" : "bg-gray-50 border-gray-100 text-gray-300"}`}
                        >
                          {student.grade}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={student.remarks}
                          placeholder="Optional note..."
                          className="w-full text-xs text-gray-500 bg-transparent border-none focus:ring-0 focus:outline-none placeholder:text-gray-200"
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${getStatusColor(student.status)}`}
                        >
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 border-t border-gray-50 bg-gray-50/10 flex justify-center">
              <button className="text-sm font-bold text-[#14B8A6] hover:underline flex items-center gap-2">
                <Plus size={16} /> Load More Students
              </button>
            </div>
          </div>
        )}

        {activeTab === "upload" && (
          <div className="p-12 animate-in fade-in duration-500 text-center">
            <div className="max-w-xl mx-auto space-y-8">
              <div className="p-12 border-4 border-dashed border-gray-100 rounded-[40px] bg-gray-50/30 hover:bg-gray-50 hover:border-[#14B8A6]/20 transition-all cursor-pointer group">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-[#14B8A6] mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <FileUp size={32} />
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-2">
                  Upload Marks Template
                </h3>
                <p className="text-sm text-gray-400 mb-8 px-8 leading-relaxed">
                  Download the template, fill student marks and upload the file.
                  We support CSV and XLSX formats.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-6 py-3 bg-white text-[#14B8A6] border border-[#14B8A6]/20 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-teal-50 transition-all">
                    <Download size={18} />
                    Download Template
                  </button>
                  <button className="px-8 py-3 bg-[#14B8A6] text-white rounded-2xl text-sm font-bold shadow-lg shadow-teal-500/10 flex items-center justify-center gap-2 hover:bg-[#0D9488] transition-all">
                    <FileUp size={18} />
                    Upload File
                  </button>
                </div>
              </div>

              <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 text-left flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-blue-900 mb-1">
                    Important Instruction
                  </h4>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Please do not change the Roll No or ID column in the
                    template. If marks already exist, they will be overwritten
                    by the new data from the uploaded file.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "validation" && (
          <div className="p-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-lg font-black text-gray-900">
                  Result Distribution
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      label: "A+ Grade",
                      count: 8,
                      color: "bg-[#14B8A6]",
                      percent: "18%",
                    },
                    {
                      label: "A Grade",
                      count: 12,
                      color: "bg-[#14B8A6]/80",
                      percent: "27%",
                    },
                    {
                      label: "B Grade",
                      count: 15,
                      color: "bg-[#14B8A6]/60",
                      percent: "33%",
                    },
                    {
                      label: "C Grade",
                      count: 6,
                      color: "bg-amber-400",
                      percent: "13%",
                    },
                    {
                      label: "Failing",
                      count: 4,
                      color: "bg-red-400",
                      percent: "9%",
                    },
                  ].map((item) => (
                    <div key={item.label} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-gray-600">
                          {item.label}
                        </span>
                        <span className="font-black text-gray-900">
                          {item.count} students ({item.percent})
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color}`}
                          style={{ width: item.percent }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-black text-gray-900">
                  Data Integrity Checks
                </h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-green-50 border border-green-100 flex items-center gap-4">
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-green-600 shadow-sm border border-green-50">
                      <Check size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-green-900">
                        All marks within range
                      </p>
                      <p className="text-[11px] text-green-700">
                        No entries exceed max marks of 100.
                      </p>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 flex items-center gap-4">
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-amber-600 shadow-sm border border-amber-50">
                      <AlertCircle size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-amber-900">
                        Missing entries found
                      </p>
                      <p className="text-[11px] text-amber-700">
                        5 students have no marks entered yet.
                      </p>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-gray-100 flex items-center gap-4">
                    <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100">
                      <Lock size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-700">
                        Statistical anomalies
                      </p>
                      <p className="text-[11px] text-gray-400">
                        Class average is consistent with last year.
                      </p>
                    </div>
                  </div>
                </div>
                <button className="w-full py-4 bg-gray-900 text-white rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-black transition-all">
                  <CheckCircle2 size={18} />
                  Run Final Validation
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "publish" && (
          <div className="p-8 animate-in fade-in duration-500 text-center h-full flex flex-col items-center justify-center">
            <div className="max-w-md w-full space-y-8">
              <div className="relative">
                <div className="w-24 h-24 bg-teal-50 rounded-[40px] flex items-center justify-center text-[#14B8A6] mx-auto relative z-10 animate-bounce cursor-default">
                  <Send size={40} />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-teal-400/10 rounded-full animate-pulse z-0" />
              </div>

              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">
                  Publish Results
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Publishing will make marks visible to students and parents on
                  their portals.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-4xl border border-gray-100 text-left space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-bold text-gray-700">
                    Notify Students via Push
                  </span>
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-[#14B8A6]"
                    defaultChecked
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-bold text-gray-700">
                    Notify Parents via SMS
                  </span>
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-[#14B8A6]"
                    defaultChecked
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-bold text-gray-700">
                    Enable Re-evaluation Link
                  </span>
                  <input type="checkbox" className="w-5 h-5 accent-[#14B8A6]" />
                </label>
              </div>

              <div className="flex flex-col gap-3">
                <button className="w-full py-4 bg-[#14B8A6] text-white rounded-2xl font-black shadow-xl shadow-teal-500/20 hover:bg-[#0D9488] transition-all flex items-center justify-center gap-2">
                  <Send size={20} />
                  Publish Now
                </button>
                <button className="w-full py-4 bg-white text-gray-500 border border-gray-100 rounded-2xl text-sm font-bold hover:bg-gray-50 transition-all">
                  Schedule for Later
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Bar - Mobile Only */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-gray-900/90 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between shadow-2xl md:hidden z-50">
        <div className="flex gap-4">
          <button className="p-2 text-white/50 hover:text-white transition-colors">
            <Filter size={20} />
          </button>
          <button className="p-2 text-white/50 hover:text-white transition-colors">
            <Download size={20} />
          </button>
        </div>
        <button className="px-6 py-2 bg-[#14B8A6] text-white rounded-xl text-sm font-bold shadow-lg shadow-teal-500/20">
          {activeTab === "publish" ? "Publish All" : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default MarksEntryForm;
