"use client";

import React, { useState } from "react";
import {
  Plus,
  X,
  Save,
  ArrowLeft,
  Camera,
  Shield,
  User,
  Briefcase,
  FileText,
  Lock,
  CheckCircle2,
  Info,
  ChevronRight,
  Upload,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

interface Permission {
  view: boolean;
  edit: boolean;
  approve: boolean;
  delete: boolean;
}

interface ModulePermissions {
  [key: string]: Permission;
}

const defaultPermissions: ModulePermissions = {
  Students: { view: true, edit: false, approve: false, delete: false },
  Staff: { view: false, edit: false, approve: false, delete: false },
  Exams: { view: false, edit: false, approve: false, delete: false },
  Attendance: { view: true, edit: false, approve: false, delete: false },
  Finance: { view: false, edit: false, approve: false, delete: false },
  Labs: { view: false, edit: false, approve: false, delete: false },
  Inquiry: { view: false, edit: false, approve: false, delete: false },
};

const AddStaffForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const staffIdFromUrl = searchParams.get("id");
  const isEditMode = !!staffIdFromUrl;

  const [activeSection, setActiveSection] = useState("Personal");
  const [permissions, setPermissions] =
    useState<ModulePermissions>(defaultPermissions);
  const [showPreview, setShowPreview] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: isEditMode ? "Sarah Johnson" : "",
    email: isEditMode ? "sarah.j@school.com" : "",
    phone: isEditMode ? "+1 234 567 8901" : "",
    employeeId: isEditMode ? "EMP-2026-042" : "",
    role: isEditMode ? "Teacher" : "Teacher",
    designation: isEditMode ? "Senior Teacher" : "",
    department: isEditMode ? "Science" : "Science",
    qualification: isEditMode ? "M.Sc Mathematics, B.Ed" : "",
    joiningDate: isEditMode ? "2024-08-15" : "",
    dob: isEditMode ? "1988-05-12" : "",
    gender: isEditMode ? "Female" : "Male",
    username: isEditMode ? "sarah_j_2026" : "",
    workShift: isEditMode
      ? "Morning (7:00 AM - 2:00 PM)"
      : "Morning (7:00 AM - 2:00 PM)",
  });

  const sections = ["Personal", "Professional", "Permissions", "Security"];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const togglePermission = (module: string, type: keyof Permission) => {
    setPermissions((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [type]: !prev[module][type],
      },
    }));
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
              Full Name
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              placeholder="e.g. Samir Raj"
              className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-xs font-bold placeholder:text-gray-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="samir@school.edu"
              className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-xs font-bold placeholder:text-gray-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Contact Number
            </label>
            <input
              type="tel"
              placeholder="+977 98XXXXXXXX"
              className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-xs font-bold placeholder:text-gray-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Gender
            </label>
            <select className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-xs font-bold focus:ring-2 focus:ring-emerald-500/20 transition-all appearance-none cursor-pointer">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
            Date of Birth
          </label>
          <input
            type="date"
            className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-xs font-bold focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
            Permanent Address
          </label>
          <input
            type="text"
            placeholder="Kathmandu, Nepal"
            className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-xs font-bold placeholder:text-gray-300"
          />
        </div>
      </div>

      <div className="bg-emerald-50/30 p-8 rounded-4xl border border-emerald-50 flex items-start gap-4">
        <Info size={18} className="text-emerald-600 shrink-0 mt-1" />
        <div>
          <h4 className="text-[11px] font-black text-emerald-900 uppercase tracking-widest mb-1">
            Emergency Contact Information
          </h4>
          <p className="text-[10px] font-medium text-emerald-600/70 mb-4 uppercase italic">
            Required for institutional safety protocols
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Contact Person Name"
              className="w-full bg-white/60 border border-emerald-100 rounded-xl p-3 text-xs font-bold placeholder:text-emerald-300"
            />
            <input
              type="tel"
              placeholder="Emergency Phone Number"
              className="w-full bg-white/60 border border-emerald-100 rounded-xl p-3 text-xs font-bold placeholder:text-emerald-300"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfessional = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
            Employee ID
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="STF-2026-001"
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs font-black uppercase tracking-widest focus:ring-0 cursor-not-allowed"
              disabled
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
              Auto
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
            Primary Designation
          </label>
          <select
            value={formData.role}
            onChange={(e) => handleInputChange("role", e.target.value)}
            className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-xs font-bold focus:ring-2 focus:ring-emerald-500/20 transition-all appearance-none cursor-pointer"
          >
            {[
              "Teacher",
              "Admin Staff",
              "Receptionist",
              "Lab Technician",
              "HR",
              "Exam Department",
              "Accounts",
              "Coordinator",
            ].map((role) => (
              <option key={role}>{role}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
            Department
          </label>
          <select
            value={formData.department}
            onChange={(e) => handleInputChange("department", e.target.value)}
            className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-xs font-bold appearance-none cursor-pointer"
          >
            <option>Science & Research</option>
            <option>Humanities</option>
            <option>Commerce</option>
            <option>Maintenance</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
            Date of Joining
          </label>
          <input
            type="date"
            value={formData.joiningDate}
            onChange={(e) => handleInputChange("joiningDate", e.target.value)}
            className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-xs font-bold"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
            Work Shift
          </label>
          <select
            value={formData.workShift}
            onChange={(e) => handleInputChange("workShift", e.target.value)}
            className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-xs font-bold"
          >
            <option>Morning (7:00 AM - 2:00 PM)</option>
            <option>Day (10:00 AM - 5:00 PM)</option>
            <option>Late (1:00 PM - 8:00 PM)</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
            Reporting Manager
          </label>
          <input
            type="text"
            placeholder="Search Manager..."
            className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-xs font-bold"
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
          Academic Credentials & Certifications
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-white border-2 border-dashed border-gray-100 rounded-4xl flex flex-col items-center justify-center text-center group hover:border-emerald-500 transition-all cursor-pointer">
            <Upload
              size={24}
              className="text-gray-200 group-hover:text-emerald-500 mb-2"
            />
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Upload Degree Proof
            </p>
            <p className="text-[8px] font-bold text-gray-300 mt-1 uppercase">
              PDF, JPG (Max 5MB)
            </p>
          </div>
          <div className="p-6 bg-white border-2 border-dashed border-gray-100 rounded-4xl flex flex-col items-center justify-center text-center group hover:border-emerald-500 transition-all cursor-pointer">
            <FileText
              size={24}
              className="text-gray-200 group-hover:text-emerald-500 mb-2"
            />
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Experience Certificate
            </p>
            <p className="text-[8px] font-bold text-gray-300 mt-1 uppercase">
              PDF, JPG (Max 5MB)
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPermissions = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gray-900 p-6 rounded-4xl text-white flex items-center justify-between shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -mr-16 -mt-16 rounded-full" />
        <div className="relative z-10">
          <h4 className="text-sm font-black uppercase tracking-tight mb-1">
            Role-Based Access Control (RBAC)
          </h4>
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest italic leading-none">
            Modify per-module system permissions for this individual account
          </p>
        </div>
        <Shield size={24} className="text-[#14B8A6] relative z-10" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="px-8 py-5 text-left text-[9px] font-black text-gray-400 uppercase tracking-widest">
                Module System
              </th>
              <th className="px-8 py-5 text-center text-[9px] font-black text-gray-400 uppercase tracking-widest">
                Read
              </th>
              <th className="px-8 py-5 text-center text-[9px] font-black text-gray-400 uppercase tracking-widest">
                Write
              </th>
              <th className="px-8 py-5 text-center text-[9px] font-black text-gray-400 uppercase tracking-widest">
                Approve
              </th>
              <th className="px-8 py-5 text-center text-[9px] font-black text-gray-400 uppercase tracking-widest">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {Object.keys(permissions).map((module) => (
              <tr
                key={module}
                className="hover:bg-gray-50/30 transition-colors"
              >
                <td className="px-8 py-5">
                  <span className="text-[11px] font-black text-gray-900 uppercase tracking-tight">
                    {module}
                  </span>
                </td>
                {(["view", "edit", "approve", "delete"] as const).map(
                  (type) => (
                    <td key={type} className="px-8 py-5 text-center">
                      <button
                        onClick={() => togglePermission(module, type)}
                        className={`p-2 rounded-lg transition-all ${
                          permissions[module][type]
                            ? "bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-100"
                            : "bg-gray-50 text-gray-200 border border-transparent"
                        }`}
                      >
                        {permissions[module][type] ? (
                          <Check size={14} strokeWidth={4} />
                        ) : (
                          <X size={14} />
                        )}
                      </button>
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Username / Staff ID
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                placeholder="samir.stf"
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs font-bold"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1 px-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Account Password
                </label>
                <button className="text-[10px] font-black text-emerald-500 uppercase tracking-widest italic">
                  Auto-Generate
                </button>
              </div>
              <input
                type="password"
                placeholder="••••••••••••"
                className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-xs font-bold"
              />
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-500">
                <Lock size={18} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-gray-900 uppercase leading-none mb-1">
                  Multi-Factor Authentication
                </p>
                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">
                  Highly Recommended for Admin Roles
                </p>
              </div>
              <div className="w-12 h-6 bg-emerald-500 rounded-full p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-md" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-8 bg-emerald-600 rounded-[2.5rem] text-white shadow-2xl shadow-emerald-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 -mr-16 -mt-16 rounded-full" />
            <h4 className="text-sm font-black uppercase tracking-tight mb-4 relative z-10">
              Notification Matrix
            </h4>
            <div className="space-y-4 relative z-10">
              {[
                { label: "SMS Alerts for Leaves", active: true },
                { label: "Email System Broadcasts", active: true },
                { label: "Login Activity Warnings", active: false },
                { label: "In-App Push Comms", active: true },
              ].map((pref, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-white/10 border border-white/10 rounded-xl"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    {pref.label}
                  </span>
                  <CheckCircle2
                    size={16}
                    className={pref.active ? "text-white" : "text-white/20"}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
          Internal Admin Remarks
        </h4>
        <textarea
          rows={3}
          placeholder="Add any specific onboarding notes..."
          className="w-full bg-gray-50 border-none rounded-2xl p-4 text-xs font-medium placeholder:text-gray-300 resize-none focus:ring-0"
        />
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
              href="/dashboard/staff"
              className="p-2 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-emerald-500 transition-all shadow-sm"
            >
              <ArrowLeft size={18} />
            </Link>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] italic">
              Personnel Management →{" "}
              {isEditMode ? "Modify Profile" : "Enrollment"}
            </span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight leading-none">
            {isEditMode ? "Update Member Record" : "Register New Personnel"}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-white text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-gray-100 hover:bg-gray-50 transition-all">
            Reset Matrix
          </button>
          <button
            onClick={() => setShowPreview(true)}
            className="px-8 py-3 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-gray-200 hover:bg-black transition-all flex items-center gap-2"
          >
            <Save size={14} />{" "}
            {isEditMode ? "Update Profile" : "Finalize Enrollment"}
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
                    ? "bg-emerald-600 text-white shadow-xl shadow-emerald-100"
                    : "text-gray-400 hover:bg-gray-50 hover:text-gray-600 font-bold"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center ${activeSection === s ? "bg-white/20" : "bg-gray-50"}`}
                  >
                    {s === "Personal" && <User size={14} />}
                    {s === "Professional" && <Briefcase size={14} />}
                    {s === "Permissions" && <Shield size={14} />}
                    {s === "Security" && <Lock size={14} />}
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
              Need help with onboarding? Consult the{" "}
              <span className="text-emerald-600 underline">
                Compliance Docs
              </span>
            </p>
          </div>
        </div>

        {/* Dynamic Form Content */}
        <div className="lg:col-span-3">
          <div className="bg-white p-10 rounded-5xl border border-gray-100 shadow-sm">
            {activeSection === "Personal" && renderPersonal()}
            {activeSection === "Professional" && renderProfessional()}
            {activeSection === "Permissions" && renderPermissions()}
            {activeSection === "Security" && renderSecurity()}
          </div>
        </div>
      </div>

      {/* Preview Modal Overlay */}
      <AnimatePresence>
        {showPreview && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
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
                    Ensure all data aligns with institutional payroll standards
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
                <div className="flex items-center gap-8 border-b border-gray-100 pb-8">
                  <div className="w-24 h-24 bg-gray-50 rounded-4xl border border-gray-100" />
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                      Candidate Profile
                    </h3>
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-[0.2em] mb-4">
                      Pending Enrollment Submission
                    </p>
                    <div className="flex gap-2">
                      {["Role: Teacher", "ID: Auto", "Dept: Science"].map(
                        (tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gray-50 text-[9px] font-black uppercase tracking-widest text-gray-400 rounded-lg"
                          >
                            {tag}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Enagement Agreement
                  </p>
                  <div className="bg-gray-50 p-6 rounded-3xl text-xs font-medium text-gray-600 leading-relaxed uppercase italic">
                    By clicking &quot;Confirm Enrollment&quot;, you authorize
                    the system to generate academic credentials, provision
                    payroll entries, and activate RBAC protocols across 07
                    institutional modules.
                  </div>
                </div>
              </div>

              <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex gap-4">
                <button
                  onClick={() => setShowPreview(false)}
                  className="flex-1 py-4 bg-white text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-gray-100 hover:bg-gray-50 transition-all"
                >
                  Revise Entries
                </button>
                <button
                  onClick={() => {
                    setShowPreview(false);
                    router.push("/dashboard/staff");
                  }}
                  className="flex-1 py-4 bg-[#14B8A6] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-teal-500/20 hover:bg-[#0D9488] transition-all"
                >
                  {isEditMode ? "Verify & Save" : "Confirm Enrollment"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddStaffForm;
