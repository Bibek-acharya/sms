"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  Plus,
  User,
  BookOpen,
  Wallet,
  Heart,
  Shield,
  CheckCircle2,
  X,
  Save,
  ChevronRight,
  Upload,
  FileText,
  UserCheck,
  School,
  History,
  Lock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StudentFormState {
  // Personal
  fullName: string;
  dob: string;
  gender: string;
  contact: string;
  email: string;
  address: string;
  guardianName: string;
  guardianContact: string;
  relation: string;
  emergencyContact: string;

  // Academic
  admissionNumber: string;
  class: string;
  section: string;
  academicYear: string;
  house: string;
  enrollmentDate: string;
  status: string;

  // Admission
  prospectId: string;
  admissionFee: string;
  source: string;
  previousSchool: string;
  remarks: string;

  // Fee
  feeCategory: string;
  scholarship: string;
  paymentPlan: string;

  // Health
  medicalInfo: string;
  allergies: string;
  transport: string;
  hostel: string;
  activities: string;

  // Portal
  username: string;
  parentPortal: boolean;
  smsAlerts: boolean;
}

const AddStudentForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prospectId = searchParams.get("prospectId");
  const isConversion = !!prospectId;

  const [activeSection, setActiveSection] = useState("Personal");
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<StudentFormState>({
    fullName: isConversion ? "Maxwell James" : "",
    dob: isConversion ? "2012-05-15" : "",
    gender: isConversion ? "Male" : "Male",
    contact: isConversion ? "+1 555 0192" : "",
    email: isConversion ? "maxwell.j@email.com" : "",
    address: "",
    guardianName: isConversion ? "Lawrence James" : "",
    guardianContact: isConversion ? "+1 555 0100" : "",
    relation: "Father",
    emergencyContact: "",
    admissionNumber: "ADM-2026-882",
    class: "Grade 8",
    section: "A",
    academicYear: "2026-27",
    house: "Emerald",
    enrollmentDate: new Date().toISOString().split("T")[0],
    status: "Active",
    prospectId: prospectId || "",
    admissionFee: isConversion ? "1,200" : "",
    source: isConversion ? "Inquiry Form" : "Walk-in",
    previousSchool: "",
    remarks: "",
    feeCategory: "Quarterly",
    scholarship: "None",
    paymentPlan: "Installments",
    medicalInfo: "",
    allergies: "None",
    transport: "No",
    hostel: "No",
    activities: "",
    username: "",
    parentPortal: true,
    smsAlerts: true,
  });

  const sections = [
    "Personal",
    "Academic",
    "Admission",
    "Fees",
    "Health",
    "Access",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const renderPersonal = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="relative group">
          <div className="w-32 h-32 rounded-3xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 transition-all overflow-hidden relative">
            <Camera
              size={24}
              className="text-gray-300 group-hover:text-emerald-500 mb-1"
            />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Upload Photo
            </span>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-lg border border-gray-100 text-gray-400">
            <Plus size={14} />
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Full Student Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="e.g. John Doe"
              className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-xs font-bold focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-xs font-bold"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-xs font-bold appearance-none cursor-pointer"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Contact Number
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              placeholder="+1 555 0000"
              className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-xs font-bold"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-50">
        <div className="space-y-4">
          <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">
            Guardian Details
          </h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Guardian Name
              </label>
              <input
                type="text"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border-none rounded-2xl p-4 text-xs font-bold"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Relation
                </label>
                <input
                  type="text"
                  name="relation"
                  value={formData.relation}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 text-xs font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Contact
                </label>
                <input
                  type="text"
                  name="guardianContact"
                  value={formData.guardianContact}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 text-xs font-bold"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em]">
            Emergency Information
          </h4>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Emergency Contact #
            </label>
            <input
              type="text"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleInputChange}
              placeholder="Primary secondary contact..."
              className="w-full bg-red-50/50 border-none rounded-2xl p-4 text-xs font-bold placeholder:text-red-200"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Residential Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={2}
              className="w-full bg-gray-50 border-none rounded-2xl p-4 text-xs font-bold resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAcademic = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
            Admission Number
          </label>
          <div className="relative">
            <input
              type="text"
              name="admissionNumber"
              value={formData.admissionNumber}
              onChange={handleInputChange}
              className="w-full bg-gray-900 border-none rounded-2xl p-4 text-xs font-black text-emerald-400 uppercase tracking-widest"
              readOnly
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-white/30 uppercase">
              System Generated
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
            Assign Class
          </label>
          <select
            name="class"
            value={formData.class}
            onChange={handleInputChange}
            className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-xs font-bold"
          >
            {[
              "Grade 1",
              "Grade 2",
              "Grade 3",
              "Grade 4",
              "Grade 5",
              "Grade 6",
              "Grade 7",
              "Grade 8",
              "Grade 9",
              "Grade 10",
            ].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
            Section
          </label>
          <select
            name="section"
            value={formData.section}
            onChange={handleInputChange}
            className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-xs font-bold"
          >
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
            Academic Year
          </label>
          <select
            name="academicYear"
            value={formData.academicYear}
            onChange={handleInputChange}
            className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-xs font-bold"
          >
            <option>2025-26</option>
            <option>2026-27</option>
            <option>2027-28</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
            House / Squad
          </label>
          <select
            name="house"
            value={formData.house}
            onChange={handleInputChange}
            className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-xs font-bold"
          >
            <option>Emerald</option>
            <option>Ruby</option>
            <option>Sapphire</option>
            <option>Topaz</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
            Management Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full bg-emerald-50 text-emerald-700 border-none rounded-2xl p-4 text-xs font-black uppercase tracking-widest"
          >
            <option>Active</option>
            <option>Probation</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 px-1">
          Subject Assignments (Core)
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "Mathematics",
            "Science",
            "English",
            "History",
            "Physics",
            "Computer Sc.",
          ].map((sub) => (
            <div
              key={sub}
              className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100"
            >
              <span className="text-[10px] font-black uppercase text-gray-700">
                {sub}
              </span>
              <CheckCircle2 size={16} className="text-[#14B8A6]" />
            </div>
          ))}
          <button className="flex items-center justify-center gap-2 p-4 bg-white border border-dashed border-gray-200 rounded-2xl text-[10px] font-black uppercase text-gray-400 hover:text-[#14B8A6] hover:border-[#14B8A6] transition-all">
            <Plus size={14} /> Add Elective
          </button>
        </div>
      </div>
    </div>
  );

  const renderAdmission = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-8 bg-emerald-900 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 -mr-16 -mt-16 rounded-full" />
            <h4 className="text-sm font-black uppercase tracking-tight mb-2">
              Admission Context
            </h4>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest italic mb-6">
              Linked Prospect Data
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/60">
                  Prospect ID
                </span>
                <span className="text-xs font-black uppercase italic">
                  {formData.prospectId || "Direct Entry"}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/60">
                  Source
                </span>
                <span className="text-xs font-black uppercase italic">
                  {formData.source}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Admission Date
            </label>
            <input
              type="date"
              name="enrollmentDate"
              value={formData.enrollmentDate}
              className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-xs font-bold"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Previous School Records
            </label>
            <textarea
              name="previousSchool"
              value={formData.previousSchool}
              onChange={handleInputChange}
              rows={3}
              placeholder="List previous academic institutions and grades..."
              className="w-full bg-gray-50 border-none rounded-2xl p-6 text-xs font-bold placeholder:text-gray-300 resize-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Admin Remarks
            </label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleInputChange}
              rows={3}
              placeholder="Internal notes for admissions committee..."
              className="w-full bg-gray-50 border-none rounded-2xl p-6 text-xs font-bold placeholder:text-gray-300 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderFees = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm space-y-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
            <Wallet size={24} />
          </div>
          <div>
            <h4 className="text-[11px] font-black uppercase text-gray-900">
              Fee Category
            </h4>
            <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">
              Structure mapping
            </p>
          </div>
          <select
            name="feeCategory"
            value={formData.feeCategory}
            onChange={handleInputChange}
            className="w-full bg-gray-50 border-none rounded-xl p-3 text-[10px] font-black uppercase tracking-widest"
          >
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Annual</option>
          </select>
        </div>

        <div className="p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm space-y-4">
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
            <Shield size={24} />
          </div>
          <div>
            <h4 className="text-[11px] font-black uppercase text-gray-900">
              Scholarship
            </h4>
            <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">
              Discount application
            </p>
          </div>
          <select
            name="scholarship"
            value={formData.scholarship}
            onChange={handleInputChange}
            className="w-full bg-gray-50 border-none rounded-xl p-3 text-[10px] font-black uppercase tracking-widest"
          >
            <option>None</option>
            <option>Merit Based (20%)</option>
            <option>Need Based (50%)</option>
            <option>Full Ride (100%)</option>
          </select>
        </div>

        <div className="p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm space-y-4">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
            <History size={24} />
          </div>
          <div>
            <h4 className="text-[11px] font-black uppercase text-gray-900">
              Payment Plan
            </h4>
            <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">
              Term scheduling
            </p>
          </div>
          <select
            name="paymentPlan"
            value={formData.paymentPlan}
            onChange={handleInputChange}
            className="w-full bg-gray-50 border-none rounded-xl p-3 text-[10px] font-black uppercase tracking-widest"
          >
            <option>Full Advance</option>
            <option>Two Installments</option>
            <option>Monthly Plan</option>
          </select>
        </div>
      </div>

      <div className="p-8 bg-gray-900 rounded-[2.5rem] text-white flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-emerald-400">
            <CheckCircle2 size={28} />
          </div>
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight">
              Ledger Integration
            </h3>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest italic">
              Accounts will auto-generate invoices upon saving
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-emerald-400 uppercase mb-1">
            Total Estimated Annual
          </p>
          <p className="text-3xl font-black">$4,860.00</p>
        </div>
      </div>
    </div>
  );

  const renderHealth = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-8 bg-red-50 border border-red-100 rounded-[2.5rem] space-y-6">
            <div className="flex items-center gap-3">
              <Heart className="text-red-500" size={20} />
              <h4 className="text-[11px] font-black uppercase text-red-900 tracking-widest">
                Medical Profile
              </h4>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-red-900/40 uppercase tracking-widest ml-1">
                Chronic Conditions / Allergies
              </label>
              <textarea
                name="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
                className="w-full bg-white border-none rounded-2xl p-4 text-xs font-bold text-red-900"
                placeholder="List any medical alerts here..."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-white border border-gray-100 rounded-[2rem] space-y-3">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Transport
              </p>
              <select
                name="transport"
                value={formData.transport}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border-none rounded-xl p-2 text-[10px] font-black uppercase"
              >
                <option>No</option>
                <option>School Bus</option>
                <option>Private</option>
              </select>
            </div>
            <div className="p-6 bg-white border border-gray-100 rounded-[2rem] space-y-3">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Hostel
              </p>
              <select
                name="hostel"
                value={formData.hostel}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border-none rounded-xl p-2 text-[10px] font-black uppercase"
              >
                <option>No</option>
                <option>Boys Block A</option>
                <option>Girls Block B</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 space-y-4">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Extra-Curricular Interests
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                "Sports Club",
                "Chess",
                "Debate Society",
                "Science Lab",
                "Music",
                "Drama",
              ].map((item) => (
                <button
                  key={item}
                  className="px-5 py-3 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-tight text-gray-600 hover:border-emerald-500 hover:text-emerald-600 transition-all"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccess = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-xl mx-auto space-y-8">
        <div className="p-10 bg-white border border-gray-100 rounded-5xl shadow-xl space-y-8 relative overflow-hidden text-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-500 mx-auto mb-4">
            <Lock size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900">
              Portal Credentials
            </h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Auto-provision student and parent access
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
                Student Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="e.g. mjames.2026"
                className="w-full bg-gray-50 border-none rounded-2xl p-5 text-sm font-black text-emerald-600 placeholder:text-gray-300 transition-all"
              />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <UserCheck size={18} className="text-gray-400" />
                  <span className="text-[10px] font-black uppercase text-gray-600">
                    Activate Parent Portal
                  </span>
                </div>
                <div className="w-10 h-5 bg-emerald-500 rounded-full p-1 cursor-pointer">
                  <div className="w-3 h-3 bg-white rounded-full ml-auto" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Plus size={18} className="text-gray-400" />
                  <span className="text-[10px] font-black uppercase text-gray-600">
                    Email Login Instructions
                  </span>
                </div>
                <div className="w-10 h-5 bg-emerald-500 rounded-full p-1 cursor-pointer">
                  <div className="w-3 h-3 bg-white rounded-full ml-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/dashboard/student"
              className="p-2 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-emerald-500 transition-all shadow-sm"
            >
              <ArrowLeft size={18} />
            </Link>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] italic">
              Academic →{" "}
              {isConversion ? "Member Conversion" : "New Registration"}
            </span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight leading-none">
            {isConversion
              ? "Convert Prospect to Student"
              : "Enroll New Student"}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-white text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-gray-100 hover:bg-gray-50 transition-all">
            Discard
          </button>
          <button
            onClick={() => setShowPreview(true)}
            className="px-8 py-3 bg-[#111827] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-gray-200 hover:bg-black transition-all flex items-center gap-2"
          >
            <Save size={14} />{" "}
            {isConversion ? "Finalize Conversion" : "Register Student"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-4 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-2">
            {sections.map((s) => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                className={`w-full flex items-center justify-between p-4 rounded-3xl transition-all ${
                  activeSection === s
                    ? "bg-[#10B981] text-white shadow-xl shadow-emerald-100"
                    : "text-gray-400 hover:bg-gray-50 hover:text-gray-600 font-bold"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center ${activeSection === s ? "bg-white/20" : "bg-gray-50"}`}
                  >
                    {s === "Personal" && <User size={14} />}
                    {s === "Academic" && <School size={14} />}
                    {s === "Admission" && <UserCheck size={14} />}
                    {s === "Fees" && <Wallet size={14} />}
                    {s === "Health" && <Heart size={14} />}
                    {s === "Access" && <Shield size={14} />}
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest">
                    {s}
                  </span>
                </div>
                {activeSection === s && <ChevronRight size={14} />}
              </button>
            ))}
          </div>

          <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 text-center">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 italic text-gray-300">
              ?
            </div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-loose">
              Help with enrollment? <br />{" "}
              <span className="text-emerald-600 underline">Admission SOP</span>
            </p>
          </div>
        </div>

        {/* Dynamic Form Content */}
        <div className="lg:col-span-3">
          <div className="bg-white p-10 rounded-5xl border border-gray-100 shadow-sm min-h-[600px]">
            {activeSection === "Personal" && renderPersonal()}
            {activeSection === "Academic" && renderAcademic()}
            {activeSection === "Admission" && renderAdmission()}
            {activeSection === "Fees" && renderFees()}
            {activeSection === "Health" && renderHealth()}
            {activeSection === "Access" && renderAccess()}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPreview(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-5xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 bg-gray-900 text-white flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-black uppercase tracking-tight">
                    Record Verification
                  </h4>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest italic">
                    Ensure all data aligns with institutional standards
                  </p>
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-10 space-y-8">
                <div className="flex items-center gap-8 border-b border-gray-50 pb-8">
                  <div className="w-24 h-24 bg-gray-50 rounded-4xl border border-gray-100" />
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                      {formData.fullName || "Untitled Profile"}
                    </h3>
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-[0.2em] mb-4">
                      Pending Final Enrollment
                    </p>
                    <div className="flex gap-2">
                      {[
                        formData.class,
                        `ID: ${formData.admissionNumber}`,
                        formData.house,
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-50 text-[9px] font-black uppercase tracking-widest text-gray-400 rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Enrollment Impact
                  </p>
                  <div className="bg-emerald-50 p-6 rounded-3xl text-[10px] font-black text-emerald-700 leading-relaxed uppercase italic">
                    Proceeding will activate Student ID{" "}
                    {formData.admissionNumber}, generate the initial fee invoice
                    of $1,200.00, and provision portal credentials for both
                    student and guardian.
                  </div>
                </div>
              </div>

              <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex gap-4">
                <button
                  onClick={() => setShowPreview(false)}
                  className="flex-1 py-4 bg-white text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-gray-100 hover:bg-gray-50 transition-all"
                >
                  Revise Entry
                </button>
                <button
                  onClick={() => {
                    setShowPreview(false);
                    router.push("/dashboard/student");
                  }}
                  className="flex-1 py-4 bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all"
                >
                  {isConversion ? "Complete Conversion" : "Confirm Enrollment"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddStudentForm;
