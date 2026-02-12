"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  UserPlus, 
  MapPin, 
  PhoneCall, 
  FileSearch, 
  Package, 
  UserCheck,
  ChevronLeft,
  Calendar,
  Clock,
  Send,
  Save,
  Plus,
  ArrowRight,
  Info,
  ShieldAlert,
  Search,
  MoreHorizontal
} from "lucide-react";

type InquiryTab = "basic" | "visitor" | "call" | "document" | "lostfound" | "assignment";

const NewInquiryForm = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<InquiryTab>("basic");

  const tabs: { id: InquiryTab; label: string; icon: React.ElementType; color: string }[] = [
    { id: "basic", label: "Basic Info", icon: UserPlus, color: "text-blue-500" },
    { id: "visitor", label: "Visitor Log", icon: MapPin, color: "text-purple-500" },
    { id: "call", label: "Call Log", icon: PhoneCall, color: "text-green-500" },
    { id: "document", label: "Doc Request", icon: FileSearch, color: "text-amber-500" },
    { id: "lostfound", label: "Lost & Found", icon: Package, color: "text-rose-500" },
    { id: "assignment", label: "Assignment", icon: UserCheck, color: "text-teal-500" },
  ];

  const handleNext = () => {
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-32">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="p-2.5 hover:bg-gray-50 rounded-2xl transition-colors text-gray-400 hover:text-teal-600"
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                <span>Inquiries</span>
                <span className="text-gray-300">/</span>
                <span className="text-teal-600">New Entry</span>
              </div>
              <h1 className="text-2xl font-black text-gray-900 mt-1">New Inquiry Entry</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button className="flex-1 md:flex-none px-6 py-2.5 bg-gray-50 text-gray-600 rounded-xl text-xs font-black uppercase tracking-widest border border-gray-100 hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                <Save size={16} /> Save Draft
             </button>
             <button className="flex-1 md:flex-none px-8 py-2.5 bg-teal-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-teal-500/20 hover:bg-teal-700 transition-all flex items-center justify-center gap-2">
                <Send size={16} /> Submit & Assign
             </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navigation - Desktop (Sidebar) */}
        <div className="lg:w-72 shrink-0">
          <div className="bg-white border border-gray-100 rounded-5xl p-4 shadow-sm sticky top-24">
            <div className="space-y-1.5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all group ${
                    activeTab === tab.id
                      ? "bg-teal-600 text-white shadow-xl shadow-teal-500/20"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <div className={`p-2 rounded-xl transition-colors ${
                    activeTab === tab.id ? "bg-white/20 text-white" : `bg-gray-100 ${tab.color} group-hover:bg-white`
                  }`}>
                    <tab.icon size={18} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-tight">{tab.label}</span>
                </button>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-50 px-4">
               <div className="p-4 bg-teal-50 rounded-2xl">
                  <p className="text-[10px] font-black text-teal-700 uppercase tracking-widest mb-1">Entry Status</p>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                     <span className="text-xs font-bold text-teal-800">Drafting Entry...</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-h-150">
          <div className="bg-white border border-gray-100 rounded-5xl shadow-sm overflow-hidden min-h-full">
             
             {/* BASIC INFO */}
             {activeTab === "basic" && (
                <div className="p-8 lg:p-12 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="mb-10">
                     <h2 className="text-xl font-black text-gray-900 tracking-tight">Basic Inquiry Info</h2>
                     <p className="text-sm text-gray-400 mt-1">Capture core details of the interested party</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Inquiry Type</label>
                           <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-700">
                              <option>Admission Inquiry</option>
                              <option>General Fee Inquiry</option>
                              <option>Document Request</option>
                              <option>Other / Misc</option>
                           </select>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Student Name (Optional)</label>
                           <input type="text" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold" placeholder="Future Student Name" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Grade Seeking</label>
                              <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold">
                                 <option>Grade 8</option>
                                 <option>Grade 9</option>
                                 <option>Grade 10</option>
                              </select>
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Academic Year</label>
                              <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold">
                                 <option>2025-26</option>
                                 <option>2026-27</option>
                              </select>
                           </div>
                        </div>
                     </div>

                     <div className="space-y-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Parent / Guardian Name</label>
                           <input type="text" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold" placeholder="e.g. John Smith" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Contact Number</label>
                              <input type="tel" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold" placeholder="+1..." />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                              <input type="email" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold" placeholder="parent@email.com" />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Source of Inquiry</label>
                           <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold">
                              <option>Website</option>
                              <option>Walk-in</option>
                              <option>Phone Call</option>
                              <option>Social Media</option>
                              <option>Referred By Staff/Parent</option>
                           </select>
                        </div>
                     </div>
                  </div>

                  <div className="mt-8">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Initial Remarks / Notes</label>
                     <textarea className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold min-h-32 mt-2" placeholder="Mention any specific details discussed..."></textarea>
                  </div>

                  <div className="mt-12 flex justify-end">
                     <button onClick={handleNext} className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center gap-3">
                        Continue to Visitor Log
                        <ArrowRight size={18} />
                     </button>
                  </div>
                </div>
             )}

             {/* VISITOR LOG */}
             {activeTab === "visitor" && (
                <div className="p-8 lg:p-12 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div className="flex items-center gap-4 mb-10">
                      <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shadow-sm">
                         <MapPin size={28} />
                      </div>
                      <div>
                         <h2 className="text-xl font-black text-gray-900 tracking-tight">Visitor Management</h2>
                         <p className="text-sm text-gray-400">Log on-campus visit details for walk-ins</p>
                      </div>
                   </div>

                   <div className="max-w-3xl space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Purpose of Visit</label>
                           <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold">
                              <option>Admission Inquiry</option>
                              <option>Fee Payment</option>
                              <option>Document Collection / Request</option>
                              <option>Meeting with Staff</option>
                              <option>Other</option>
                           </select>
                         </div>
                         <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Person / Dept Visited</label>
                           <input type="text" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold" placeholder="e.g. Admissions Office" />
                         </div>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                         <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Check-in Time</label>
                           <div className="relative">
                              <input type="time" className="w-full p-4 bg-gray-100/50 border-none rounded-2xl text-sm font-bold" />
                              <Clock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                           </div>
                         </div>
                         <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Check-out (Est)</label>
                           <div className="relative">
                              <input type="time" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold" />
                              <Clock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                           </div>
                         </div>
                         <div className="space-y-2 lg:col-span-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Follow-up Required?</label>
                           <div className="flex gap-4 p-1 bg-gray-50 rounded-2xl h-13">
                              {["Yes", "No"].map(opt => (
                                 <button key={opt} className={`flex-1 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${opt === "Yes" ? "bg-white text-purple-600 shadow-sm" : "text-gray-400"}`}>
                                    {opt}
                                 </button>
                              ))}
                           </div>
                         </div>
                      </div>

                      <div className="bg-purple-50/50 border border-purple-100 p-6 rounded-3xl flex gap-4">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-purple-600 shadow-sm shrink-0">
                            <Info size={20} />
                         </div>
                         <p className="text-xs font-bold text-purple-800 leading-relaxed">
                            Visitor logs are indexed automatically for security and can be accessed by the Campus Security head in real-time.
                         </p>
                      </div>

                      <div className="pt-8 border-t border-gray-50 flex justify-end">
                         <button onClick={handleNext} className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-3">
                            Next: Call & Log
                            <ArrowRight size={18} />
                         </button>
                      </div>
                   </div>
                </div>
             )}

             {/* CALL LOG */}
             {activeTab === "call" && (
                <div className="p-8 lg:p-12 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div className="mb-10">
                      <h2 className="text-xl font-black text-gray-900 tracking-tight">Call Records</h2>
                      <p className="text-sm text-gray-400 mt-1">Log telephone inquiries and outgoing follow-ups</p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-6">
                         <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Call Type</label>
                           <div className="grid grid-cols-2 gap-3">
                              <button className="p-4 bg-teal-50 border-2 border-teal-500 rounded-2xl flex flex-col items-center gap-2">
                                 <div className="w-8 h-8 bg-teal-500 text-white rounded-lg flex items-center justify-center">
                                    <Plus size={16} />
                                 </div>
                                 <span className="text-[10px] font-black uppercase tracking-widest text-teal-700">Incoming</span>
                              </button>
                              <button className="p-4 bg-gray-50 border-2 border-transparent rounded-2xl flex flex-col items-center gap-2 text-gray-400">
                                 <div className="w-8 h-8 bg-gray-200 text-white rounded-lg flex items-center justify-center">
                                    <Send size={16} />
                                 </div>
                                 <span className="text-[10px] font-black uppercase tracking-widest">Outgoing</span>
                              </button>
                           </div>
                         </div>
                         <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Contact Person</label>
                           <input type="text" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold" placeholder="Who you spoke to..." />
                         </div>
                         <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Call Purpose</label>
                           <textarea className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold min-h-24" placeholder="Summary of discussion..."></textarea>
                         </div>
                      </div>

                      <div className="space-y-6">
                         <div className="bg-gray-50 rounded-4xl p-8 border border-gray-100">
                            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                               <Calendar size={14} className="text-teal-600" />
                               Follow-up Scheduler
                            </h3>
                            <div className="space-y-6">
                               <div className="space-y-2">
                                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Target Date</label>
                                 <input type="date" className="w-full p-4 bg-white border-none rounded-2xl text-sm font-bold shadow-sm" />
                               </div>
                               <div className="space-y-2">
                                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Assigned Department</label>
                                 <select className="w-full p-4 bg-white border-none rounded-2xl text-sm font-bold shadow-sm">
                                    <option>Admissions Dept</option>
                                    <option>Accounting Office</option>
                                    <option>Academic Coordination</option>
                                 </select>
                               </div>
                               <button className="w-full py-4 bg-teal-600/10 text-teal-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-teal-600/20 transition-all border border-teal-600/10">
                                  Set Automatic Reminder
                               </button>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="mt-12 flex justify-between items-center">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">
                         Calls are logged for training and audit purposes.
                      </p>
                      <button onClick={handleNext} className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-3">
                         Next: Doc Request
                         <ArrowRight size={18} />
                      </button>
                   </div>
                </div>
             )}

             {/* DOCUMENT REQUESTS */}
             {activeTab === "document" && (
                <div className="p-8 lg:p-12 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div className="flex items-center justify-between mb-10">
                      <div>
                         <h2 className="text-xl font-black text-gray-900 tracking-tight">Document Requests</h2>
                         <p className="text-sm text-gray-400">Handle internal certificate or letter applications</p>
                      </div>
                      <div className="px-5 py-2.5 bg-amber-50 rounded-2xl border border-amber-100">
                         <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Priority Index: Low</span>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                      <div className="space-y-6">
                         <div className="space-y-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Requested Document Types</label>
                            <div className="grid grid-cols-1 gap-2">
                               {["Transfer Certificate (TC)", "Bonafide/Provisional Letter", "Character/Recommendation", "Previous Grade Transcripts", "Fee Non-Objection (NOC)"].map(doc => (
                                  <label key={doc} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-amber-50 transition-colors border-2 border-transparent hover:border-amber-200 group">
                                     <input type="checkbox" className="w-4 h-4 accent-amber-500 rounded border-none bg-white" />
                                     <span className="text-sm font-bold text-gray-700 group-hover:text-amber-900">{doc}</span>
                                     <MoreHorizontal size={16} className="ml-auto text-gray-300" />
                                  </label>
                               ))}
                            </div>
                         </div>
                      </div>

                      <div className="space-y-6">
                         <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Priority Selection</label>
                           <div className="flex gap-2">
                              {["Standard", "Urgent", "Critical"].map(level => (
                                 <button key={level} className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${level === "Standard" ? "bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-200" : "bg-white border-gray-100 text-gray-400 hover:border-amber-200"}`}>
                                    {level}
                                 </button>
                              ))}
                           </div>
                         </div>
                         <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Forward to Department</label>
                           <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold">
                              <option>Registrar / Admin Office</option>
                              <option>Head of Academics</option>
                              <option>Finance Manager</option>
                           </select>
                         </div>
                         <div className="p-6 bg-gray-50 rounded-3xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center gap-4 py-12">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-300">
                               <Plus size={24} />
                            </div>
                            <div>
                               <p className="text-xs font-black text-gray-500 uppercase tracking-tight">Drop Support Docs</p>
                               <p className="text-[10px] text-gray-300 mt-1">PDF, JPG up to 5MB</p>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="mt-12 flex justify-end">
                      <button onClick={handleNext} className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-3">
                         Next: Lost & Found
                         <ArrowRight size={18} />
                      </button>
                   </div>
                </div>
             )}

             {/* LOST & FOUND */}
             {activeTab === "lostfound" && (
                <div className="p-8 lg:p-12 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div className="flex items-center gap-4 mb-10">
                      <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center shadow-sm">
                         <Package size={28} />
                      </div>
                      <div>
                         <h2 className="text-xl font-black text-gray-900 tracking-tight">Lost & Found Record</h2>
                         <p className="text-sm text-gray-400">Log items found on campus or reported missing</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-6">
                         <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Item Description</label>
                           <input type="text" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold" placeholder="e.g. Blue backpack, Powerbank..." />
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                              <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold">
                                 <option>Bags & Backpacks</option>
                                 <option>Electronics</option>
                                 <option>Books / Stationary</option>
                                 <option>Clothing</option>
                                 <option>Other</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Date Found</label>
                              <input type="date" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold" />
                            </div>
                         </div>
                         <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Found Location</label>
                           <div className="relative">
                              <input type="text" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold pl-11" placeholder="e.g. Sports Cafeteria" />
                              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                           </div>
                         </div>
                      </div>

                      <div className="bg-rose-50/30 rounded-4xl p-8 border border-rose-100/50 flex flex-col">
                         <div className="flex items-center gap-3 mb-6">
                            <ShieldAlert className="text-rose-500" size={20} />
                            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Handler Assignment</h3>
                         </div>
                         <div className="space-y-6 flex-1">
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Custodian Staff</label>
                               <select className="w-full p-4 bg-white border-2 border-rose-100 rounded-2xl text-sm font-bold shadow-sm">
                                  <option>Security Head (Mike)</option>
                                  <option>Front Desk Admin</option>
                                  <option>Estate Manager</option>
                               </select>
                            </div>
                            <div className="p-4 bg-white rounded-2xl border border-rose-100 text-[10px] font-bold text-rose-800 italic leading-relaxed">
                               All electronics must be turned off and placed in the primary security vault until identified by owner.
                            </div>
                         </div>
                         <button onClick={handleNext} className="mt-8 py-4 bg-rose-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-rose-200">
                            Next: Final Assignment
                         </button>
                      </div>
                   </div>
                </div>
             )}

             {/* ASSIGNMENT & FOLLOW-UP */}
             {activeTab === "assignment" && (
                <div className="p-8 lg:p-12 animate-in fade-in slide-in-from-right-4 duration-500 text-center">
                   <div className="max-w-2xl mx-auto space-y-12">
                      <div className="space-y-4">
                         <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-[50%] flex items-center justify-center mx-auto mb-6 shadow-sm">
                            <UserCheck size={40} />
                         </div>
                         <h2 className="text-2xl font-black text-gray-900 tracking-tight">Final Assignment</h2>
                         <p className="text-sm text-gray-400 leading-relaxed">Assign this inquiry to the appropriate officer and set the initial progress status.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Assign to Officer</label>
                            <select className="w-full p-5 bg-gray-50 border-none rounded-2xl text-sm font-bold shadow-inner">
                               <option>Sarah Johnson (Admissions Head)</option>
                               <option>Daniel Ray (Senior Officer)</option>
                               <option>Maria Garcia (Front Desk)</option>
                            </select>
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Inquiry Status</label>
                            <div className="grid grid-cols-2 gap-2">
                               {["New", "In Progress", "Converted", "Not Interested"].map(stat => (
                                  <button key={stat} className={`p-4 rounded-xl text-[10px] font-black uppercase tracking-tight border-2 transition-all ${stat === "New" ? "bg-teal-500 text-white border-teal-500 shadow-lg" : "bg-white text-gray-400 border-gray-50"}`}>
                                     {stat}
                                  </button>
                               ))}
                            </div>
                         </div>
                      </div>

                      <div className="bg-gray-900 p-8 rounded-5xl text-white shadow-2xl relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-left">
                               <h3 className="text-lg font-black mb-1">Ready to sync?</h3>
                               <p className="text-xs text-white/50 leading-relaxed">This inquiry will be added to the timeline and notifications will be sent to the assigned officer.</p>
                            </div>
                            <button className="w-full md:w-auto px-10 py-5 bg-teal-500 text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3">
                               Confirm & Submit
                               <Search size={18} />
                            </button>
                         </div>
                      </div>

                      <div className="pt-8 border-t border-gray-50">
                         <button className="text-xs font-black text-gray-300 uppercase tracking-widest hover:text-gray-900 transition-colors">
                            Discard All Entry Data
                         </button>
                      </div>
                   </div>
                </div>
             )}
          </div>
        </div>
      </div>

      {/* MOBILE STEPS COUNTER - Floating */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/10 flex items-center gap-6 shadow-2xl lg:hidden z-50 w-[90%] max-w-sm">
         <div className="flex gap-1.5 shrink-0">
            {tabs.map((tab, idx) => (
               <div key={tab.id} className={`h-1 rounded-full transition-all duration-500 ${tabs.findIndex(t => t.id === activeTab) >= idx ? "w-4 bg-teal-500" : "w-1 bg-white/20"}`} />
            ))}
         </div>
         <div className="flex-1">
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Step {tabs.findIndex(t => t.id === activeTab) + 1} of 6</p>
            <p className="text-[10px] font-bold text-white uppercase">{tabs.find(t => t.id === activeTab)?.label}</p>
         </div>
         <button onClick={handleNext} className="w-10 h-10 bg-teal-500 text-white rounded-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
            <ArrowRight size={18} />
         </button>
      </div>
    </div>
  );
};

export default NewInquiryForm;
