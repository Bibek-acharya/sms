"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Save,
  X,
  Plus,
  Trash2,
  ClipboardList,
  Calendar,
  Users,
  Settings,
  Clock,
  MapPin,
  ShieldCheck,
  FileText,
  CreditCard,
  Copy,
} from "lucide-react";

type FormSection =
  | "basic"
  | "schedule"
  | "subjects"
  | "settings"
  | "additional";

const CreateExamForm = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<FormSection>("basic");

  const handleBack = () => {
    router.back();
  };

  const steps: { id: FormSection; label: string; icon: React.ElementType }[] = [
    { id: "basic", label: "Basic Info", icon: ClipboardList },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "subjects", label: "Subjects & Students", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "additional", label: "Additional", icon: Plus },
  ];

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <span
              className="hover:text-[#14B8A6] cursor-pointer"
              onClick={() => router.push("/dashboard/exams")}
            >
              Exams
            </span>
            <span>/</span>
            <span className="text-gray-900 font-medium">Create New</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Exam</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <X size={18} />
            <span className="hidden sm:inline">Cancel</span>
          </button>
          <button className="px-6 py-2 bg-[#14B8A6] text-white rounded-xl shadow-lg shadow-teal-100 hover:bg-[#0D9488] transition-all flex items-center gap-2">
            <Save size={18} />
            <span>Save Exam</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto pb-2 mb-6 gap-2 no-scrollbar">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => setActiveStep(step.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl whitespace-nowrap transition-all ${
              activeStep === step.id
                ? "bg-[#14B8A6] text-white shadow-md"
                : "bg-white text-gray-500 border border-gray-100 hover:border-[#14B8A6]/30"
            }`}
          >
            <step.icon size={18} />
            <span className="font-medium">{step.label}</span>
          </button>
        ))}
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 min-h-[500px]">
        {activeStep === "basic" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Exam Basic Information
              </h2>
              <button className="text-sm text-[#14B8A6] font-medium flex items-center gap-1 hover:underline">
                <Copy size={16} />
                Duplicate Existing Exam
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Exam Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mid-Term Exam 2026"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Exam Type <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all appearance-none bg-white">
                  <option>Final</option>
                  <option>Terminal</option>
                  <option>Unit Test</option>
                  <option>Practical</option>
                  <option>Entrance</option>
                  <option>Re-Exam</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Academic Year <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all appearance-none bg-white">
                  <option>2025-2026</option>
                  <option>2026-2027</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Class / Grade <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all appearance-none bg-white">
                  <option>Grade 8</option>
                  <option>Grade 9</option>
                  <option>Grade 10</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Status
                </label>
                <div className="flex flex-wrap gap-3 pt-1">
                  {["Draft", "Scheduled", "Published"].map((status) => (
                    <label
                      key={status}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="examStatus"
                        className="hidden peer"
                        defaultChecked={status === "Draft"}
                      />
                      <div className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 peer-checked:bg-[#14B8A6]/10 peer-checked:border-[#14B8A6] peer-checked:text-[#14B8A6] transition-all group-hover:bg-gray-50 uppercase text-xs font-bold tracking-wider">
                        {status}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeStep === "schedule" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h2 className="text-lg font-semibold text-gray-800">
              Schedule & Timetable
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                    Exam Hall & Invigilation
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <MapPin size={16} className="text-[#14B8A6]" />
                        Assign Exam Rooms
                      </label>
                      <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all appearance-none bg-white">
                        <option>Select Hall/Room</option>
                        <option>Main Hall A</option>
                        <option>Room 102</option>
                        <option>Laboratory 1</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <ShieldCheck size={16} className="text-[#14B8A6]" />
                        Allocate Invigilators
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {["Mr. Miller", "Ms. Davis", "Dr. Smith"].map((inv) => (
                          <span
                            key={inv}
                            className="px-3 py-1.5 bg-gray-100 rounded-lg text-xs font-medium text-gray-600 flex items-center gap-2"
                          >
                            {inv}
                            <X
                              size={12}
                              className="cursor-pointer hover:text-red-500"
                            />
                          </span>
                        ))}
                        <button className="px-3 py-1.5 border border-dashed border-gray-300 rounded-lg text-xs text-gray-400 hover:border-[#14B8A6] hover:text-[#14B8A6] transition-all">
                          + Add Staff
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100">
                <h3 className="text-sm font-bold text-amber-800 flex items-center gap-2 mb-4">
                  <Clock size={18} />
                  Conflict Detection
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <p className="text-xs text-amber-700 leading-relaxed">
                      Auto-checking for overlapping exams in Grade 10...
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-amber-100">
                    <p className="text-[11px] font-bold text-amber-800 uppercase mb-1">
                      Potential Clash
                    </p>
                    <p className="text-xs text-amber-600">
                      Mr. Miller has a class session on Nov 12 during the
                      requested exam timing.
                    </p>
                  </div>
                  <button className="w-full py-2.5 text-xs font-bold text-[#14B8A6] bg-white border border-[#14B8A6]/20 rounded-xl hover:bg-teal-50 transition-all">
                    Run Full Conflict Check
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeStep === "subjects" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Subjects & Students
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400">
                  Showing Grade 10 students
                </span>
                <span className="px-3 py-1 bg-teal-50 text-[#14B8A6] rounded-full text-xs font-bold">
                  120 Selected
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-400 uppercase">
                    Select Subjects
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "Mathematics",
                      "Physics",
                      "Chemistry",
                      "Biology",
                      "English",
                      "History",
                    ].map((sub) => (
                      <label
                        key={sub}
                        className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            className="w-5 h-5 rounded-lg border-gray-300 text-[#14B8A6] focus:ring-[#14B8A6]"
                            defaultChecked
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              {sub}
                            </p>
                            <p className="text-[10px] text-gray-400">
                              Internal Weight: 20%
                            </p>
                          </div>
                        </div>
                        <Settings size={16} className="text-gray-300" />
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                    Assign Students
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-[#14B8A6]"
                        defaultChecked
                      />
                      <span className="text-sm text-gray-700 font-medium">
                        Regular Students
                      </span>
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-100">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-[#14B8A6]"
                      />
                      <span className="text-sm text-gray-700 font-medium">
                        Remedial Students Only
                      </span>
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-100">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-[#14B8A6]"
                      />
                      <span className="text-sm text-gray-700 font-medium">
                        Advanced Learners
                      </span>
                    </label>
                  </div>
                  <button className="w-full py-3 text-sm font-medium text-[#14B8A6] border border-dashed border-[#14B8A6]/30 rounded-xl hover:bg-teal-50 transition-all">
                    Custom Student List
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeStep === "settings" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h2 className="text-lg font-semibold text-gray-800">
              Exam Settings & Rules
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-5 rounded-2xl border border-gray-100 bg-gray-50/50">
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm mb-1">
                      Admit Card Generation
                    </h4>
                    <p className="text-xs text-gray-400">
                      Allow students to download hall tickets
                    </p>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#14B8A6]"></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">
                    Marks Entry Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Manual", "Bulk Upload"].map((m) => (
                      <label
                        key={m}
                        className="p-4 rounded-xl border border-gray-100 text-center cursor-pointer hover:border-[#14B8A6] transition-all"
                      >
                        <input
                          type="radio"
                          name="entryMethod"
                          className="hidden peer"
                          defaultChecked={m === "Manual"}
                        />
                        <span className="text-sm text-gray-500 peer-checked:text-[#14B8A6] peer-checked:font-bold">
                          {m}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100">
                    <span className="text-sm text-gray-600">
                      Lock Records After Publishing
                    </span>
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-gray-900"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100">
                    <span className="text-sm text-gray-600">
                      Allow Multiple Attempts
                    </span>
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-gray-900"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FileText size={18} className="text-[#14B8A6]" />
                  Exam Instructions
                </label>
                <textarea
                  rows={10}
                  className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 transition-all text-sm resize-none"
                  placeholder="Enter general instructions for students... e.g. Reach 30 mins before the exam."
                ></textarea>
              </div>
            </div>
          </div>
        )}

        {activeStep === "additional" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-800">
                  Financials & Attachments
                </h2>

                <div className="p-6 rounded-2xl border border-teal-100 bg-teal-50/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-[#14B8A6] text-white rounded-xl">
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Exam Fee</h4>
                        <p className="text-xs text-gray-500">
                          Applicable for this examination
                        </p>
                      </div>
                    </div>
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#14B8A6] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                        $
                      </span>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none bg-white font-medium"
                      />
                    </div>
                    <p className="text-[10px] text-gray-400">
                      This will be automatically added to student invoices.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">
                    Internal Documents
                  </label>
                  <div className="p-8 border-2 border-dashed border-gray-100 rounded-2xl text-center bg-gray-50/30 hover:bg-gray-50 transition-all cursor-pointer">
                    <Plus className="mx-auto text-gray-300 mb-2" size={24} />
                    <p className="text-xs text-gray-400">
                      Click to upload question papers or guidelines
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Notes & Internal Remarks
                </h2>
                <textarea
                  rows={8}
                  className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 transition-all text-sm resize-none"
                  placeholder="Internal notes for administrators..."
                ></textarea>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Floating Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 flex items-center justify-between md:hidden z-50">
        <button onClick={handleBack} className="p-3 text-gray-500">
          <ChevronLeft size={24} />
        </button>
        <div className="flex gap-2">
          {activeStep !== "additional" ? (
            <button
              onClick={() => {
                const currentIndex = steps.findIndex(
                  (s) => s.id === activeStep,
                );
                if (currentIndex < steps.length - 1) {
                  setActiveStep(steps[currentIndex + 1].id);
                }
              }}
              className="px-8 py-3 bg-[#14B8A6] text-white rounded-xl font-bold shadow-lg shadow-teal-100"
            >
              Next
            </button>
          ) : (
            <button className="px-8 py-3 bg-[#14B8A6] text-white rounded-xl font-bold shadow-lg shadow-teal-100 flex items-center gap-2">
              <Save size={18} />
              Save Exam
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateExamForm;
