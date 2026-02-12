"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface InquiryDetailsProps {
  id: string;
}

const InquiryDetails: React.FC<InquiryDetailsProps> = ({ id }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  // This would normally be fetched based on 'id'
  const record = {
    id: id,
    type: "Inquiry" as const,
    name: "Mark Thompson",
    phone: "+1 234 567 890",
    email: "mark.t@example.com",
    purpose: "Admission for Grade 12 (Science Stream)",
    assignedStaff: "Ms. Sarah (Admission Head)",
    date: "2026-02-10",
    time: "09:30 AM",
    status: "New" as const,
    priority: "High" as const,
    notes:
      "Parent inquired about international curriculum integration and lab facilities. Planning for a campus tour next week.",
    timeline: [
      { status: "Created", date: "Feb 10, 09:30 AM", user: "Receptionist A" },
      { status: "Assigned", date: "Feb 10, 10:00 AM", user: "Auto System" },
    ],
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "timeline", label: "Timeline" },
    { id: "communication", label: "Communication" },
    { id: "documents", label: "Related Docs" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <button
              onClick={() => router.back()}
              className="hover:text-teal-600 transition-colors"
            >
              Front Desk
            </button>
            <span>/</span>
            <span className="text-gray-800">Record {id}</span>
          </div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight flex items-center gap-3">
            {record.name}
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-xl tracking-wider">
              {record.type}
            </span>
          </h1>
        </div>
        <div className="flex gap-2">
          <button className="px-6 py-3 bg-gray-50 text-gray-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all">
            Edit
          </button>
          <button 
            onClick={() => router.push(`/dashboard/admission/new?fromInquiry=${record.id}`)}
            className="px-6 py-3 bg-purple-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all"
          >
            Convert to Student
          </button>
          <button className="px-6 py-3 bg-teal-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-teal-200 hover:bg-teal-700 transition-all">
            Resolve
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Quick Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-black text-gray-800 mb-6 uppercase tracking-wider">
              Contact Details
            </h3>
            <div className="space-y-4">
              {[
                { label: "Phone", value: record.phone, icon: "📞" },
                { label: "Email", value: record.email, icon: "✉️" },
                {
                  label: "Assigned To",
                  value: record.assignedStaff,
                  icon: "👤",
                },
                {
                  label: "Priority",
                  value: record.priority,
                  icon: "🚩",
                  color: "text-red-500",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-1 p-3 rounded-2xl bg-gray-50/50"
                >
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <span>{item.icon}</span> {item.label}
                  </span>
                  <span
                    className={`text-sm font-bold ${item.color || "text-gray-700"}`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
              Current Status
            </p>
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-blue-50 bg-blue-50/30 mb-4">
              <span className="text-blue-600 font-black text-lg">
                {record.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button className="p-3 bg-gray-50 rounded-2xl text-[10px] font-black text-gray-500 hover:bg-teal-50 hover:text-teal-600 transition-all">
                In Progress
              </button>
              <button className="p-3 bg-gray-50 rounded-2xl text-[10px] font-black text-gray-500 hover:bg-teal-50 hover:text-teal-600 transition-all">
                Closed
              </button>
            </div>
          </div>
        </div>

        {/* Middle/Right Column: Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden font-sans">
            <div className="flex border-b border-gray-50">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-6 py-4 text-xs font-black uppercase tracking-widest transition-all ${
                    activeTab === tab.id
                      ? "text-teal-600 border-b-2 border-teal-600 bg-teal-50/30"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6 min-h-100">
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div>
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                        Purpose of Visit / Inquiry
                      </h4>
                      <p className="text-lg font-black text-gray-800 leading-tight">
                        {record.purpose}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-3xl">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                        Internal Receptionist Notes
                      </h4>
                      <p className="text-sm font-medium text-gray-600 leading-relaxed italic">
                        &quot;{record.notes}&quot;
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-gray-100 p-5 rounded-3xl">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                          Arrival Time
                        </h4>
                        <p className="text-sm font-bold text-gray-700">
                          {record.time}
                        </p>
                      </div>
                      <div className="border border-gray-100 p-5 rounded-3xl">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                          Arrival Date
                        </h4>
                        <p className="text-sm font-bold text-gray-700">
                          {record.date}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "timeline" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    {record.timeline.map((item, idx) => (
                      <div key={idx} className="flex gap-4 relative">
                        {idx !== record.timeline.length - 1 && (
                          <div className="absolute left-6 top-10 bottom-0 w-0.5 bg-gray-100" />
                        )}
                        <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-black z-10 border-4 border-white shadow-sm">
                          {idx + 1}
                        </div>
                        <div className="flex-1 pt-1">
                          <p className="text-sm font-black text-gray-800">
                            {item.status}
                          </p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">
                            {item.date}
                          </p>
                          <div className="inline-flex items-center gap-2 px-2 py-1 bg-gray-50 rounded-lg">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
                              Updated by {item.user}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "communication" && (
                  <div className="flex flex-col items-center justify-center p-12 text-center opacity-40">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-2xl">
                      💬
                    </div>
                    <p className="text-sm font-black text-gray-400 uppercase tracking-widest">
                      No conversation logs yet
                    </p>
                  </div>
                )}

                {activeTab === "documents" && (
                  <div className="space-y-3">
                    <div className="p-4 border border-dashed border-gray-200 rounded-2xl flex items-center gap-4 hover:border-teal-200 transition-all cursor-pointer group">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                        📁
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-black text-gray-600">
                          Initial_Inquiry_Form.pdf
                        </p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">
                          Uploaded on Feb 10, 2026
                        </p>
                      </div>
                      <button className="text-[10px] font-black text-teal-600 uppercase">
                        View
                      </button>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryDetails;
