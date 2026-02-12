"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Prospect {
  id: string;
  name: string;
  interestedClass: string;
  parentContact: string;
  assignedCounselor: string;
  stage:
    | "New Prospect"
    | "Contacted"
    | "Campus Visit"
    | "Application In Progress"
    | "Offer Ready"
    | "Converted"
    | "Lost";
  lastInteraction: string;
  leadRefId: string;
  source: string;
}

const mockProspects: Prospect[] = [
  {
    id: "PR-2001",
    name: "Benjamin Smith",
    interestedClass: "Grade 9",
    parentContact: "+1 555 123 456",
    assignedCounselor: "Sarah Jones",
    stage: "Campus Visit",
    lastInteraction: "Today, 11:30 AM",
    leadRefId: "LD-5001",
    source: "Website",
  },
  {
    id: "PR-2002",
    name: "Sophia Garcia",
    interestedClass: "Grade 11",
    parentContact: "+1 555 987 654",
    assignedCounselor: "Sarah Jones",
    stage: "Offer Ready",
    lastInteraction: "Yesterday",
    leadRefId: "LD-5003",
    source: "Walk-in",
  },
];

const ProspectManagement = () => {
  const router = useRouter();
  const [filterStage, setFilterStage] = useState("All");

  const getStageStyles = (stage: Prospect["stage"]) => {
    switch (stage) {
      case "New Prospect":
        return "bg-blue-50 text-blue-600";
      case "Contacted":
        return "bg-indigo-50 text-indigo-600";
      case "Campus Visit":
        return "bg-purple-50 text-purple-600";
      case "Application In Progress":
        return "bg-amber-50 text-amber-600";
      case "Offer Ready":
        return "bg-teal-50 text-teal-600";
      case "Converted":
        return "bg-green-50 text-green-600";
      case "Lost":
        return "bg-red-50 text-red-600";
      default:
        return "bg-gray-50 text-gray-500";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">
            Prospects
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            Qualified candidates ready for admission
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <select className="bg-gray-50 border-none rounded-2xl text-xs font-black uppercase tracking-wider px-4 py-3 focus:ring-2 focus:ring-teal-500/20 transition-all">
            <option>AY 2026-27</option>
            <option>AY 2025-26</option>
          </select>
          <button 
            onClick={() => router.push("/dashboard/prospect/add")}
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
            Add Prospect
          </button>
        </div>
      </div>

      {/* Prospect Funnel Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          {
            label: "New Prospects",
            count: 24,
            color: "text-blue-500",
            bg: "bg-blue-50",
          },
          {
            label: "Contacted",
            count: 18,
            color: "text-indigo-500",
            bg: "bg-indigo-50",
          },
          {
            label: "Campus Visit",
            count: 12,
            color: "text-purple-500",
            bg: "bg-purple-50",
          },
          {
            label: "App In Progress",
            count: 8,
            color: "text-amber-500",
            bg: "bg-amber-50",
          },
          {
            label: "Offer Ready",
            count: 5,
            color: "text-teal-500",
            bg: "bg-teal-50",
          },
          {
            label: "Converted",
            count: 32,
            color: "text-green-500",
            bg: "bg-green-50",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-center group cursor-pointer"
          >
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 group-hover:text-teal-600 transition-colors line-clamp-1">
              {stat.label}
            </p>
            <span className={`text-xl font-black ${stat.color}`}>
              {stat.count}
            </span>
          </div>
        ))}
      </div>

      {/* Filters */}
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
            placeholder="Search prospects by name, phone or ID..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500/20 transition-all font-medium"
          />
        </div>
        <div className="flex gap-2">
          {["All", "New Prospect", "Campus Visit", "Offer Ready"].map(
            (stage) => (
              <button
                key={stage}
                onClick={() => setFilterStage(stage)}
                className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${filterStage === stage ? "bg-gray-800 text-white shadow-lg" : "bg-gray-50 text-gray-400 hover:bg-gray-100"}`}
              >
                {stage}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Prospect List */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Prospect Name
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Program Info
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Counselor
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                  Stage
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                  Lead Ref
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                  Last Interaction
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {mockProspects.map((prospect) => (
                <tr
                  key={prospect.id}
                  className="hover:bg-gray-50/50 transition-colors cursor-pointer group"
                  onClick={() =>
                    router.push(`/dashboard/prospect/${prospect.id}`)
                  }
                >
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-gray-800">
                        {prospect.name}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">
                        {prospect.id} • {prospect.parentContact}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-600">
                        {prospect.interestedClass}
                      </span>
                      <span className="text-[9px] font-black text-gray-400 uppercase">
                        Intake 2026
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-gray-500">
                      {prospect.assignedCounselor}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span
                      className={`px-2.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${getStageStyles(prospect.stage)}`}
                    >
                      {prospect.stage}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-[10px] font-black text-gray-300 uppercase underline cursor-help">
                      {prospect.leadRefId}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center text-[10px] font-bold text-gray-400 uppercase">
                    {prospect.lastInteraction}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(
                            `/dashboard/student/add?prospectId=${prospect.id}`,
                          );
                        }}
                        className="p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase px-4 border border-emerald-100 hover:bg-emerald-600 hover:text-white"
                      >
                        Convert
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/dashboard/prospect/${prospect.id}`);
                        }}
                        className="p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-teal-50 text-teal-600 rounded-xl text-[10px] font-black uppercase px-4"
                      >
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProspectManagement;
