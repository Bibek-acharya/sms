"use client";

import React, { useState } from "react";
import {
  Plus,
  Download,
  Calendar,
  FileText,
  TrendingUp,
  DollarSign,
  Wallet,
  Receipt,
  ArrowDownRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const FinanceManagement = () => {
  const [activeTab, setActiveTab] = useState<
    "Overview" | "Fees" | "Invoices" | "Payments" | "Expenses" | "Reports"
  >("Overview");

  const tabs = [
    { id: "Overview", icon: TrendingUp },
    { id: "Fees", icon: Wallet },
    { id: "Invoices", icon: FileText },
    { id: "Payments", icon: Receipt },
    { id: "Expenses", icon: ArrowDownRight },
    { id: "Reports", icon: Calendar },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
            Finance Management
          </h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
            Academic Year 2025-26 • Fiscal Hub
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
          <select className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest text-gray-600 focus:ring-0 cursor-pointer">
            <option>AY 2025-26</option>
            <option>AY 2024-25</option>
          </select>
          <div className="w-[1px] h-4 bg-gray-100" />
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all">
            Download Annual Report
          </button>
        </div>
      </div>

      {/* Modern Tabs */}
      <div className="bg-white border-b border-gray-100 -mx-6 px-6 sticky top-0 z-20">
        <div className="flex space-x-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 border-b-2 transition-all relative ${
                activeTab === tab.id
                  ? "border-emerald-600 text-emerald-600"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              <tab.icon size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                {tab.id}
              </span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "Overview" && <OverviewTab />}
            {activeTab === "Fees" && <FeesTab />}
            {activeTab === "Invoices" && <InvoicesTab />}
            {activeTab === "Payments" && <PaymentsTab />}
            {activeTab === "Expenses" && <ExpensesTab />}
            {activeTab === "Reports" && <ReportsTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const OverviewTab = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="lg:col-span-2 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            label: "Total Revenue",
            amount: "$452,800",
            trend: "+12.5%",
            icon: DollarSign,
            color: "emerald",
          },
          {
            label: "Fees Collected",
            amount: "$380,450",
            trend: "84%",
            icon: Wallet,
            color: "blue",
          },
          {
            label: "Total Expenses",
            amount: "$124,200",
            trend: "-2.3%",
            icon: ArrowDownRight,
            color: "rose",
          },
        ].map((kpi, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
          >
            <div
              className={`w-10 h-10 rounded-2xl ${
                kpi.color === "rose"
                  ? "bg-rose-50 text-rose-600"
                  : kpi.color === "blue"
                    ? "bg-blue-50 text-blue-600"
                    : "bg-emerald-50 text-emerald-600"
              } flex items-center justify-center mb-4`}
            >
              <kpi.icon size={20} />
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
              {kpi.label}
            </p>
            <div className="flex items-end justify-between">
              <h3 className="text-xl font-black text-gray-900">{kpi.amount}</h3>
              <span
                className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                  kpi.color === "rose"
                    ? "bg-rose-50 text-rose-600"
                    : "bg-emerald-50 text-emerald-600"
                }`}
              >
                {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider mb-6">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[
            {
              student: "Robert Fox",
              class: "10-A",
              amount: "+$1,250",
              time: "2 mins ago",
            },
            {
              student: "Jane Cooper",
              class: "8-C",
              amount: "+$850",
              time: "15 mins ago",
            },
            {
              student: "Cody Fisher",
              class: "12-B",
              amount: "-$3,200",
              time: "1 hour ago",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-2xl transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center font-black text-xs text-gray-400">
                  {item.student[0]}
                </div>
                <div>
                  <Link href="/dashboard/finance/student/ST-2001">
                    <h4 className="text-xs font-black text-gray-900 hover:text-emerald-600">
                      {item.student}
                    </h4>
                  </Link>
                  <p className="text-[10px] text-gray-500 font-bold">
                    {item.class}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-xs font-black text-gray-900">
                  {item.amount}
                </span>
                <span className="text-[9px] font-black uppercase text-gray-400 tracking-tighter">
                  {item.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8">
      <h3 className="text-sm font-black text-gray-900 uppercase mb-8">
        Revenue Growth
      </h3>
      <div className="space-y-6">
        {[
          { label: "Tuition", value: 75, color: "bg-emerald-500" },
          { label: "Transport", value: 45, color: "bg-blue-500" },
          { label: "Other", value: 30, color: "bg-amber-500" },
        ].map((bar, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
              <span>{bar.label}</span>
              <span>{bar.value}%</span>
            </div>
            <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
              <div
                className={`h-full ${bar.color}`}
                style={{ width: `${bar.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const FeesTab = () => (
  <div className="space-y-6">
    <div className="bg-emerald-50/50 p-6 rounded-[2.5rem] border border-emerald-100 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-200">
          <FileText size={20} />
        </div>
        <div>
          <h3 className="text-xs font-black text-emerald-900 uppercase">
            Fee Heads
          </h3>
          <p className="text-[10px] text-emerald-600 font-bold">
            Standardized structures for 2025-26
          </p>
        </div>
      </div>
      <button className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all">
        Add Structure
      </button>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 bg-white rounded-3xl border border-gray-100 p-6">
        <table className="w-full">
          <thead className="border-b border-gray-50">
            <tr>
              <th className="pb-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Fee Category
              </th>
              <th className="pb-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Frequency
              </th>
              <th className="pb-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[
              { name: "Global Tuition Fee", freq: "Monthly", amt: "$450" },
              { name: "Sports & Gym", freq: "Annual", amt: "$120" },
              { name: "Science Lab", freq: "Annual", amt: "$80" },
            ].map((item, i) => (
              <tr key={i}>
                <td className="py-4 text-xs font-black text-gray-900">
                  {item.name}
                </td>
                <td className="py-4 text-xs font-bold text-gray-500">
                  {item.freq}
                </td>
                <td className="py-4 text-right text-xs font-black text-emerald-600">
                  {item.amt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const InvoicesTab = () => (
  <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
    <div className="p-6 border-b border-gray-50 flex items-center justify-between">
      <h3 className="text-xs font-black text-gray-900 uppercase underline decoration-emerald-500 underline-offset-8">
        Active Invoices
      </h3>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-50 border-none rounded-xl px-4 py-2 text-xs focus:ring-0"
        />
        <button className="p-2 bg-gray-900 text-white rounded-xl">
          <Plus size={16} />
        </button>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Invoice
            </th>
            <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Student
            </th>
            <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Status
            </th>
            <th className="px-6 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {[
            { id: "INV-001", student: "Robert Fox", status: "Paid" },
            { id: "INV-002", student: "Jane Cooper", status: "Pending" },
          ].map((inv, i) => (
            <tr key={i}>
              <td className="px-6 py-4 text-xs font-black text-gray-900">
                {inv.id}
              </td>
              <td className="px-6 py-4">
                <Link href="/dashboard/finance/student/ST-2001">
                  <span className="text-xs font-black text-gray-900 hover:text-emerald-600 cursor-pointer">
                    {inv.student}
                  </span>
                </Link>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${inv.status === "Paid" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}
                >
                  {inv.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-gray-400 hover:text-gray-900">
                  <Download size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const PaymentsTab = () => (
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
    <div className="lg:col-span-3 bg-white rounded-3xl border border-gray-100 p-6">
      <h3 className="text-xs font-black text-gray-900 uppercase mb-6">
        Payment Reconciliation
      </h3>
      <div className="space-y-4">
        {[
          {
            ref: "TXN_9821",
            student: "Robert Fox",
            mode: "Online",
            amount: "$1,250",
          },
          {
            ref: "TXN_9820",
            student: "Jane Cooper",
            mode: "Cash",
            amount: "$850",
          },
        ].map((pay, i) => (
          <div
            key={i}
            className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                <Receipt size={18} />
              </div>
              <div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  {pay.ref}
                </span>
                <Link href="/dashboard/finance/student/ST-2001">
                  <h4 className="text-xs font-black text-gray-900 hover:text-emerald-600 cursor-pointer">
                    {pay.student}
                  </h4>
                </Link>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-xs font-black text-emerald-600">
                {pay.amount}
              </span>
              <span className="text-[9px] font-bold text-gray-400 uppercase">
                {pay.mode}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="bg-gray-900 text-white p-6 rounded-3xl h-fit">
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
        Audit Trail Active
      </p>
      <div className="space-y-4">
        <div className="p-3 bg-white/5 rounded-xl">
          <p className="text-[10px] text-gray-400 font-bold mb-1">
            Last Reconciled
          </p>
          <p className="text-xs font-black">Today, 10:30 AM</p>
        </div>
        <button className="w-full py-3 bg-white text-gray-900 rounded-xl text-[10px] font-black uppercase tracking-widest">
          View History
        </button>
      </div>
    </div>
  </div>
);

const ExpensesTab = () => (
  <div className="bg-white rounded-3xl border border-gray-100 p-8 text-center py-20">
    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 mx-auto mb-6">
      <ArrowDownRight size={32} />
    </div>
    <h3 className="text-sm font-black text-gray-900 uppercase mb-2">
      Expense Management
    </h3>
    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
      Connect to accounting software to sync expenses
    </p>
  </div>
);

const ReportsTab = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {["Collection Summary", "Outstanding Dues", "Salary Register"].map(
      (title, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-emerald-200 transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all">
            <Calendar size={20} />
          </div>
          <h3 className="text-xs font-black text-gray-900 uppercase mb-4">
            {title}
          </h3>
          <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline">
            Download PDF
          </button>
        </div>
      ),
    )}
  </div>
);

export default FinanceManagement;
