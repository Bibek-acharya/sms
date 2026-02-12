"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Download,
  Receipt,
  FileText,
  CheckCircle2,
  TrendingUp,
  Tag,
} from "lucide-react";
import Link from "next/link";

const StudentFinanceDetails = () => {
  const [activeTab, setActiveTab] = useState<
    "Invoices" | "Payments" | "Scholarships"
  >("Invoices");

  const mockStudent = {
    id: "ST-2001",
    name: "Robert Fox",
    class: "Grade 10-A",
    totalFees: "$5,000",
    paidAmount: "$3,750",
    outstanding: "$1,250",
    scholarship: "Academic Merit (10%)",
    status: "Partially Paid",
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumbs & Actions */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/finance"
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center group-hover:border-gray-200 shadow-sm transition-all">
            <ArrowLeft size={16} />
          </div>
          <span className="text-xs font-black uppercase tracking-widest">
            Back to Finance
          </span>
        </Link>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">
            Print Summary
          </button>
          <button className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all">
            Collect Payment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-20 h-20 bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-center text-gray-400 font-black text-2xl mb-6 shadow-inner mx-auto">
                RF
              </div>
              <div className="text-center mb-8">
                <h2 className="text-xl font-black text-gray-900 leading-tight">
                  {mockStudent.name}
                </h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                  {mockStudent.id} • {mockStudent.class}
                </p>
                <div
                  className={`mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    mockStudent.status === "Paid"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${mockStudent.status === "Paid" ? "bg-emerald-500" : "bg-amber-500"}`}
                  />
                  {mockStudent.status}
                </div>
              </div>

              <div className="space-y-4 pt-8 border-t border-gray-50">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Academic Year
                  </span>
                  <span className="text-xs font-black text-gray-900">
                    2025-26
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Assigned Structure
                  </span>
                  <span className="text-xs font-black text-emerald-600">
                    Standard Grade 10
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] rotate-12">
              <Receipt size={160} />
            </div>
          </div>

          {/* Outstanding Alert */}
          <div className="bg-gray-900 text-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                Current Outstanding
              </p>
              <h3 className="text-4xl font-black mb-6">
                {mockStudent.outstanding}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <span>Next Due</span>
                  <span className="text-white">Feb 20, 2026</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[75%]" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 p-4 opacity-10">
              <TrendingUp size={100} />
            </div>
          </div>
        </div>

        {/* Tabbed Content */}
        <div className="lg:col-span-2 space-y-6 flex flex-col h-full">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Total Paid
                </p>
                <h4 className="text-xl font-black text-gray-900">
                  {mockStudent.paidAmount}
                </h4>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                <Tag size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Waivers Applied
                </p>
                <h4 className="text-xl font-black text-gray-900">$500</h4>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col grow">
            <div className="p-2 flex gap-1 border-b border-gray-50 bg-gray-50/30">
              {(["Invoices", "Payments", "Scholarships"] as const).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      activeTab === tab
                        ? "bg-white text-gray-900 shadow-sm border border-gray-100"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {tab}
                  </button>
                ),
              )}
            </div>

            <div className="p-6 grow overflow-y-auto">
              {activeTab === "Invoices" && (
                <div className="space-y-4">
                  {[
                    {
                      id: "INV-88210",
                      head: "Term 2 Tuition",
                      amount: "$1,250",
                      date: "Feb 05",
                      status: "Paid",
                    },
                    {
                      id: "INV-88211",
                      head: "Term 3 Tuition",
                      amount: "$1,250",
                      date: "Feb 20",
                      status: "Overdue",
                    },
                    {
                      id: "INV-88212",
                      head: "Laboratory Fee",
                      amount: "$250",
                      date: "Feb 15",
                      status: "Pending",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-gray-50/50 border border-transparent hover:border-gray-100 rounded-3xl flex items-center justify-between transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-emerald-500 transition-all">
                          <FileText size={18} />
                        </div>
                        <div>
                          <h5 className="text-xs font-black text-gray-900">
                            {item.head}
                          </h5>
                          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                            {item.id} • Due {item.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <span className="block text-xs font-black text-gray-900">
                            {item.amount}
                          </span>
                          <span
                            className={`text-[9px] font-black uppercase tracking-tighter ${
                              item.status === "Paid"
                                ? "text-emerald-500"
                                : "text-amber-500"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <button className="p-2 bg-white rounded-xl shadow-sm text-gray-400 hover:text-gray-900 transition-all opacity-0 group-hover:opacity-100">
                          <Download size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "Payments" && (
                <div className="space-y-4">
                  {[
                    {
                      id: "RCPT-501",
                      amount: "$1,250",
                      date: "Feb 06, 2026",
                      mode: "UPI",
                      ref: "TXN_7721A",
                    },
                    {
                      id: "RCPT-498",
                      amount: "$2,500",
                      date: "Dec 10, 2025",
                      mode: "Bank Transfer",
                      ref: "BNK_0012_X",
                    },
                  ].map((pay, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-emerald-50/30 border border-emerald-100/20 rounded-3xl flex items-center justify-between group cursor-pointer hover:bg-emerald-50/50 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                          <Receipt size={18} />
                        </div>
                        <div>
                          <h5 className="text-xs font-black text-gray-900">
                            {pay.id}
                          </h5>
                          <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                            {pay.date} • {pay.mode}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block text-xs font-black text-emerald-600">
                          {pay.amount}
                        </span>
                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">
                          REF: {pay.ref}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="p-8 border-2 border-dashed border-gray-100 rounded-[2.5rem] text-center">
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                      No more records found
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "Scholarships" && (
                <div className="space-y-6">
                  <div className="p-6 bg-purple-50 rounded-3xl border border-purple-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center">
                        <Tag size={20} />
                      </div>
                      <div>
                        <h5 className="text-xs font-black text-purple-900">
                          Academic Merit Scholarship
                        </h5>
                        <p className="text-[10px] text-purple-600 font-bold uppercase tracking-widest">
                          10% Ongoing Waiver
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/50 p-4 rounded-2xl">
                        <span className="text-[9px] font-black text-purple-400 uppercase tracking-widest block mb-1">
                          Total Discounted
                        </span>
                        <span className="text-sm font-black text-purple-900">
                          $500 / Year
                        </span>
                      </div>
                      <div className="bg-white/50 p-4 rounded-2xl">
                        <span className="text-[9px] font-black text-purple-400 uppercase tracking-widest block mb-1">
                          Approval ID
                        </span>
                        <span className="text-sm font-black text-purple-900">
                          ADM_FIN_2025_01
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h6 className="text-[10px] font-black text-gray-400 uppercase tracking-tight px-2">
                      History & Adjustments
                    </h6>
                    <div className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between">
                      <div className="text-[10px] font-bold text-gray-600 leading-relaxed uppercase tracking-widest">
                        Waiver applied to Tuition Fee Structure (Grade 10)
                      </div>
                      <span className="text-[9px] font-black text-gray-400">
                        Jan 12
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFinanceDetails;
