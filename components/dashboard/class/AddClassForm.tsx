"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Save,
  X,
  Plus,
  Trash2,
  BookOpen,
  Users,
  Calendar,
  ClipboardList,
  MapPin,
  Clock,
  UserPlus,
} from "lucide-react";

type FormSection = "class" | "sections" | "scheduling" | "additional";

const AddClassForm = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<FormSection>("class");
  const [sections, setSections] = useState([
    { id: "1", name: "", code: "", teacher: "", subjects: [] as string[] },
  ]);

  const addSection = () => {
    setSections([
      ...sections,
      {
        id: Math.random().toString(36).substr(2, 9),
        name: "",
        code: "",
        teacher: "",
        subjects: [],
      },
    ]);
  };

  const removeSection = (id: string) => {
    if (sections.length > 1) {
      setSections(sections.filter((s) => s.id !== id));
    }
  };

  const handleBack = () => {
    router.back();
  };

  const steps: { id: FormSection; label: string; icon: React.ElementType }[] = [
    { id: "class", label: "Class Details", icon: BookOpen },
    { id: "sections", label: "Section Details", icon: Users },
    { id: "scheduling", label: "Scheduling", icon: Calendar },
    { id: "additional", label: "Additional Info", icon: ClipboardList },
  ];

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <span
              className="hover:text-[#14B8A6] cursor-pointer"
              onClick={() => router.push("/dashboard/class")}
            >
              Academic
            </span>
            <span>/</span>
            <span
              className="hover:text-[#14B8A6] cursor-pointer"
              onClick={() => router.push("/dashboard/class")}
            >
              Classes
            </span>
            <span>/</span>
            <span className="text-gray-900 font-medium">Add New</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Add New Class & Section
          </h1>
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
            <span>Save Class</span>
          </button>
        </div>
      </div>

      {/* Tabs - Mobile Friendly Navigation */}
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
        {activeStep === "class" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Class Information
              </h2>
              <button className="text-sm text-[#14B8A6] font-medium flex items-center gap-1 hover:underline">
                <Plus size={16} />
                Copy from Existing Class
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Class Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Grade 10"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Class Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. G10-2026"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Academic Year <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all appearance-none bg-no-repeat bg-[right_1rem_center] bg-[length:1em_1em] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtNiA5IDYgNiA2LTYiLz48L3N2Zz4=')]">
                  <option>2025-2026</option>
                  <option>2026-2027</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Total Capacity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="e.g. 120"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Class Type <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-3 pt-1">
                  {["Regular", "Special", "Elective"].map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="classType"
                        className="hidden peer"
                      />
                      <div className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 peer-checked:bg-[#14B8A6]/10 peer-checked:border-[#14B8A6] peer-checked:text-[#14B8A6] transition-all group-hover:bg-gray-50 uppercase text-xs font-bold tracking-wider">
                        {type}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeStep === "sections" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-800">
                Section Details
              </h2>
              <button
                onClick={addSection}
                className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-black transition-all"
              >
                <Plus size={16} />
                Add Section
              </button>
            </div>

            <div className="space-y-4">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className="p-6 rounded-2xl border border-gray-100 bg-gray-50/50 relative group"
                >
                  {sections.length > 1 && (
                    <button
                      onClick={() => removeSection(section.id)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Section Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. A"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Section Code
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 10A"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Class Teacher <span className="text-red-500">*</span>
                      </label>
                      <select className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all appearance-none">
                        <option>Select Teacher</option>
                        <option>Sarah Johnson</option>
                        <option>Robert Wilson</option>
                        <option>Emily Davis</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <label className="text-sm font-medium text-gray-700">
                      Assigned Subjects
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Mathematics",
                        "Physics",
                        "Chemistry",
                        "Biology",
                        "English",
                        "History",
                        "Computer Science",
                      ].map((subject) => (
                        <label
                          key={subject}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input type="checkbox" className="hidden peer" />
                          <div className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 peer-checked:bg-[#14B8A6] peer-checked:text-white peer-checked:border-[#14B8A6] transition-all hover:bg-gray-100 bg-white">
                            {subject}
                          </div>
                        </label>
                      ))}
                      <button className="px-3 py-1.5 rounded-lg border border-dashed border-gray-300 text-xs font-medium text-gray-500 hover:border-[#14B8A6] hover:text-[#14B8A6] transition-all flex items-center gap-1">
                        <Plus size={14} /> Add Topic
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeStep === "scheduling" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Clock className="text-[#14B8A6]" size={20} />
                Timetable Settings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50">
                    <div>
                      <h4 className="font-medium text-gray-700">
                        Link to Academic Calendar
                      </h4>
                      <p className="text-xs text-gray-500">
                        Automatically sync exams and holidays
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-[#14B8A6]"
                      defaultChecked
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Class Periods Per Day
                    </label>
                    <input
                      type="number"
                      defaultValue={8}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Default Room / Location
                    </label>
                    <div className="relative">
                      <MapPin
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="text"
                        placeholder="e.g. Building A, Room 102"
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Primary Substitute Teacher
                    </label>
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all appearance-none bg-white">
                      <option>Select Teacher</option>
                      <option>Sarah Johnson</option>
                      <option>Robert Wilson</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeStep === "additional" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <UserPlus className="text-[#14B8A6]" size={20} />
                    Co-Teachers & Assistants
                  </h2>
                  <p className="text-xs text-gray-500 mb-2">
                    Assign additional staff members to this class
                  </p>
                  <div className="space-y-3">
                    {[1, 2].map((i) => (
                      <div key={i} className="flex gap-2">
                        <select className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all appearance-none bg-white">
                          <option>Select Staff</option>
                          <option>John Doe (Assistant)</option>
                          <option>Jane Smith (Lab Tech)</option>
                        </select>
                        <button className="p-3 text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                    <button className="text-sm text-[#14B8A6] font-medium flex items-center gap-1 hover:underline mt-2">
                      <Plus size={16} /> Add Co-teacher
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Special Requirements
                  </h2>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {[
                      "Lab Access",
                      "IT Equipment",
                      "Wheelchair Access",
                      "Smart Board",
                    ].map((req) => (
                      <label
                        key={req}
                        className="flex items-center gap-2 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 accent-[#14B8A6]"
                        />
                        <span className="text-sm text-gray-600">{req}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Notes & Remarks
                </h2>
                <textarea
                  rows={8}
                  placeholder="Enter any additional instructions or notes regarding this class..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all resize-none"
                ></textarea>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Save/Next Button for Mobile */}
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
              Next Step
            </button>
          ) : (
            <button className="px-8 py-3 bg-[#14B8A6] text-white rounded-xl font-bold shadow-lg shadow-teal-100 flex items-center gap-2">
              <Save size={18} />
              Save Class
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddClassForm;
