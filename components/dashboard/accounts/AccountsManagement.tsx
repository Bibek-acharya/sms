"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Download,
  Filter,
  Calendar,
  FileText,
  TrendingUp,
  Receipt,
  ChevronRight,
  PieChart,
  BarChart3,
  Landmark,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AccountsManagement = () => {
  const [activeTab, setActiveTab] = useState<
    | "Overview"
    | "Chart of Accounts"
    | "Vouchers"
    | "Ledger"
    | "Bank & Cash"
    | "Financials"
  >("Overview");

  const tabs = [
    { id: "Overview", icon: TrendingUp },
    { id: "Chart of Accounts", icon: Settings },
    { id: "Vouchers", icon: Receipt },
    { id: "Ledger", icon: FileText },
    { id: "Bank & Cash", icon: Landmark },
    { id: "Financials", icon: BarChart3 },
  ] as const;

  return (
    <div className="space-y-6">
      {/* ERP Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
            Accounts & General Ledger
          </h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
            Audit-Ready • Fiscal Year 2025-26
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl">
            <Calendar size={14} className="text-gray-400" />
            <select className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest text-gray-600 focus:ring-0 cursor-pointer p-0">
              <option>FY 2025-26</option>
              <option>FY 2024-25</option>
            </select>
          </div>
          <button className="px-4 py-2 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-gray-200 hover:bg-black transition-all flex items-center gap-2">
            <Plus size={14} /> New Voucher
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
                  layoutId="activeTabIndicatorAccounts"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="relative min-h-125">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "Overview" && <OverviewTab />}
            {activeTab === "Chart of Accounts" && <ChartOfAccountsTab />}
            {activeTab === "Vouchers" && <VouchersTab />}
            {activeTab === "Ledger" && <LedgerTab />}
            {activeTab === "Bank & Cash" && <BankCashTab />}
            {activeTab === "Financials" && <FinancialsTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const OverviewTab = () => (
  <div className="space-y-6">
    {/* Summary Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {[
        { label: "Opening Balance", value: "$124,500", color: "gray" },
        {
          label: "Total Income",
          value: "$452,000",
          color: "emerald",
          trend: "+12%",
        },
        {
          label: "Total Expense",
          value: "$182,300",
          color: "rose",
          trend: "+5%",
        },
        { label: "Net Balance", value: "$269,700", color: "blue" },
        { label: "Cash on Hand", value: "$12,400", color: "amber" },
        { label: "Bank Balance", value: "$257,300", color: "indigo" },
      ].map((card, i) => (
        <div
          key={i}
          className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm transition-hover hover:shadow-md"
        >
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">
            {card.label}
          </p>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-gray-900 leading-none">
              {card.value}
            </h3>
            {card.trend && (
              <span
                className={`text-[8px] font-black px-1.5 py-0.5 rounded-full ${
                  card.color === "emerald"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-rose-50 text-rose-600"
                }`}
              >
                {card.trend}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xs font-black text-gray-900 uppercase">
            Recent Voucher Activity
          </h3>
          <button className="text-[10px] font-black text-emerald-600 uppercase hover:underline">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {[
            {
              id: "RV-2025-001",
              type: "Receipt",
              account: "Tuition Fees",
              amt: "$1,200",
              status: "Approved",
            },
            {
              id: "PV-2025-042",
              type: "Payment",
              account: "Utility Bill",
              amt: "$450",
              status: "Pending",
            },
            {
              id: "JV-2025-015",
              type: "Journal",
              account: "Depreciation",
              amt: "$800",
              status: "Approved",
            },
          ].map((v, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all border border-transparent hover:border-gray-100 group"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    v.type === "Receipt"
                      ? "bg-emerald-50 text-emerald-600"
                      : v.type === "Payment"
                        ? "bg-rose-50 text-rose-600"
                        : "bg-blue-50 text-blue-600"
                  }`}
                >
                  <Receipt size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-gray-900">
                    {v.account}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    {v.id} • {v.type}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-black text-gray-900">{v.amt}</p>
                <p
                  className={`text-[9px] font-black uppercase ${v.status === "Approved" ? "text-emerald-500" : "text-amber-500"}`}
                >
                  {v.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white">
        <h3 className="text-sm font-black uppercase mb-6">Financial Health</h3>
        <div className="space-y-8">
          <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-black uppercase text-gray-400 tracking-widest">
              <span>Budget Utilization</span>
              <span>78%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: "78%" }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-2xl">
              <p className="text-[9px] font-black text-gray-400 uppercase mb-1">
                Audit Score
              </p>
              <p className="text-xl font-black">9.8</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl">
              <p className="text-[9px] font-black text-gray-400 uppercase mb-1">
                Variance
              </p>
              <p className="text-xl font-black text-rose-400">-2.1%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ChartOfAccountsTab = () => (
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
    <div className="lg:col-span-3 bg-white rounded-3xl border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs font-black text-gray-900 uppercase">
          Hierarchical Structure
        </h3>
        <div className="flex gap-2">
          <button className="p-2 bg-gray-50 text-gray-400 rounded-xl hover:text-gray-900">
            <Download size={16} />
          </button>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">
            + Add Account
          </button>
        </div>
      </div>
      <div className="space-y-2">
        {(
          [
            {
              name: "Assets",
              code: "1000",
              type: "Header",
              children: [
                {
                  name: "Current Assets",
                  code: "1100",
                  type: "Header",
                  children: [
                    {
                      name: "Cash in Hand",
                      code: "1101",
                      type: "Cash",
                      bal: "$12,400",
                    },
                    {
                      name: "Main Bank Account",
                      code: "1102",
                      type: "Bank",
                      bal: "$257,300",
                    },
                  ],
                },
              ],
            },
            {
              name: "Liabilities",
              code: "2000",
              type: "Header",
              children: [
                {
                  name: "Accounts Payable",
                  code: "2100",
                  type: "Ledger",
                  bal: "$4,200",
                },
              ],
            },
            {
              name: "Income",
              code: "3000",
              type: "Header",
              children: [
                {
                  name: "Direct Income",
                  code: "3100",
                  type: "Header",
                  children: [
                    {
                      name: "Tuition Fees",
                      code: "3101",
                      type: "Ledger",
                      bal: "$380,450",
                    },
                  ],
                },
              ],
            },
          ] as AccountType[]
        ).map((node, i) => (
          <AccountNode key={i} node={node} level={0} />
        ))}
      </div>
    </div>
    <div className="space-y-4">
      <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100">
        <h4 className="text-[10px] font-black text-emerald-900 uppercase tracking-widest mb-4">
          Account Mapping
        </h4>
        <p className="text-[10px] text-emerald-700 font-bold mb-4">
          Map fee heads from context to chart accounts for auto-sync.
        </p>
        <button className="w-full py-2.5 bg-white text-emerald-700 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-200 shadow-sm">
          Configure Links
        </button>
      </div>
    </div>
  </div>
);

interface AccountType {
  name: string;
  code: string;
  type: string;
  bal?: string;
  children?: AccountType[];
}

const AccountNode = ({ node, level }: { node: AccountType; level: number }) => {
  const [isOpen, setIsOpen] = useState(true);
  const isHeader = node.type === "Header";

  return (
    <div className="select-none">
      <div
        onClick={() => isHeader && setIsOpen(!isOpen)}
        className={`flex items-center justify-between p-3 rounded-2xl transition-all ${
          isHeader ? "hover:bg-gray-50 cursor-pointer" : "pl-10 text-gray-500"
        }`}
      >
        <div className="flex items-center gap-3">
          {isHeader && (
            <ChevronRight
              size={14}
              className={`transition-transform duration-200 text-gray-400 ${isOpen ? "rotate-90" : ""}`}
            />
          )}
          {!isHeader && (
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          )}
          <div>
            <span
              className={`text-xs ${isHeader ? "font-black text-gray-900" : "font-bold"}`}
            >
              {node.name}
            </span>
            <span className="ml-2 text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
              #{node.code}
            </span>
          </div>
        </div>
        {node.bal && (
          <span className="text-xs font-black text-gray-900">{node.bal}</span>
        )}
      </div>
      {isHeader && isOpen && node.children && (
        <div className="ml-4 border-l border-gray-100">
          {node.children.map((child: AccountType, i: number) => (
            <AccountNode key={i} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const VouchersTab = () => (
  <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
    <div className="p-6 border-b border-gray-50 flex items-center justify-between">
      <div className="flex gap-4">
        {["All", "Receipt", "Payment", "Journal", "Contra"].map((f) => (
          <button
            key={f}
            className={`text-[10px] font-black uppercase tracking-widest pb-1 transition-all ${
              f === "All"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-gray-400 hover:text-gray-600 border-b-2 border-transparent"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={14}
          />
          <input
            type="text"
            placeholder="Voucher #..."
            className="bg-gray-50 border-none rounded-xl pl-9 pr-4 py-2 text-xs focus:ring-0 w-40"
          />
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-900">
          <Filter size={18} />
        </button>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50/50">
          <tr>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Date
            </th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Voucher #
            </th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Linked Accounts
            </th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
              Debit
            </th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
              Credit
            </th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {[
            {
              date: "10 Feb 2026",
              num: "JV-2025-015",
              accs: ["Depreciation", "Accum. Depr."],
              db: "$800.00",
              cr: "$800.00",
              status: "Approved",
            },
            {
              date: "09 Feb 2026",
              num: "RV-2025-001",
              accs: ["Bank Account", "Student Fees"],
              db: "$1,200.00",
              cr: "$1,200.00",
              status: "Approved",
            },
            {
              date: "08 Feb 2026",
              num: "PV-2025-042",
              accs: ["Utility Exp", "Cash Account"],
              db: "$450.00",
              cr: "$450.00",
              status: "Pending",
            },
          ].map((v, i) => (
            <tr
              key={i}
              className="hover:bg-gray-50/50 transition-all cursor-pointer group"
            >
              <td className="px-6 py-4">
                <span className="text-[10px] font-black text-gray-900 group-hover:text-emerald-600 transition-colors uppercase">
                  {v.date}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-xs font-black text-gray-900">
                  {v.num}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex -space-x-2">
                  {v.accs.map((a, idx) => (
                    <div
                      key={idx}
                      className="h-6 px-2 bg-gray-100 border border-white rounded-full flex items-center justify-center"
                    >
                      <span className="text-[8px] font-black text-gray-600 uppercase tracking-tight">
                        {a}
                      </span>
                    </div>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 text-right text-xs font-black text-gray-900">
                {v.db}
              </td>
              <td className="px-6 py-4 text-right text-xs font-black text-gray-900">
                {v.cr}
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-center">
                  <span
                    className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                      v.status === "Approved"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {v.status}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const LedgerTab = () => (
  <div className="space-y-6">
    <div className="bg-white p-6 rounded-3xl border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
      <div className="flex-1 w-full">
        <p className="text-[10px] font-black text-gray-400 uppercase mb-2">
          Select Account
        </p>
        <select className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-xs font-black text-gray-900 focus:ring-emerald-500/20">
          <option>1102 - Main Bank Account</option>
          <option>1101 - Cash in Hand</option>
          <option>3101 - Tuition Fees</option>
        </select>
      </div>
      <div className="flex-1 w-full">
        <p className="text-[10px] font-black text-gray-400 uppercase mb-2">
          Date Range
        </p>
        <div className="flex gap-2">
          <input
            type="date"
            className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-xs focus:ring-0 whitespace-nowrap"
          />
          <input
            type="date"
            className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-xs focus:ring-0"
          />
        </div>
      </div>
      <button className="md:mt-6 px-6 py-3 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all self-stretch md:self-auto">
        Filter Ledger
      </button>
    </div>

    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-50 bg-gray-50/30 grid grid-cols-3 gap-6">
        <div>
          <p className="text-[9px] font-black text-gray-400 uppercase mb-1 tracking-widest">
            Opening Bal
          </p>
          <p className="text-sm font-black text-gray-900">$245,000.00</p>
        </div>
        <div>
          <p className="text-[9px] font-black text-gray-400 uppercase mb-1 tracking-widest">
            Period Net
          </p>
          <p className="text-sm font-black text-emerald-600">+$12,300.00</p>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-black text-gray-400 uppercase mb-1 tracking-widest">
            Closing Bal
          </p>
          <p className="text-sm font-black text-gray-900">$257,300.00</p>
        </div>
      </div>
      <table className="w-full text-left">
        <thead className="bg-white">
          <tr>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Date
            </th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Reference
            </th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Description
            </th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
              Debit
            </th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
              Credit
            </th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
              Balance
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {[
            {
              date: "10 Feb 2026",
              ref: "RV-001",
              desc: "January Student Fees",
              db: "$1,200.00",
              cr: "-",
              bal: "$257,300.00",
            },
            {
              date: "05 Feb 2026",
              ref: "PV-042",
              desc: "Electric Bill Pay",
              db: "-",
              cr: "$450.00",
              bal: "$256,100.00",
            },
            {
              date: "01 Feb 2026",
              ref: "OB-000",
              desc: "Opening Balance",
              db: "$256,550.00",
              cr: "-",
              bal: "$256,550.00",
            },
          ].map((row, i) => (
            <tr key={i} className="group">
              <td className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase">
                {row.date}
              </td>
              <td className="px-6 py-4 text-xs font-black text-emerald-600">
                {row.ref}
              </td>
              <td className="px-6 py-4 text-xs font-bold text-gray-600">
                {row.desc}
              </td>
              <td className="px-6 py-4 text-right text-xs font-black text-gray-900">
                {row.db}
              </td>
              <td className="px-6 py-4 text-right text-xs font-black text-gray-900">
                {row.cr}
              </td>
              <td className="px-6 py-4 text-right text-xs font-black text-gray-900">
                {row.bal}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const BankCashTab = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {[
      {
        name: "Main Savings Account",
        institution: "Global Bank Intl",
        num: "**** 9821",
        bal: "$257,300.00",
        status: "Reconciled",
      },
      {
        name: "Petty Cash",
        institution: "Central Vault",
        num: "CASH-ID-01",
        bal: "$12,400.00",
        status: "Pending Rec.",
      },
    ].map((acc, i) => (
      <div
        key={i}
        className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-8">
          <Landmark
            size={48}
            className="text-gray-50 group-hover:text-emerald-50 transition-colors"
          />
        </div>
        <div className="relative">
          <span
            className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full mb-4 inline-block ${
              acc.status === "Reconciled"
                ? "bg-emerald-50 text-emerald-600"
                : "bg-amber-50 text-amber-600"
            }`}
          >
            {acc.status}
          </span>
          <h3 className="text-xl font-black text-gray-900 mb-1">{acc.name}</h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-8">
            {acc.institution} • {acc.num}
          </p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                Available Balance
              </p>
              <h4 className="text-3xl font-black text-gray-900 tracking-tight">
                {acc.bal}
              </h4>
            </div>
            <button className="px-6 py-3 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">
              Reconcile Now
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const FinancialsTab = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[
      {
        title: "Trial Balance",
        desc: "Account-wise Dr/Cr totals",
        icon: BarChart3,
      },
      {
        title: "Profit & Loss",
        desc: "Income vs Expense summary",
        icon: PieChart,
      },
      {
        title: "Balance Sheet",
        desc: "Current Assets & Liabilities",
        icon: FileText,
      },
    ].map((rpt, i) => (
      <div
        key={i}
        className="bg-white p-8 rounded-[2.5rem] border border-gray-100 hover:border-emerald-200 transition-all cursor-pointer group shadow-sm"
      >
        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner">
          <rpt.icon size={24} />
        </div>
        <h3 className="text-sm font-black text-gray-900 uppercase mb-2">
          {rpt.title}
        </h3>
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-8 leading-relaxed">
          {rpt.desc}
        </p>
        <div className="flex justify-between items-center bg-gray-50 p-2 rounded-xl group-hover:bg-emerald-50 transition-all">
          <span className="text-[8px] font-black uppercase text-gray-400 tracking-widest pl-2 group-hover:text-emerald-600">
            Download Excel
          </span>
          <button className="p-2 bg-white text-gray-900 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-all">
            <Download size={14} />
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default AccountsManagement;
