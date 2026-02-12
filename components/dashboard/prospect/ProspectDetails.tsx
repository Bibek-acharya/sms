"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Calendar, 
  UserPlus, 
  RotateCcw, 
  XCircle, 
  Send, 
  Phone, 
  MessageSquare, 
  MoreVertical,
  UserCheck,
  FileText,
  MapPin,
  GraduationCap
} from "lucide-react";

interface TimelineEvent {
  id: string;
  type: "Conversion" | "Visit" | "Call" | "Meeting" | "Stage Change";
  title: string;
  description: string;
  date: string;
  user: string;
}

const ProspectDetails = ({ id }: { id: string }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [prospectStatus, setProspectStatus] = useState<"Active" | "Withdrawn" | "Reverted">("Active");

  const mockProspect = {
    id: id,
    name: "Benjamin Smith",
    parentName: "Richard Smith",
    email: "richard.s@example.com",
    phone: "+1 555 123 456",
    interestedClass: "Grade 9",
    intakeYear: "2026-2027",
    assignedCounselor: "Sarah Jones",
    stage: "Campus Visit" as const,
    source: "Website",
    leadRefId: "LD-5001",
    inquiryDate: "Feb 01, 2026",
    conversionDate: "Feb 08, 2026",
    notes:
      "Highly interested in the sports scholarship program. Benjamin is an state-level swimmer.",
    timeline: [
      {
        id: "1",
        type: "Stage Change" as const,
        title: "Stage Updated",
        description: "Moved to 'Campus Visit'",
        date: "Today, 10:00 AM",
        user: "Sarah Jones",
      },
      {
        id: "2",
        type: "Visit" as const,
        title: "Campus Tour Completed",
        description: "Visited science labs and Olympic pool",
        date: "Yesterday, 02:30 PM",
        user: "Admin Clerk",
      },
      {
        id: "3",
        type: "Conversion" as const,
        title: "Converted from Lead",
        description: "Transferred from CRM Lead LD-5001",
        date: "Feb 08, 11:20 AM",
        user: "System",
      },
    ],
  };

  const tabs = [
    { id: "overview", label: "Prospect Profile" },
    { id: "engagement", label: "Engagement Feed" },
    { id: "visit", label: "Visit & Counseling" },
    { id: "docs", label: "Pre-Admission Docs" },
  ];

  const getEventIcon = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "Conversion":
        return <UserCheck size={18} className="text-teal-600" />;
      case "Visit":
        return <Calendar size={18} className="text-orange-600" />;
      case "Call":
        return <Phone size={18} className="text-blue-600" />;
      case "Meeting":
        return <MoreVertical size={18} className="text-purple-600" />;
      case "Stage Change":
        return <RotateCcw size={18} className="text-indigo-600" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm font-sans">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <button
              onClick={() => router.back()}
              className="hover:text-teal-600 transition-all flex items-center gap-1.5"
            >
              <ArrowLeft size={12} />
              Prospects
            </button>
            <span>/</span>
            <span className="text-gray-800">Review</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-gray-800 tracking-tight">
              {mockProspect.name}
            </h1>
            <span className="px-3 py-1 bg-purple-50 text-purple-600 text-[10px] font-black uppercase rounded-xl tracking-wider">
              {mockProspect.stage}
            </span>
            {prospectStatus !== "Active" && (
              <span className={`px-3 py-1 ${prospectStatus === "Withdrawn" ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-600"} text-[10px] font-black uppercase rounded-xl tracking-wider animate-pulse`}>
                {prospectStatus}
              </span>
            )}
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
            Prospect ID: {id} • Lead Ref: {mockProspect.leadRefId}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 w-full lg:w-auto font-black uppercase tracking-widest text-[10px]">
          <div className="flex flex-1 lg:flex-none gap-2">
            <button className="flex-1 px-5 py-4 bg-teal-600 text-white rounded-2xl hover:bg-teal-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-100">
              <UserPlus size={14} /> Convert to Applicant
            </button>
            <button className="flex-1 px-5 py-4 bg-white text-gray-800 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
              <Calendar size={14} /> Visit
            </button>
          </div>
          
          <div className="flex gap-2 w-full lg:w-auto">
            <button title="Send Admission Form" className="flex-1 lg:flex-none p-4 bg-indigo-50 text-indigo-600 rounded-2xl hover:bg-indigo-100 transition-all">
              <Send size={18} />
            </button>
            <div className="relative group flex-1 lg:flex-none">
              <button className="w-full h-full p-4 bg-gray-50 text-gray-500 rounded-2xl hover:bg-gray-100 transition-all flex items-center justify-center">
                <MoreVertical size={18} />
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden hidden group-hover:block z-50">
                <button 
                  onClick={() => setProspectStatus("Withdrawn")}
                  className="w-full px-5 py-3 text-left hover:bg-rose-50 text-rose-500 flex items-center gap-3 transition-colors"
                >
                  <XCircle size={14} /> Withdraw Prospect
                </button>
                <button 
                  onClick={() => {
                    setProspectStatus("Reverted");
                    setTimeout(() => router.push("/dashboard/lead"), 1500);
                  }}
                  className="w-full px-5 py-3 text-left hover:bg-gray-50 text-gray-600 flex items-center gap-3 transition-colors border-t border-gray-50"
                >
                  <RotateCcw size={14} /> Revert to Lead
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-2 w-full lg:w-auto">
            <button className="flex-1 lg:w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center hover:bg-blue-100 transition-all">
              <Phone size={18} />
            </button>
            <button className="flex-1 lg:w-14 h-14 bg-gray-50 text-gray-500 rounded-2xl flex items-center justify-center hover:bg-gray-100 transition-all">
              <MessageSquare size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm font-sans">
            <h3 className="text-xs font-black text-gray-800 mb-6 uppercase tracking-wider">
              Prospect Origin
            </h3>
            <div className="space-y-4">
              {[
                {
                  label: "Original Source",
                  value: mockProspect.source,
                  icon: <MapPin size={12} />,
                },
                {
                  label: "Lead Created",
                  value: mockProspect.inquiryDate,
                  icon: <FileText size={12} />,
                },
                {
                  label: "Lead Converted",
                  value: mockProspect.conversionDate,
                  icon: <UserCheck size={12} />,
                },
                {
                  label: "Interested Program",
                  value: mockProspect.interestedClass,
                  icon: <GraduationCap size={12} />,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-1 p-3 rounded-2xl bg-gray-50/50"
                >
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <span className="text-teal-600">{item.icon}</span> {item.label}
                  </span>
                  <span className="text-xs font-bold text-gray-700 mt-0.5">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm font-sans">
            <h3 className="text-xs font-black text-gray-800 mb-6 uppercase tracking-wider">
              Assignment
            </h3>
            <div className="flex items-center gap-4 bg-teal-50/30 p-4 rounded-2xl border border-teal-50">
              <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-black text-sm shadow-md">
                SJ
              </div>
              <div>
                <p className="text-[9px] font-black text-teal-600 uppercase tracking-widest">
                  Admission Counselor
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {mockProspect.assignedCounselor}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Tabs */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-150 flex flex-col font-sans">
            <div className="flex border-b border-gray-50 bg-gray-50/30">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === tab.id
                      ? "text-teal-600 border-b-2 border-teal-600 bg-white"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-8 flex-1">
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <h4 className="text-[10px] font-black text-teal-600 uppercase tracking-widest">
                          Master Profile
                        </h4>
                        <div className="space-y-4">
                          {[
                            {
                              label: "Parent/Guardian",
                              value: mockProspect.parentName,
                            },
                            {
                              label: "Contact Phone",
                              value: mockProspect.phone,
                            },
                            {
                              label: "Email Address",
                              value: mockProspect.email,
                            },
                            {
                              label: "Expected Intake",
                              value: mockProspect.intakeYear,
                            },
                          ].map((item, i) => (
                            <div
                              key={i}
                              className="border-b border-gray-50 pb-2"
                            >
                              <p className="text-[9px] font-black text-gray-300 uppercase">
                                {item.label}
                              </p>
                              <p className="text-sm font-black text-gray-700">
                                {item.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-orange-50/50 p-6 rounded-3xl border border-orange-100">
                        <h4 className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-4">
                          Counselor Remarks
                        </h4>
                        <p className="text-sm font-medium text-gray-600 italic leading-relaxed">
                          &quot;{mockProspect.notes}&quot;
                        </p>
                        <div className="mt-6 flex justify-between items-center bg-white p-3 rounded-2xl border border-orange-50">
                          <span className="text-[9px] font-black text-orange-400 uppercase">
                            Update Note
                          </span>
                          <span className="text-[9px] font-bold text-gray-300 uppercase">
                            Feb 10
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "engagement" && (
                  <motion.div
                    key="engagement"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="relative pb-10"
                  >
                    <div className="absolute left-6 top-4 bottom-0 w-px bg-gray-100" />
                    <div className="space-y-10 relative">
                      {mockProspect.timeline.map((event) => (
                        <div key={event.id} className="flex gap-8 relative">
                          <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 text-lg flex items-center justify-center shadow-sm z-10 shrink-0">
                            {getEventIcon(event.type)}
                          </div>
                          <div className="pt-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="text-sm font-black text-gray-800 tracking-tight">
                                {event.title}
                              </h4>
                              <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">
                                {event.date}
                              </span>
                            </div>
                            <p className="text-xs font-medium text-gray-500 mb-2">
                              {event.description}
                            </p>
                            <div className="inline-flex items-center gap-2 px-2 py-1 bg-gray-50 rounded-lg">
                              <span className="text-[8px] font-black text-gray-400 uppercase">
                                Actioned By {event.user}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "visit" && (
                  <motion.div
                    key="visit"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
                          Last Visit Summary
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between text-xs font-bold text-gray-600 uppercase">
                            <span>Visit Date</span>
                            <span>Feb 09, 2026</span>
                          </div>
                          <div className="flex justify-between text-xs font-bold text-gray-600 uppercase">
                            <span>Status</span>
                            <span className="text-teal-600">Completed</span>
                          </div>
                          <div className="pt-4 border-t border-gray-200">
                            <p className="text-[9px] font-black text-gray-300 uppercase mb-1">
                              Result
                            </p>
                            <p className="text-xs font-medium text-gray-600 italic">
                              Very positive feedback on faculty interaction.
                            </p>
                          </div>
                        </div>
                      </div>
                      <button className="h-full border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center justify-center gap-2 hover:border-teal-500/20 hover:bg-teal-50/5 transition-all group">
                        <div className="w-10 h-10 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                          🗓️
                        </div>
                        <span className="text-[10px] font-black text-gray-400 uppercase group-hover:text-teal-600 tracking-widest">
                          New Session
                        </span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeTab === "docs" && (
                  <div className="flex flex-col items-center justify-center h-full opacity-30 py-20">
                    <span className="text-5xl mb-4">📂</span>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      No pre-admission documents uploaded
                    </p>
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

export default ProspectDetails;
