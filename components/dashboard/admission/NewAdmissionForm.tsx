"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  User,
  GraduationCap,
  Wallet,
  HeartPulse,
  ShieldCheck,
  ArrowRight,
  ChevronLeft,
  Camera,
  Plus,
  CheckCircle2,
  FileText,
  Search,
  AlertCircle,
  MapPin,
  Calendar,
  Building,
  Bell,
  Mail,
  Smartphone,
} from "lucide-react";

type AdmissionTab =
  | "personal"
  | "academic"
  | "source"
  | "fee"
  | "health"
  | "portal";

const NewAdmissionForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<AdmissionTab>("personal");

  // Simulated pre-fill from Prospect
  const prospectId = searchParams.get("fromProspect");

  const [formData] = useState({
    personal: {
      fullName: prospectId === "LD-5001" ? "Robert Fox Jr." : "",
      dob: "",
      gender: "",
      photo: null as string | null,
      contact: "",
      email: "",
      address: "",
      guardian: {
        name: prospectId === "LD-5001" ? "Robert Fox" : "",
        contact: "",
        relationship: "",
        email: "",
      },
      emergencyContact: "",
    },
    academic: {
      admissionNumber: "ADM-2026-042",
      academicYear: "2025-2026",
      grade: prospectId === "LD-5001" ? "Grade 10" : "",
      section: "",
      house: "",
      enrollmentDate: new Date().toISOString().split("T")[0],
      subjects: ["English", "Mathematics", "Science"],
      teacher: "",
      status: "Active",
    },
    source: {
      reference: prospectId || "",
      type: prospectId ? "Referral" : "Walk-in",
      feeStatus: "Unpaid",
      paymentMode: "",
      admissionDate: new Date().toISOString().split("T")[0],
      previousSchool: "",
      notes: "",
    },
    fee: {
      category: "",
      discount: 0,
      installments: "Monthly",
      accountsLink: "",
    },
    health: {
      medicalNotes: "",
      allergies: "",
      transport: "None",
      hostel: false,
      extraCurricular: [] as string[],
    },
    portal: {
      studentEmail: "",
      parentEmail: "",
      smsAlerts: true,
      emailAlerts: true,
    },
  });

  const tabs: { id: AdmissionTab; label: string; icon: React.ElementType }[] = [
    { id: "personal", label: "Personal", icon: User },
    { id: "academic", label: "Academic", icon: GraduationCap },
    { id: "source", label: "Source", icon: Search },
    { id: "fee", label: "Fee & Payment", icon: Wallet },
    { id: "health", label: "Health & Misc", icon: HeartPulse },
    { id: "portal", label: "Portal Access", icon: ShieldCheck },
  ];

  const handleNext = () => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-24">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2.5 hover:bg-gray-50 rounded-2xl transition-colors text-gray-400 hover:text-[#14B8A6]"
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#14B8A6] uppercase tracking-widest mb-1">
                <span>Admissions</span>
                <span className="text-gray-300">/</span>
                <span className="text-gray-500 underline underline-offset-4 decoration-2">
                  New Admission
                </span>
              </div>
              <h1 className="text-2xl font-black text-gray-900 mt-1">
                New Student Admission
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {prospectId && (
              <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase border border-blue-100 mr-2">
                <CheckCircle2 size={14} />
                Converted from Prospect
              </div>
            )}
            <button className="flex-1 md:flex-none px-5 py-2.5 bg-gray-50 text-gray-600 rounded-xl text-sm font-bold border border-gray-100 hover:bg-gray-100 transition-all">
              Save Draft
            </button>
            <button className="flex-1 md:flex-none px-6 py-2.5 bg-[#14B8A6] text-white rounded-xl text-sm font-bold shadow-lg shadow-teal-500/20 hover:bg-[#0D9488] transition-all flex items-center justify-center gap-2">
              <FileText size={18} />
              Generate Admit Letter
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs - Desktop */}
        <div className="lg:w-72 shrink-0">
          <div className="bg-white border border-gray-100 rounded-5xl p-4 shadow-sm sticky top-24">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all group ${
                    activeTab === tab.id
                      ? "bg-[#14B8A6] text-white shadow-xl shadow-teal-500/20"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`p-2 rounded-xl transition-colors ${
                      activeTab === tab.id
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-gray-400 group-hover:bg-[#14B8A6]/10 group-hover:text-[#14B8A6]"
                    }`}
                  >
                    <tab.icon size={18} />
                  </div>
                  <span className="text-sm font-bold">{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-50 px-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Roll: Automatically Assigned
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Form Progress
                </p>
                <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#14B8A6]"
                    style={{ width: "35%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-white border border-gray-100 rounded-5xl shadow-sm overflow-hidden min-h-125">
            {activeTab === "personal" && (
              <div className="p-8 lg:p-12 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-xl font-black text-gray-900 tracking-tight">
                      Personal Details
                    </h2>
                    <p className="text-sm text-gray-400">
                      Basic identification and contact information
                    </p>
                  </div>
                  <div className="relative group">
                    <div className="w-24 h-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 overflow-hidden hover:border-[#14B8A6] transition-colors cursor-pointer group-hover:bg-teal-50/30">
                      <Camera size={24} className="mb-1" />
                      <span className="text-[10px] font-black tracking-tighter uppercase leading-none">
                        Upload
                        <br />
                        Photo
                      </span>
                    </div>
                    <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#14B8A6] text-white rounded-xl flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 transition-transform">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                        Student Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.personal.fullName}
                        className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-700 focus:ring-2 focus:ring-[#14B8A6]/20"
                        placeholder="e.g. John Doe"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                          Date of Birth
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-700 pl-11"
                          />
                          <Calendar
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                          Gender
                        </label>
                        <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-700">
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                        Home Address
                      </label>
                      <div className="relative">
                        <textarea
                          className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-700 pl-11 min-h-24"
                          placeholder="Full residential address..."
                        ></textarea>
                        <MapPin
                          className="absolute left-4 top-5 text-gray-400"
                          size={18}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xs font-black text-[#14B8A6] uppercase tracking-widest border-b border-gray-50 pb-2 flex items-center gap-2">
                      <ShieldCheck size={14} />
                      Guardian Information
                    </h3>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                        Guardian Name
                      </label>
                      <input
                        type="text"
                        value={formData.personal.guardian.name}
                        className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-700"
                        placeholder="e.g. Robert Smith Sr."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                          Relationship
                        </label>
                        <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-700">
                          <option>Father</option>
                          <option>Mother</option>
                          <option>Legal Guardian</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                          Contact Number
                        </label>
                        <input
                          type="tel"
                          className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-700"
                          placeholder="+1..."
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                        Emergency Contact
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-700 pl-11"
                          placeholder="Secondary number..."
                        />
                        <AlertCircle
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500"
                          size={18}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black shadow-lg shadow-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    Next: Academic Info
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {activeTab === "academic" && (
              <div className="p-8 lg:p-12 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-xl font-black text-gray-900 tracking-tight">
                      Academic Details
                    </h2>
                    <p className="text-sm text-gray-400">
                      Class assignment and enrollment specifics
                    </p>
                  </div>
                  <div className="px-4 py-2 bg-[#14B8A6]/5 border border-[#14B8A6]/20 rounded-2xl">
                    <span className="text-[10px] font-black text-[#14B8A6] uppercase tracking-widest">
                      ID: ADM-2026-042
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                        Academic Year
                      </label>
                      <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-700 appearance-none">
                        <option>2025-2026 (Current)</option>
                        <option>2026-2027</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                          Class / Grade
                        </label>
                        <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-700">
                          <option>Grade 8</option>
                          <option>Grade 9</option>
                          <option selected={prospectId === "LD-5001"}>
                            Grade 10
                          </option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                          Section
                        </label>
                        <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-700">
                          <option>Section A</option>
                          <option>Section B</option>
                          <option>Section C</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                        Enrollment Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-700"
                          value={formData.academic.enrollmentDate}
                          onChange={() => {}}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 text-left">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                      Assigned Subjects
                    </label>
                    <div className="bg-gray-50 rounded-4xl p-6 space-y-4">
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Core subjects are auto-assigned based on the grade. You
                        can manage additional electives later.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {formData.academic.subjects.map((sub) => (
                          <span
                            key={sub}
                            className="px-4 py-2 bg-white text-gray-700 rounded-xl text-xs font-black shadow-sm border border-gray-100 flex items-center gap-2"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
                            {sub}
                          </span>
                        ))}
                        <button className="px-3 py-2 bg-[#14B8A6]/10 text-[#14B8A6] rounded-xl text-xs font-black border border-[#14B8A6]/10 hover:bg-[#14B8A6]/20 transition-all flex items-center gap-1">
                          <Plus size={14} /> Add Elective
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                        Initial Status
                      </label>
                      <div className="flex gap-3">
                        {["Active", "Probation", "Inactive"].map((status) => (
                          <label
                            key={status}
                            className={`flex-1 p-3 rounded-2xl border text-center text-xs font-black cursor-pointer transition-all ${formData.academic.status === status ? "bg-teal-50 border-[#14B8A6] text-[#14B8A6]" : "bg-white border-gray-100 text-gray-400"}`}
                          >
                            <input
                              type="radio"
                              className="hidden"
                              name="status"
                              checked={formData.academic.status === status}
                              onChange={() => {}}
                            />
                            {status}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black shadow-lg shadow-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    Next: Source & Fee
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {activeTab === "source" && (
              <div className="p-8 lg:p-12 animate-in fade-in slide-in-from-right-4 duration-500 text-center flex flex-col items-center justify-center min-h-100">
                <div className="max-w-md w-full space-y-8">
                  <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
                    <Search size={32} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-gray-900">
                      Admission Source
                    </h2>
                    <p className="text-sm text-gray-400 mt-2">
                      Where did this application originate from?
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${formData.source.type === "Referral" ? "border-blue-500 bg-blue-50/20" : "border-gray-50 bg-gray-50/30 text-gray-400"}`}
                    >
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${formData.source.type === "Referral" ? "bg-blue-500 text-white" : "bg-white"}`}
                      >
                        <Plus size={24} />
                      </div>
                      <span className="text-sm font-black">Link Prospect</span>
                    </button>
                    <button
                      className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${formData.source.type === "Walk-in" ? "border-teal-500 bg-teal-50/20" : "border-gray-50 bg-gray-50/30 text-gray-400"}`}
                    >
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${formData.source.type === "Walk-in" ? "bg-teal-500 text-white" : "bg-white"}`}
                      >
                        <Building size={24} />
                      </div>
                      <span className="text-sm font-black">Direct Walk-in</span>
                    </button>
                  </div>

                  <div className="space-y-4 text-left">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                        Previous School Details
                      </label>
                      <input
                        type="text"
                        className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-700"
                        placeholder="Last attended institution..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                        Internal Notes
                      </label>
                      <textarea
                        className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-700 min-h-24"
                        placeholder="Mention any specific referral credits or context..."
                      ></textarea>
                    </div>
                  </div>

                  <button
                    onClick={handleNext}
                    className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black shadow-lg"
                  >
                    Continue to Fee Mapping
                  </button>
                </div>
              </div>
            )}

            {activeTab === "fee" && (
              <div className="p-8 lg:p-12 animate-in fade-in slide-in-from-right-4 duration-500 text-left">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-14 h-14 bg-teal-50 text-[#14B8A6] rounded-2xl flex items-center justify-center shadow-sm">
                    <Wallet size={28} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-gray-900">
                      Fee & Payment Mapping
                    </h2>
                    <p className="text-sm text-gray-400">
                      Configure financial plan for this student
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                        Fee Category
                      </label>
                      <div className="space-y-3">
                        {[
                          "Standard Curriculum",
                          "Premium Plus",
                          "Boarding & Tuition",
                        ].map((cat) => (
                          <label
                            key={cat}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl cursor-pointer border-2 border-transparent hover:border-[#14B8A6]/30 transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="feecat"
                                className="hidden"
                              />
                              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#14B8A6] shadow-sm">
                                <Building size={18} />
                              </div>
                              <span className="text-sm font-bold text-gray-700">
                                {cat}
                              </span>
                            </div>
                            <span className="text-xs font-black text-gray-400">
                              {cat === "Premium Plus" ? "$1,200/yr" : "$850/yr"}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50/50 rounded-4xl p-8 border border-gray-100 flex flex-col">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">
                      Commercial Structure
                    </h3>
                    <div className="space-y-6 flex-1">
                      <div className="flex justify-between items-center py-4 border-b border-gray-100">
                        <span className="text-sm font-bold text-gray-600">
                          Admission Fee (One-time)
                        </span>
                        <span className="text-sm font-black text-gray-900">
                          $200.00
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-4 border-b border-gray-100">
                        <span className="text-sm font-bold text-gray-600">
                          Tuition Fee
                        </span>
                        <span className="text-sm font-black text-gray-900">
                          $850.00
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-4 border-b border-gray-100 text-blue-600">
                        <span className="text-sm font-bold">
                          Sibling Discount (5%)
                        </span>
                        <span className="text-sm font-black">-$42.50</span>
                      </div>
                      <div className="flex justify-between items-center pt-8">
                        <span className="text-lg font-black text-gray-900">
                          Total Payable
                        </span>
                        <span className="text-2xl font-black text-[#14B8A6]">
                          $1,007.50
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={handleNext}
                      className="mt-8 w-full py-4 bg-[#14B8A6] text-white rounded-2xl font-black shadow-lg shadow-teal-500/20"
                    >
                      Apply & Set Health Info
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "health" && (
              <div className="p-8 lg:p-12 animate-in fade-in slide-in-from-right-4 duration-500 text-left">
                <div className="max-w-3xl">
                  <h2 className="text-2xl font-black text-gray-900 mb-2">
                    Health & Well-being
                  </h2>
                  <p className="text-sm text-gray-400 mb-12 italic border-l-4 border-[#14B8A6] pl-4">
                    Critical medical information helps us provide better care
                    during school hours.
                  </p>

                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                          Blood Group
                        </label>
                        <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold">
                          <option>A+</option>
                          <option>O+</option>
                          <option>B+</option>
                          <option>AB+</option>
                          <option>Unspecified</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                          Allergies (if any)
                        </label>
                        <input
                          type="text"
                          className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold"
                          placeholder="e.g. Peanuts, Latex..."
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                        Transport & Accommodation
                      </label>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="p-6 bg-gray-50 rounded-3xl flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-sm">
                            <MapPin size={24} />
                          </div>
                          <div className="flex-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                              Bus Service
                            </p>
                            <select className="bg-transparent border-none p-0 text-sm font-black focus:ring-0">
                              <option>Not Required</option>
                              <option>Route A-102</option>
                              <option>Route B-204</option>
                            </select>
                          </div>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-3xl flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-500 shadow-sm">
                            <Building size={24} />
                          </div>
                          <div className="flex-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                              Hostel Facility
                            </p>
                            <select className="bg-transparent border-none p-0 text-sm font-black focus:ring-0">
                              <option>Day Scholar</option>
                              <option>Dormitory A</option>
                              <option>Premium Suite</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-8 bg-gray-900 rounded-5xl mt-12 text-white shadow-2xl">
                      <div>
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">
                          Next Step
                        </p>
                        <p className="text-xl font-black">
                          Portal Access & Login
                        </p>
                      </div>
                      <button
                        onClick={handleNext}
                        className="w-14 h-14 bg-[#14B8A6] rounded-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
                      >
                        <ArrowRight size={28} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "portal" && (
              <div className="p-8 lg:p-12 animate-in fade-in slide-in-from-right-4 duration-500 text-center">
                <div className="max-w-xl mx-auto space-y-12">
                  <div>
                    <div className="w-20 h-20 bg-teal-50 text-[#14B8A6] rounded-5xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                      <ShieldCheck size={40} />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">
                      Portal Credentials
                    </h2>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                      System will automatically generate login credentials and
                      send welcome kits to the registered details.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#14B8A6] text-white rounded-xl flex items-center justify-center">
                          <Smartphone size={18} />
                        </div>
                        <span className="text-sm font-black uppercase tracking-widest">
                          Student Portal
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          Username (ID)
                        </p>
                        <p className="text-sm font-bold">
                          {formData.academic.admissionNumber}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black text-[#14B8A6] uppercase tracking-widest py-1 px-3 bg-white rounded-lg w-fit border border-teal-50">
                        <CheckCircle2 size={12} />
                        Ready to Launch
                      </div>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center">
                          <User size={18} />
                        </div>
                        <span className="text-sm font-black uppercase tracking-widest">
                          Parent Portal
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          Access Method
                        </p>
                        <p className="text-sm font-bold">
                          Email + OTP Verification
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black text-[#14B8A6] uppercase tracking-widest py-1 px-3 bg-white rounded-lg w-fit border border-teal-50">
                        <CheckCircle2 size={12} />
                        Sync Enabled
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl text-left flex gap-4">
                    <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-sm shrink-0 border border-amber-50">
                      <Bell size={20} />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-black text-amber-900 mb-1">
                          Notification Preferences
                        </h4>
                        <p className="text-xs text-amber-700/70">
                          Check channels to send the welcome kit & login
                          details.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 accent-[#14B8A6]"
                            defaultChecked
                          />
                          <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
                            <Mail size={12} /> Email
                          </span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 accent-[#14B8A6]"
                            defaultChecked
                          />
                          <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
                            <Smartphone size={12} /> SMS / WhatsApp
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-50 flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 py-5 bg-gray-900 text-white rounded-3xl font-black shadow-2xl hover:scale-105 transition-transform active:scale-95 flex items-center justify-center gap-2">
                      Complete Admission
                      <CheckCircle2 size={24} />
                    </button>
                    <button className="sm:w-24 py-5 bg-gray-50 text-gray-400 rounded-3xl font-black border border-gray-100 hover:text-gray-900 transition-colors">
                      Later
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Bar - Mobile Only */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-gray-900/90 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between shadow-2xl lg:hidden z-50">
        <div className="flex gap-4">
          <button
            onClick={() => {
              const currentIndex = tabs.findIndex((t) => t.id === activeTab);
              if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1].id);
            }}
            className="p-2 text-white/50 hover:text-white transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="h-4 w-px bg-white/10 my-auto" />
          <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] my-auto">
            Step {tabs.findIndex((t) => t.id === activeTab) + 1}/6
          </span>
        </div>
        <button
          onClick={activeTab === "portal" ? () => {} : handleNext}
          className="px-6 py-2.5 bg-[#14B8A6] text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-teal-500/20"
        >
          {activeTab === "portal" ? "Finalize" : "Next Step"}
        </button>
      </div>
    </div>
  );
};

export default NewAdmissionForm;
