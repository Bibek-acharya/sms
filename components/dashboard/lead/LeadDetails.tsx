"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface TimelineEvent {
  id: string;
  type: "Status Change" | "Form Submission" | "Call" | "Note" | "Follow-up";
  title: string;
  description: string;
  date: string;
  user: string;
}

const mockLeadDetails = {
  id: "LD-5001",
  name: "Robert Fox",
  email: "robert.f@gmail.com",
  phone: "+1 455 678 901",
  source: "Website",
  stage: "Qualified" as const,
  assignedStaff: "Sarah Jones",
  createdDate: "Feb 08, 2026",
  timeline: [
    {
      id: "EV-1",
      type: "Status Change" as const,
      title: "Lead Stage Updated",
      description: "Moved from 'Cold' to 'New'",
      date: "Feb 10, 10:00 AM",
      user: "System",
    },
    {
      id: "EV-2",
      type: "Form Submission" as const,
      title: "Admission Inquiry Submitted",
      description: "Completed General Admission Template",
      date: "Feb 09, 02:30 PM",
      user: "Lead (Online)",
    },
    {
      id: "EV-3",
      type: "Call" as const,
      title: "Initial Callback",
      description: "Interested in Grade 10 Science Stream",
      date: "Feb 09, 04:00 PM",
      user: "Sarah Jones",
    },
  ],
  forms: [
    {
      id: "SF-101",
      templateName: "General Admission Inquiry",
      date: "Feb 09, 2026",
      status: "Completed" as const,
      data: {
        "Student Name": "Robert Fox Jr.",
        "Interested Grade": "Grade 10",
        Stream: "Science",
        "Parent Name": "Robert Fox",
        "Previous School": "North Hills Intl",
        "Reason for Transfer": "Relocation",
      },
    },
    {
      id: "SF-102",
      templateName: "Event Registration - Open House",
      date: "Jan 15, 2026",
      status: "Completed" as const,
      data: {
        Event: "Annual Open House",
        Attendees: "2 adults, 1 child",
        "Preferred Slot": "Morning Session",
      },
    },
  ],
};

const LeadDetails = ({ id }: { id: string }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedFormIndex, setSelectedFormIndex] = useState(0);

  const tabs = [
    { id: "overview", label: "Lead Profile" },
    { id: "timeline", label: "Activity Timeline" },
    { id: "forms", label: "Submitted Forms" },
    { id: "followup", label: "Follow-ups & Tasks" },
  ];

  const getEventIcon = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "Status Change":
        return "🔄";
      case "Form Submission":
        return "📄";
      case "Call":
        return "📞";
      case "Note":
        return "📝";
      case "Follow-up":
        return "📅";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm font-sans">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <button
              onClick={() => router.back()}
              className="hover:text-teal-600 transition-colors"
            >
              Leads
            </button>
            <span>/</span>
            <span className="text-gray-800">Details</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-gray-800 tracking-tight">
              {mockLeadDetails.name}
            </h1>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-xl tracking-wider">
              {mockLeadDetails.stage}
            </span>
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
            Lead ID: {id} • Source: {mockLeadDetails.source}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none px-6 py-3 bg-teal-50 text-teal-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-teal-100 transition-all">
            Submit New Form
          </button>
          {mockLeadDetails.stage === "Qualified" ? (
            <button
              onClick={() =>
                router.push(
                  `/dashboard/admission/new?fromProspect=${mockLeadDetails.id}`,
                )
              }
              className="flex-1 lg:flex-none px-6 py-3 bg-purple-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-700 shadow-lg shadow-purple-200 transition-all"
            >
              Convert to Admission
            </button>
          ) : (
            <button
              onClick={() =>
                router.push(
                  `/dashboard/admission/new?fromProspect=${mockLeadDetails.id}`,
                )
              }
              className="flex-1 lg:flex-none px-6 py-3 bg-gray-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black shadow-lg shadow-gray-200 transition-all"
            >
              Convert to Admission
            </button>
          )}
          <div className="flex gap-2 w-full lg:w-auto">
            <button className="p-3 bg-blue-50 text-blue-500 rounded-2xl flex-1 justify-center flex items-center">
              📞
            </button>
            <button className="p-3 bg-gray-50 text-gray-500 rounded-2xl flex-1 justify-center flex items-center">
              💬
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Quick Info & Conversion */}
        <div className="lg:col-span-4 space-y-6 text-sans">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-xs font-black text-gray-800 mb-6 uppercase tracking-wider">
              Lead Quick Info
            </h3>
            <div className="space-y-4">
              {[
                {
                  label: "Assigned To",
                  value: mockLeadDetails.assignedStaff,
                  icon: "👤",
                },
                {
                  label: "Created Date",
                  value: mockLeadDetails.createdDate,
                  icon: "📅",
                },
                {
                  label: "Contact No",
                  value: mockLeadDetails.phone,
                  icon: "📱",
                },
                {
                  label: "Email Address",
                  value: mockLeadDetails.email,
                  icon: "📧",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-1 p-3 rounded-2xl bg-gray-50/50"
                >
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <span>{item.icon}</span> {item.label}
                  </span>
                  <span className="text-xs font-bold text-gray-700">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#14B8A6] p-6 rounded-3xl shadow-lg shadow-teal-500/20 text-white">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">
              Conversion Status
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-black">Qualified Lead</span>
              <span className="text-[10px] font-bold px-2 py-1 bg-white/20 rounded-lg">
                85% Match
              </span>
            </div>
            <div className="w-full bg-white/20 h-2 rounded-full mb-6">
              <div className="w-[85%] bg-white h-full rounded-full" />
            </div>
            <button className="w-full py-3 bg-white text-teal-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-teal-50 transition-all">
              Start Admission
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic Content Tabs */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-150 flex flex-col">
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
                          Aggregated Profile Data
                        </h4>
                        <div className="space-y-4">
                          {[
                            { label: "Interested Class", value: "Grade 10" },
                            {
                              label: "Preferred Stream",
                              value: "Science (Medical)",
                            },
                            { label: "Parent Name", value: "Mr. Robert Fox" },
                            { label: "Academic Session", value: "2026-2027" },
                          ].map((item, i) => (
                            <div key={i}>
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
                      <div className="bg-gray-50 p-6 rounded-3xl">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
                          Latest Notes
                        </h4>
                        <p className="text-sm font-medium text-gray-600 italic leading-relaxed">
                          &quot;Lead called inquiring about the new robotics lab
                          and international faculty. Seems highly interested in
                          the Cambridge track options.&quot;
                        </p>
                        <div className="mt-6 flex justify-between items-center bg-white p-3 rounded-2xl">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[8px] font-bold text-blue-600">
                              SJ
                            </div>
                            <span className="text-[10px] font-bold text-gray-500 uppercase">
                              Sarah Jones
                            </span>
                          </div>
                          <span className="text-[9px] font-black text-gray-300 uppercase">
                            Feb 10
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "timeline" && (
                  <motion.div
                    key="timeline"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="relative pb-10"
                  >
                    <div className="absolute left-6 top-4 bottom-0 w-px bg-gray-100" />
                    <div className="space-y-10 relative">
                      {mockLeadDetails.timeline.map((event) => (
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
                                By {event.user}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "forms" && (
                  <motion.div
                    key="forms"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col lg:flex-row gap-6 h-full"
                  >
                    <div className="w-full lg:w-1/3 flex flex-col gap-3">
                      {mockLeadDetails.forms.map((form, idx) => (
                        <button
                          key={form.id}
                          onClick={() => setSelectedFormIndex(idx)}
                          className={`p-4 rounded-3xl border text-left transition-all ${
                            selectedFormIndex === idx
                              ? "bg-gray-800 border-gray-800 shadow-lg text-white"
                              : "bg-white border-gray-100 hover:border-gray-200 text-gray-500"
                          }`}
                        >
                          <p
                            className={`text-[8px] font-black uppercase mb-1 ${selectedFormIndex === idx ? "text-teal-400" : "text-gray-400"}`}
                          >
                            Submitted {form.date}
                          </p>
                          <h5 className="text-[10px] font-black uppercase tracking-wider">
                            {form.templateName}
                          </h5>
                        </button>
                      ))}
                    </div>
                    <div className="flex-1 bg-gray-50/50 rounded-3xl p-6 border border-gray-100">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">
                        Internal Form Draft
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                        {Object.entries(
                          mockLeadDetails.forms[selectedFormIndex].data,
                        ).map(([key, value]) => (
                          <div key={key}>
                            <label className="text-[9px] font-black text-gray-300 uppercase block mb-1">
                              {key}
                            </label>
                            <p className="text-xs font-black text-gray-700">
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-2">
                        <button className="text-[9px] font-black text-gray-400 uppercase tracking-widest px-4 py-2 hover:text-gray-600 transition-colors">
                          Edit Entries
                        </button>
                        <button className="text-[9px] font-black text-teal-600 uppercase tracking-widest px-4 py-2 bg-white rounded-xl shadow-sm border border-teal-100">
                          Print Form
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;
