"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import FormTemplateBuilder from "./FormTemplateBuilder";

// --- Types ---

interface FormTemplate {
  id: string;
  name: string;
  purpose: string;
  status: "Active" | "Draft" | "Archived";
  fieldsCount: number;
  lastUpdated: string;
}

interface Lead {
  id: string;
  name: string;
  contact: string;
  email: string;
  source: "Walk-in" | "Website" | "Campaign" | "Referral";
  formsSubmitted: number;
  assignedStaff: string;
  stage: "New" | "Contacted" | "Follow-up" | "Qualified" | "Converted" | "Lost";
  lastActivity: string;
}

// --- Mock Data ---

const mockTemplates: FormTemplate[] = [
  {
    id: "TMP-001",
    name: "General Admission Inquiry",
    purpose: "Admission",
    status: "Active",
    fieldsCount: 12,
    lastUpdated: "2026-02-05",
  },
  {
    id: "TMP-002",
    name: "Summer Camp Registration",
    purpose: "Event",
    status: "Active",
    fieldsCount: 8,
    lastUpdated: "2026-01-20",
  },
  {
    id: "TMP-003",
    name: "Scholarship Application",
    purpose: "Campaign",
    status: "Draft",
    fieldsCount: 15,
    lastUpdated: "2026-02-09",
  },
];

const mockLeads: Lead[] = [
  {
    id: "LD-5001",
    name: "Robert Fox",
    contact: "+1 455 678 901",
    email: "robert.f@gmail.com",
    source: "Website",
    formsSubmitted: 2,
    assignedStaff: "Sarah Jones",
    stage: "New",
    lastActivity: "2 hours ago",
  },
  {
    id: "LD-5002",
    name: "Esther Howard",
    contact: "+1 455 678 902",
    email: "esther.h@outlook.com",
    source: "Campaign",
    formsSubmitted: 1,
    assignedStaff: "Admin Mike",
    stage: "Contacted",
    lastActivity: "1 day ago",
  },
  {
    id: "LD-5003",
    name: "Arlene McCoy",
    contact: "+1 455 678 903",
    email: "arlene.m@yahoo.com",
    source: "Walk-in",
    formsSubmitted: 3,
    assignedStaff: "Sarah Jones",
    stage: "Follow-up",
    lastActivity: "30 mins ago",
  },
  {
    id: "LD-5004",
    name: "Cameron Williamson",
    contact: "+1 455 678 904",
    email: "cam.w@gmail.com",
    source: "Referral",
    formsSubmitted: 1,
    assignedStaff: "Unassigned",
    stage: "Qualified",
    lastActivity: "3 days ago",
  },
];

const LeadManagement = () => {
  const router = useRouter();
  const [activeView, setActiveView] = useState<"leads" | "templates">("leads");
  const [showBuilder, setShowBuilder] = useState(false);

  const getStageStyles = (stage: Lead["stage"]) => {
    switch (stage) {
      case "New":
        return "bg-gray-100 text-gray-600";
      case "Contacted":
        return "bg-blue-50 text-blue-600";
      case "Follow-up":
        return "bg-amber-50 text-amber-600";
      case "Qualified":
        return "bg-purple-50 text-purple-600";
      case "Converted":
        return "bg-teal-50 text-teal-600";
      case "Lost":
        return "bg-red-50 text-red-600";
      default:
        return "bg-gray-50 text-gray-400";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">
            Lead Management
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            Capture and convert potential students & inquiries
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <select className="bg-gray-50 border-none rounded-2xl text-xs font-black uppercase tracking-wider px-4 py-3 focus:ring-2 focus:ring-teal-500/20">
            <option>AY 2026-27</option>
            <option>AY 2025-26</option>
          </select>
          <button 
            onClick={() => router.push("/dashboard/lead/new")}
            className="bg-[#14B8A6] text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-teal-500/20 hover:bg-[#0D9488] transition-all flex items-center gap-2"
          >
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
                strokeWidth="2.5"
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Lead
          </button>
        </div>
      </div>

      {/* Lead Pipeline Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          {
            label: "New Leads",
            count: 42,
            color: "text-gray-600",
            bg: "bg-gray-50",
          },
          {
            label: "Contacted",
            count: 28,
            color: "text-blue-500",
            bg: "bg-blue-50",
          },
          {
            label: "Follow-up",
            count: 15,
            color: "text-amber-500",
            bg: "bg-amber-50",
          },
          {
            label: "Qualified",
            count: 12,
            color: "text-purple-500",
            bg: "bg-purple-50",
          },
          {
            label: "Converted",
            count: 8,
            color: "text-teal-500",
            bg: "bg-teal-50",
          },
          { label: "Lost", count: 3, color: "text-red-500", bg: "bg-red-50" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-center group cursor-pointer"
          >
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 group-hover:text-teal-600 transition-colors">
              {stat.label}
            </p>
            <span className={`text-xl font-black ${stat.color}`}>
              {stat.count}
            </span>
          </div>
        ))}
      </div>

      {/* View Switcher Tabs */}
      <div className="flex bg-white p-1 rounded-2xl border border-gray-100 w-fit">
        <button
          onClick={() => setActiveView("leads")}
          className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeView === "leads" ? "bg-gray-800 text-white shadow-lg" : "text-gray-400 hover:text-gray-600"}`}
        >
          Lead List
        </button>
        <button
          onClick={() => setActiveView("templates")}
          className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeView === "templates" ? "bg-gray-800 text-white shadow-lg" : "text-gray-400 hover:text-gray-600"}`}
        >
          Form Templates
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeView === "leads" ? (
          <motion.div
            key="leads"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* List Filters */}
            <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search leads by name, email or ID..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500/20 transition-all font-medium"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                <button className="px-5 py-3 bg-gray-50 text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-transparent hover:border-gray-200">
                  Export
                </button>
                <button className="px-5 py-3 bg-gray-50 text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-transparent hover:border-gray-200">
                  Analytics
                </button>
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Lead Name
                      </th>
                      <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Source
                      </th>
                      <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Forms
                      </th>
                      <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Assignee
                      </th>
                      <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                        Stage
                      </th>
                      <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                        Last Activity
                      </th>
                      <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-sm">
                    {mockLeads.map((lead) => (
                      <tr
                        key={lead.id}
                        className="hover:bg-gray-50/50 transition-colors cursor-pointer group"
                        onClick={() =>
                          router.push(`/dashboard/lead/${lead.id}`)
                        }
                      >
                        <td className="px-6 py-5">
                          <div className="flex flex-col">
                            <span className="text-sm font-black text-gray-800">
                              {lead.name}
                            </span>
                            <span className="text-[10px] font-bold text-gray-400">
                              {lead.id} • {lead.contact}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="px-2.5 py-1 bg-gray-100 text-gray-500 rounded-lg text-[10px] font-black uppercase tracking-wider">
                            {lead.source}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className="w-6 h-6 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center text-[10px] font-black mx-auto">
                            {lead.formsSubmitted}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-xs font-bold text-gray-500">
                            {lead.assignedStaff}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span
                            className={`px-2.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${getStageStyles(lead.stage)}`}
                          >
                            {lead.stage}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center text-[10px] font-bold text-gray-400 uppercase">
                          {lead.lastActivity}
                        </td>
                        <td className="px-6 py-5 text-center">
                          <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-teal-50 text-teal-600 rounded-xl text-[10px] font-black uppercase px-4">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="templates"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Template Management Header */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">
                  Dynamic Form Templates
                </h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase">
                  Create and manage reusable form structures
                </p>
              </div>
              <button
                onClick={() => setShowBuilder(true)}
                className="bg-gray-800 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all"
              >
                Create New Template
              </button>
            </div>

            {/* Template List Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockTemplates.map((template) => (
                <div
                  key={template.id}
                  className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-teal-500/30 transition-all flex flex-col gap-4"
                >
                  <div className="flex justify-between items-start">
                    <span
                      className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase ${template.status === "Active" ? "bg-teal-50 text-teal-600" : "bg-amber-50 text-amber-600"}`}
                    >
                      {template.status}
                    </span>
                    <span className="text-[10px] font-bold text-gray-300 uppercase">
                      {template.id}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-gray-800 line-clamp-1">
                      {template.name}
                    </h4>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                      {template.purpose} Internal Form
                    </p>
                  </div>
                  <div className="flex items-center gap-4 py-3 border-y border-gray-50">
                    <div className="text-center flex-1">
                      <p className="text-[10px] font-black text-gray-300 uppercase">
                        Fields
                      </p>
                      <p className="text-sm font-black text-gray-800">
                        {template.fieldsCount}
                      </p>
                    </div>
                    <div className="w-px h-6 bg-gray-50" />
                    <div className="text-center flex-1">
                      <p className="text-[10px] font-black text-gray-300 uppercase">
                        Updated
                      </p>
                      <p className="text-[10px] font-black text-gray-800 uppercase">
                        {template.lastUpdated}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-3 bg-gray-50 text-gray-400 hover:bg-teal-50 hover:text-teal-600 rounded-2xl text-[9px] font-black uppercase transition-all">
                      Edit
                    </button>
                    <button className="flex-1 py-3 bg-gray-50 text-gray-400 hover:bg-teal-50 hover:text-teal-600 rounded-2xl text-[9px] font-black uppercase transition-all">
                      Preview
                    </button>
                    <button className="p-3 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center">
                      <svg
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBuilder && (
          <FormTemplateBuilder
            onSave={(data) => {
              console.log("Template Saved", data);
              setShowBuilder(false);
            }}
            onCancel={() => setShowBuilder(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeadManagement;
