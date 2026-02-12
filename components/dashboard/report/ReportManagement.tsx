"use client";

import React, { useState } from "react";
import {
  Filter,
  Download,
  Plus,
  BarChart3,
  PieChart,
  GraduationCap,
  Wallet,
  Microscope,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  AlertCircle,
  CalendarDays,
  Printer,
  Share2,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ReportView = "Dashboard" | "Details" | "Generate";

interface ModuleReportCard {
  id: string;
  name: string;
  module: string;
  icon: React.ElementType;
  stats: {
    label: string;
    value: string;
    trend?: "up" | "down";
    trendValue?: string;
    status?: string;
  };
  color: string;
  status: "Final" | "Scheduled" | "Draft";
}

const moduleReports: ModuleReportCard[] = [
  {
    id: "REP-001",
    name: "Student Attendance Summary",
    module: "Attendance",
    icon: CalendarDays,
    stats: {
      label: "Absent Rate",
      value: "4.2%",
      trend: "down",
      trendValue: "1.2%",
    },
    color: "bg-blue-500",
    status: "Final",
  },
  {
    id: "REP-002",
    name: "Term 2 Examination Results",
    module: "Exams",
    icon: GraduationCap,
    stats: {
      label: "Avg. Score",
      value: "82/100",
      trend: "up",
      trendValue: "5.4%",
    },
    color: "bg-emerald-500",
    status: "Final",
  },
  {
    id: " REP-003",
    name: "Staff Payroll & Overtime",
    module: "Finance",
    icon: Wallet,
    stats: {
      label: "Total Payout",
      value: " रू 1.2M",
      trend: "up",
      trendValue: "2.1%",
    },
    color: "bg-amber-500",
    status: "Scheduled",
  },
  {
    id: "REP-004",
    name: "Lab Inventory Audit",
    module: "Labs",
    icon: Microscope,
    stats: { label: "Low Stock Items", value: "14 Items", status: "Alert" },
    color: "bg-purple-500",
    status: "Draft",
  },
];

const recentReports = [
  {
    id: "R-8821",
    name: "Monthly Revenue Report",
    module: "Finance",
    author: "Accountant",
    date: "Feb 08, 2026",
    status: "Final",
  },
  {
    id: "R-8822",
    name: "Grade 10-A Performance",
    module: "Exams",
    author: "Coordinator",
    date: "Feb 07, 2026",
    status: "Final",
  },
  {
    id: "R-8823",
    name: "Weekly Transport Log",
    module: "Operations",
    author: "Admin",
    date: "Feb 06, 2026",
    status: "Scheduled",
  },
  {
    id: "R-8824",
    name: "Teacher Peer Review",
    module: "HR",
    author: "Principal",
    date: "Feb 05, 2026",
    status: "Draft",
  },
];

const ReportManagement = () => {
  const [activeView, setActiveView] = useState<ReportView>("Dashboard");
  const [selectedReport, setSelectedReport] = useState<ModuleReportCard | null>(
    null,
  );
  const [filterModule, setFilterModule] = useState("All");

  const modules = [
    "All",
    "Students",
    "Staff",
    "Exams",
    "Attendance",
    "Finance",
    "Labs",
    "Admissions",
  ];

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Module Quick Select Icons */}
      <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar">
        {modules.map((m) => (
          <button
            key={m}
            onClick={() => setFilterModule(m)}
            className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
              filterModule === m
                ? "bg-gray-900 text-white border-gray-900 shadow-xl shadow-gray-200"
                : "bg-white text-gray-400 border-gray-100 hover:border-gray-300"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Report Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {moduleReports.map((report) => (
          <motion.div
            key={report.id}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer group"
            onClick={() => {
              setSelectedReport(report);
              setActiveView("Details");
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div
                className={`w-14 h-14 rounded-2xl ${report.color} text-white flex items-center justify-center shadow-lg`}
              >
                <report.icon size={26} />
              </div>
              <div
                className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                  report.status === "Final"
                    ? "bg-emerald-50 text-emerald-600"
                    : report.status === "Scheduled"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-gray-50 text-gray-400"
                }`}
              >
                {report.status}
              </div>
            </div>

            <h3 className="text-md font-black text-gray-900 uppercase tracking-tight mb-1 group-hover:text-[#14B8A6] transition-colors line-clamp-2">
              {report.name}
            </h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic mb-6">
              {report.module}
            </p>

            <div className="bg-gray-50/50 p-4 rounded-3xl space-y-2 border border-gray-50">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                {report.stats.label}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-black text-gray-900 tracking-tight">
                  {report.stats.value}
                </span>
                {report.stats.trend && (
                  <div
                    className={`flex items-center gap-1 text-[10px] font-bold ${report.stats.trend === "up" ? "text-emerald-500" : "text-rose-500"}`}
                  >
                    {report.stats.trend === "up" ? (
                      <ArrowUpRight size={12} />
                    ) : (
                      <ArrowDownRight size={12} />
                    )}
                    {report.stats.trendValue}
                  </div>
                )}
              </div>
            </div>

            <button className="w-full mt-6 py-3 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
              View Analytics
            </button>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">
              Recently Generated Reports
            </h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase italic mt-1">
              Audit log of system-wide reporting activity
            </p>
          </div>
          <button className="p-3 bg-white border border-gray-100 rounded-2xl shadow-sm hover:bg-gray-50 transition-all">
            <Filter size={18} className="text-gray-400" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-8 py-4 text-left text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  Report Name
                </th>
                <th className="px-8 py-4 text-left text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  Module
                </th>
                <th className="px-8 py-4 text-left text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  Generated By
                </th>
                <th className="px-8 py-4 text-left text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  Date
                </th>
                <th className="px-8 py-4 text-left text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-8 py-4 text-center text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentReports.map((report) => (
                <tr
                  key={report.id}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-8 py-6">
                    <p className="text-[11px] font-black text-gray-900 uppercase tracking-tight">
                      {report.name}
                    </p>
                    <p className="text-[9px] font-bold text-gray-300 italic">
                      {report.id}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-gray-100 rounded-lg text-[9px] font-black text-gray-500 uppercase">
                      {report.module}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-[11px] font-bold text-gray-500 uppercase tracking-tight">
                    {report.author}
                  </td>
                  <td className="px-8 py-6 text-[11px] font-bold text-gray-400 uppercase italic">
                    {report.date}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          report.status === "Final"
                            ? "bg-emerald-500"
                            : report.status === "Scheduled"
                              ? "bg-blue-500"
                              : "bg-amber-500"
                        }`}
                      />
                      <span className="text-[10px] font-black uppercase text-gray-600">
                        {report.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-emerald-500 transition-all border border-transparent hover:border-emerald-100 shadow-sm">
                        <Download size={16} />
                      </button>
                      <button className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-blue-500 transition-all border border-transparent hover:border-blue-100 shadow-sm">
                        <Share2 size={16} />
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

  const renderDetails = () => (
    <div className="space-y-8 animate-in slide-in-from-right duration-500">
      <div className="bg-white p-8 rounded-5xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-3xl bg-gray-900 text-white flex items-center justify-center shadow-2xl">
            {selectedReport && <selectedReport.icon size={30} />}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black text-[#14B8A6] uppercase tracking-widest">
                {selectedReport?.module} Dashboard
              </span>
              <span className="text-[10px] font-bold text-gray-300">•</span>
              <span className="text-[10px] font-bold text-gray-400 italic">
                ID: {selectedReport?.id}
              </span>
            </div>
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight leading-none">
              {selectedReport?.name}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-gray-100 transition-all">
            <Printer size={20} />
          </button>
          <button className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-gray-100 transition-all">
            <Share2 size={20} />
          </button>
          <button className="px-8 py-4 bg-gray-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-gray-200">
            Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Data Points",
            value: "4,281",
            sub: "Indexed entries",
            icon: Zap,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Success Rate",
            value: "98.2%",
            sub: "Data validation",
            icon: CheckCircle2,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "Alerts Flags",
            value: "03",
            sub: "Anomalies detected",
            icon: AlertCircle,
            color: "text-rose-600",
            bg: "bg-rose-50",
          },
          {
            label: "Generation Time",
            value: "0.4s",
            sub: "Cloud processed",
            icon: Clock,
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
        ].map((kpi, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm"
          >
            <div
              className={`w-12 h-12 rounded-2xl ${kpi.bg} ${kpi.color} flex items-center justify-center mb-4`}
            >
              <kpi.icon size={22} />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
              {kpi.label}
            </p>
            <h3 className="text-2xl font-black text-gray-900 leading-none mb-1">
              {kpi.value}
            </h3>
            <p className="text-[9px] font-bold text-gray-400 uppercase italic opacity-60 tracking-tight">
              {kpi.sub}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-5xl border border-gray-100 shadow-sm min-h-100 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">
              Trend Analysis
            </h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-gray-900 text-white rounded-lg text-[9px] font-black uppercase">
                Week
              </button>
              <button className="px-3 py-1 bg-gray-50 text-gray-400 rounded-lg text-[9px] font-black uppercase">
                Month
              </button>
            </div>
          </div>
          <div className="flex-1 w-full bg-gray-50/50 rounded-4xl border border-dashed border-gray-200 flex items-center justify-center group relative overflow-hidden">
            {/* Mock Chart Visualization */}
            <div className="absolute inset-0 p-8 flex items-end justify-between gap-4">
              {[40, 70, 45, 90, 65, 85, 30, 60, 95, 55, 75, 50].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.05, duration: 0.8 }}
                  className="flex-1 bg-linear-to-t from-[#14B8A6] to-teal-200 rounded-t-xl opacity-80 group-hover:opacity-100 transition-opacity relative"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-8 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="px-2 py-1 bg-gray-900 text-white text-[8px] font-black rounded-lg">
                      %{h}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            <BarChart3 size={40} className="text-gray-200" />
          </div>
        </div>

        <div className="bg-white p-8 rounded-5xl border border-gray-100 shadow-sm flex flex-col">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-8">
            Role Distribution
          </h3>
          <div className="flex-1 w-full bg-emerald-50/20 rounded-4xl border border-dashed border-emerald-100 flex items-center justify-center p-12">
            <div className="w-full aspect-square rounded-full border-20 border-gray-900 flex items-center justify-center relative shadow-2xl">
              <div className="text-center">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                  Impact
                </p>
                <h4 className="text-3xl font-black text-gray-900">74%</h4>
              </div>
              {/* Simulated segments */}
              <div className="absolute -inset-5 rounded-full border-20 border-emerald-500 border-r-transparent border-b-transparent rotate-45" />
            </div>
          </div>
          <div className="mt-8 space-y-3">
            {[
              { label: "Admin Access", value: "35%", color: "bg-gray-900" },
              {
                label: "Teacher Feedback",
                value: "45%",
                color: "bg-emerald-500",
              },
              {
                label: "Student Engagement",
                value: "20%",
                color: "bg-blue-500",
              },
            ].map((leg, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${leg.color}`} />
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    {leg.label}
                  </span>
                </div>
                <span className="text-[11px] font-black text-gray-900 uppercase">
                  {leg.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderGenerateForm = () => (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center">
        <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">
          Provision New Architecture
        </h2>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest italic">
          Configure parameters for automated data synthesis
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2">
              1. Origin Module
            </label>
            <div className="grid grid-cols-2 gap-3">
              {modules
                .filter((m) => m !== "All")
                .map((m) => (
                  <button
                    key={m}
                    className="p-6 bg-white border border-gray-100 rounded-3xl text-left hover:border-gray-900 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center mb-4 group-hover:bg-gray-900 group-hover:text-white transition-all">
                      <Zap size={18} />
                    </div>
                    <span className="text-[10px] font-black text-gray-900 uppercase tracking-tight">
                      {m}
                    </span>
                  </button>
                ))}
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2">
              2. Dynamic Parameters
            </label>
            <div className="space-y-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <div className="space-y-2">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  Time Spectrum
                </p>
                <select className="w-full bg-gray-50 border-none rounded-2xl p-4 text-[11px] font-black uppercase tracking-tight focus:ring-2 focus:ring-[#14B8A6]">
                  <option>Last 30 Dynamic Days</option>
                  <option>Current Academic Quarter</option>
                  <option>Annual Audit Cycle</option>
                  <option>Custom Range Matrix</option>
                </select>
              </div>
              <div className="space-y-2">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  Export Protocol
                </p>
                <div className="flex gap-2">
                  {["PDF v2", "Exc-XML", "CSV-Raw"].map((format) => (
                    <button
                      key={format}
                      className="flex-1 py-3 bg-gray-50 rounded-xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all"
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-3">
                  <PieChart size={18} className="text-emerald-600" />
                  <span className="text-[10px] font-black text-emerald-900 uppercase tracking-widest">
                    Include Visual Graphics
                  </span>
                </div>
                <div className="w-10 h-6 bg-[#14B8A6] rounded-full relative p-1 shadow-inner cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-md" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              className="w-full py-6 bg-gray-900 text-white rounded-4xl text-[12px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-gray-300 hover:bg-black transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => {
                const mockNewReport: ModuleReportCard = {
                  ...moduleReports[0],
                  id: "REP-" + Math.floor(Math.random() * 1000),
                  name: "New Synthetic Report",
                  status: "Draft",
                };
                setSelectedReport(mockNewReport);
                setActiveView("Details");
              }}
            >
              Synthesize Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen space-y-8 pb-12">
      {/* Dynamic Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pt-2">
        <div>
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-4">
            {activeView === "Dashboard" && "Intelligence Hub"}
            {activeView === "Details" && "Report Insight"}
            {activeView === "Generate" && "Provisioning"}
          </h1>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-gray-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg shadow-gray-200">
              Session 2026/27
            </span>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] italic">
              {activeView === "Dashboard"
                ? "Institutional Data Analysis & Export Control"
                : "Granular Module-Specific Analytics"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex bg-white p-2 rounded-2xl border border-gray-100 shadow-sm gap-1">
            {(["Dashboard", "Details", "Generate"] as ReportView[]).map((v) => (
              <button
                key={v}
                onClick={() => {
                  if (v === "Dashboard") setSelectedReport(null);
                  setActiveView(v);
                }}
                disabled={v === "Details" && !selectedReport}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeView === v
                    ? "bg-[#14B8A6] text-white shadow-xl shadow-teal-500/20"
                    : "text-gray-400 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <button
            onClick={() => setActiveView("Generate")}
            className="flex items-center gap-3 bg-gray-900 text-white px-8 py-5 rounded-3xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-gray-300 hover:bg-black transition-all group active:scale-95"
          >
            <Plus
              size={18}
              className="group-hover:rotate-90 transition-transform duration-500"
            />
            Provision Report
          </button>
        </div>
      </div>

      {/* Main Dynamic Workspace */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {activeView === "Dashboard" && renderDashboard()}
          {activeView === "Details" && selectedReport && renderDetails()}
          {activeView === "Generate" && renderGenerateForm()}
        </motion.div>
      </AnimatePresence>

      {/* Floating Action for Mobile */}
      <div className="fixed bottom-10 right-10 lg:hidden flex flex-col gap-4">
        <button className="w-16 h-16 bg-[#14B8A6] rounded-3xl text-white shadow-3xl flex items-center justify-center animate-bounce">
          <Plus size={32} />
        </button>
      </div>
    </div>
  );
};

export default ReportManagement;
