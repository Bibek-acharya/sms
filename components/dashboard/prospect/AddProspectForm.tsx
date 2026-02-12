"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  UserPlus, 
  Users, 
  Paperclip,
  ChevronLeft,
  Calendar,
  Clock,
  Plus,
  ArrowRight,
  Search,
  CheckCircle2,
  AlertCircle,
  Mail,
  Smartphone,
  MousePointer2,
  Trash2,
  Layout,
  MapPin,
  CalendarDays,
  Briefcase,
  GraduationCap,
  MessageSquare,
  ClipboardList
} from "lucide-react";
import FormTemplateBuilder from "../lead/FormTemplateBuilder";

type ProspectTab = "basic" | "parent" | "academic" | "assignment" | "custom" | "more";

const AddProspectForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromLead = searchParams.get("fromLead");
  
  const [activeTab, setActiveTab] = useState<ProspectTab>("basic");
  const [showBuilder, setShowBuilder] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const tabs: { id: ProspectTab; label: string; icon: React.ElementType; color: string }[] = [
    { id: "basic", label: "Prospect Info", icon: UserPlus, color: "text-blue-500" },
    { id: "parent", label: "Parent Info", icon: Users, color: "text-indigo-500" },
    { id: "academic", label: "Academic", icon: GraduationCap, color: "text-purple-500" },
    { id: "assignment", label: "Assignment", icon: MessageSquare, color: "text-teal-500" },
    { id: "custom", label: "Custom Form", icon: Layout, color: "text-pink-500" },
    { id: "more", label: "Attachments", icon: Paperclip, color: "text-slate-500" },
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
              className="p-2.5 hover:bg-gray-50 rounded-2xl transition-colors text-gray-400 hover:text-indigo-600"
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                <span>Leads</span>
                <span className="text-gray-300">/</span>
                <span>Prospects</span>
                <span className="text-gray-300">/</span>
                <span className="text-indigo-600 underline underline-offset-4 decoration-2">Add New</span>
              </div>
              <h1 className="text-2xl font-black text-gray-900 mt-1">Add New Prospect</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button className="flex-1 md:flex-none px-6 py-2.5 bg-gray-50 text-gray-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-gray-100 hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                <CheckCircle2 size={16} /> Save Draft
             </button>
             <button className="flex-1 md:flex-none px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                <GraduationCap size={16} /> Convert to Student
             </button>
          </div>
        </div>
      </div>

      {fromLead && (
        <div className="mb-8 p-4 bg-teal-50 border border-teal-100 rounded-2xl flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white">
                 <LinkIcon size={16} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-teal-800 uppercase tracking-widest">Linked Lead</p>
                 <p className="text-xs font-bold text-teal-700">Pre-filled from Lead Reference: #{fromLead}</p>
              </div>
           </div>
           <button className="text-[10px] font-black text-teal-600 uppercase tracking-widest border-b border-teal-200">Reset Form</button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navigation - Sidebar */}
        <div className="lg:w-72 shrink-0">
          <div className="bg-white border border-gray-100 rounded-5xl p-4 shadow-sm sticky top-24">
            <div className="space-y-1.5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all group ${
                    activeTab === tab.id
                      ? "bg-indigo-600 text-white shadow-xl shadow-indigo-500/20"
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
               <div className="p-4 bg-purple-50 rounded-2xl">
                  <p className="text-[10px] font-black text-purple-700 uppercase tracking-widest mb-1">Prospect Readiness</p>
                  <div className="flex items-center justify-between">
                     <span className="text-xs font-bold text-purple-800">75% Ready</span>
                     <div className="w-12 h-1.5 bg-purple-200 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-purple-600" />
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-h-150">
          <div className="bg-white border border-gray-100 rounded-5xl shadow-sm overflow-hidden min-h-full">
             
             {/* PROSPECT INFO */}
             {activeTab === "basic" && (
                <div className="p-8 lg:p-12 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="mb-10">
                     <h2 className="text-xl font-black text-gray-900 tracking-tight">Prospect Basic Info</h2>
                     <p className="text-sm text-gray-400 mt-1">Foundational personal information for the candidate</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Prospect Full Name</label>
                           <input type="text" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold" placeholder="e.g. Emily Watson" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Gender</label>
                              <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold appearance-none">
                                 <option>Female</option>
                                 <option>Male</option>
                                 <option>Other</option>
                              </select>
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Date of Birth</label>
                              <div className="relative">
                                 <input type="date" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold" />
                              </div>
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Contact Details</label>
                           <div className="grid grid-cols-1 gap-4">
                              <div className="relative">
                                 <input type="tel" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold pl-11" placeholder="Student Phone (optional)" />
                                 <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                              </div>
                              <div className="relative">
                                 <input type="email" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold pl-11" placeholder="Student Email (optional)" />
                                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="space-y-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Residential Address</label>
                           <div className="relative">
                              <textarea className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold min-h-32 pl-11" placeholder="Enter complete address..."></textarea>
                              <MapPin className="absolute left-4 top-6 text-gray-400" size={18} />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Internal Remarks</label>
                           <textarea className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold min-h-24" placeholder="Specific notes about the prospect..."></textarea>
                        </div>
                     </div>
                  </div>

                  <div className="mt-12 flex justify-end">
                     <button onClick={handleNext} className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-3">
                        Parent / Guardian Info
                        <ArrowRight size={18} />
                     </button>
                  </div>
                </div>
             )}

             {/* PARENT INFO */}
             {activeTab === "parent" && (
                <div className="p-8 lg:p-12 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="mb-10">
                     <h2 className="text-xl font-black text-gray-900 tracking-tight">Parent / Guardian Info</h2>
                     <p className="text-sm text-gray-400 mt-1">Contact and correspondence details for the legal guardian</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Guardian Full Name</label>
                           <input type="text" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold" placeholder="e.g. Michael Watson" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Relationship</label>
                           <div className="grid grid-cols-3 gap-3">
                              {["Father", "Mother", "Guardian"].map(rel => (
                                 <label key={rel} className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-2xl border-2 border-transparent hover:border-indigo-500/20 cursor-pointer transition-all has-checked:border-indigo-600 has-checked:bg-indigo-50">
                                    <input type="radio" name="relationship" className="hidden" defaultChecked={rel === "Father"} />
                                    <span className="text-[10px] font-black uppercase tracking-tight">{rel}</span>
                                 </label>
                              ))}
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Contact Number</label>
                              <div className="relative">
                                 <input type="tel" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold pl-11" placeholder="+1..." />
                                 <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                              </div>
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                              <div className="relative">
                                 <input type="email" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold pl-11" placeholder="parent@email.com" />
                                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="space-y-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Occupation (Optional)</label>
                           <div className="relative">
                              <input type="text" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold pl-11" placeholder="Business / Salaried" />
                              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Communication Preference</label>
                           <div className="grid grid-cols-3 gap-3">
                              {["WhatsApp", "Email", "Call"].map(pref => (
                                 <label key={pref} className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-2xl border-2 border-transparent hover:border-indigo-500/20 cursor-pointer transition-all has-checked:border-indigo-600 has-checked:bg-indigo-50">
                                    <input type="checkbox" name="commPref" className="hidden" />
                                    <span className="text-[10px] font-black uppercase tracking-tight">{pref}</span>
                                 </label>
                              ))}
                           </div>
                        </div>
                        <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 flex gap-4 mt-4">
                           <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
                              <AlertCircle size={20} />
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-indigo-800 uppercase tracking-widest mb-1">Notice</p>
                              <p className="text-xs text-indigo-700/70 italic leading-relaxed">System will prioritize WhatsApp for automated reminders.</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="mt-12 flex justify-end">
                     <button onClick={handleNext} className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-3">
                        Academic Interest
                        <ArrowRight size={18} />
                     </button>
                  </div>
                </div>
             )}

             {/* ACADEMIC INTEREST */}
             {activeTab === "academic" && (
                <div className="p-8 lg:p-12 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="mb-10">
                     <h2 className="text-xl font-black text-gray-900 tracking-tight">Academic Interest</h2>
                     <p className="text-sm text-gray-400 mt-1">Target grade, program, and enrollment status</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Target Grade / Program</label>
                           <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold appearance-none">
                              <option>Grade 8 - Middle School</option>
                              <option>Grade 9 - High School</option>
                              <option>Grade 10 - High School</option>
                              <option>Diploma in Arts</option>
                           </select>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Academic Session</label>
                           <div className="relative">
                              <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold appearance-none pl-11">
                                 <option>Session 2026-27</option>
                                 <option>Session 2027-28</option>
                              </select>
                              <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Section Preference (Optional)</label>
                           <input type="text" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold" placeholder="e.g. Science Section A" />
                        </div>
                     </div>

                     <div className="space-y-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Current Status</label>
                           <div className="grid grid-cols-2 gap-3">
                              {["New", "Contacted", "In Progress", "Ready"].map(status => (
                                 <label key={status} className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-2xl border-2 border-transparent hover:border-indigo-500/20 cursor-pointer transition-all has-checked:border-indigo-600 has-checked:bg-indigo-50">
                                    <input type="radio" name="status" className="hidden" defaultChecked={status === "New"} />
                                    <span className="text-[10px] font-black uppercase tracking-tight">{status}</span>
                                 </label>
                              ))}
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Subjects / Streams Interest</label>
                           <div className="p-4 bg-gray-50 rounded-2xl space-y-3">
                              {["Sciences", "Commerce", "Humanities", "Computing"].map(sub => (
                                 <div key={sub} className="flex items-center gap-2">
                                    <input type="checkbox" className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500" />
                                    <span className="text-xs font-bold text-gray-700">{sub}</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="mt-12 flex justify-end">
                     <button onClick={handleNext} className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-3">
                        Assignment & Follow-up
                        <ArrowRight size={18} />
                     </button>
                  </div>
                </div>
             )}

             {/* ASSIGNMENT & FOLLOW-UP */}
             {activeTab === "assignment" && (
                <div className="p-8 lg:p-12 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div className="flex items-center justify-between mb-10">
                      <div>
                         <h2 className="text-xl font-black text-gray-900 tracking-tight">Assignment & Follow-up</h2>
                         <p className="text-sm text-gray-400">Delegate this prospect and schedule the next action</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-6">
                         <div className="space-y-2 text-left">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Assign to Admissions Officer</label>
                            <div className="relative group">
                               <input type="text" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold pl-11" placeholder="Search staff..." />
                               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            </div>
                            <div className="grid grid-cols-1 gap-2 mt-4">
                               {["Sarah Johnson", "Robert Smith", "Maria Garcia"].map(staff => (
                                  <button key={staff} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all text-left group">
                                     <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-[10px]">
                                        {staff.charAt(0)}
                                     </div>
                                     <span className="text-xs font-bold text-gray-600 group-hover:text-indigo-900">{staff}</span>
                                  </button>
                               ))}
                            </div>
                         </div>
                      </div>

                      <div className="space-y-8">
                         <div className="p-8 bg-gray-50 rounded-4xl border border-gray-100 space-y-6">
                            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                               <Calendar size={16} className="text-indigo-600" />
                               Follow-up Schedule
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                               <div className="space-y-2">
                                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Follow-up Date</label>
                                  <input type="date" className="w-full p-3 bg-white border-none rounded-xl text-xs font-bold shadow-sm" />
                               </div>
                               <div className="space-y-2">
                                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Preferred Time</label>
                                  <div className="relative">
                                     <input type="time" className="w-full p-3 bg-white border-none rounded-xl text-xs font-bold shadow-sm" />
                                     <Clock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
                                  </div>
                               </div>
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Priority</label>
                               <div className="grid grid-cols-3 gap-2">
                                  {["High", "Medium", "Low"].map(p => (
                                     <button key={p} className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${p === "High" ? "bg-rose-50 border-rose-200 text-rose-600" : "bg-white border-gray-100 text-gray-400 hover:border-indigo-200"}`}>
                                        {p}
                                     </button>
                                  ))}
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="mt-12 flex justify-end">
                      <button onClick={handleNext} className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-3">
                         Custom Form Section
                         <ArrowRight size={18} />
                      </button>
                   </div>
                </div>
             )}

             {/* CUSTOM FORM */}
             {activeTab === "custom" && (
                <div className="p-8 lg:p-12 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                      <div>
                         <h2 className="text-xl font-black text-gray-900 tracking-tight">Custom Data Collection</h2>
                         <p className="text-sm text-gray-400">Apply specialized forms for niche prospect data</p>
                      </div>
                      <button 
                        onClick={() => setShowBuilder(true)}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center gap-2"
                      >
                         <Plus size={16} /> New Template
                      </button>
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                      <div className="lg:col-span-4 space-y-6">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Available Templates</label>
                         <div className="space-y-2 overflow-y-auto max-h-100 pr-2 scrollbar-hide">
                            {["Scholarship Eligibility", "Entrance Test Evaluation", "Sports Talent Profile"].map(temp => (
                               <button 
                                 key={temp}
                                 onClick={() => setSelectedTemplate(temp)}
                                 className={`w-full p-5 rounded-2xl border-2 text-left transition-all ${selectedTemplate === temp ? "bg-purple-50 border-purple-600" : "bg-gray-50/50 border-transparent hover:border-gray-100"}`}
                               >
                                  <div className="flex items-center gap-3">
                                     <div className={`p-2 rounded-lg ${selectedTemplate === temp ? "bg-purple-600 text-white" : "bg-white text-gray-300"}`}>
                                        <ClipboardList size={16} />
                                     </div>
                                     <span className={`text-xs font-black ${selectedTemplate === temp ? "text-purple-900" : "text-gray-500"}`}>{temp}</span>
                                  </div>
                               </button>
                            ))}
                         </div>
                      </div>

                      <div className="lg:col-span-8">
                         {selectedTemplate ? (
                            <div className="bg-gray-50/50 p-8 rounded-4xl border border-gray-100 space-y-8 animate-in zoom-in-95 duration-300">
                               <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                  <h3 className="text-sm font-black text-indigo-900 uppercase tracking-widest">{selectedTemplate}</h3>
                                  <button onClick={() => setSelectedTemplate(null)} className="text-gray-300 hover:text-rose-500">
                                     <Trash2 size={18} />
                                  </button>
                               </div>
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-2">
                                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Previous GPA</label>
                                     <input type="number" className="w-full p-4 bg-white border-none rounded-2xl text-sm font-bold shadow-sm" />
                                  </div>
                                  <div className="space-y-2">
                                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Accomplishments</label>
                                     <input type="text" className="w-full p-4 bg-white border-none rounded-2xl text-sm font-bold shadow-sm" />
                                  </div>
                               </div>
                            </div>
                         ) : (
                            <div className="bg-gray-50/30 h-full w-full rounded-4xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center p-12">
                               <MousePointer2 size={32} className="text-gray-200 mb-4" />
                               <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Select a Template</h3>
                            </div>
                         )}
                      </div>
                   </div>

                   <div className="mt-12 flex justify-end">
                      <button onClick={handleNext} className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-3">
                         Final: Attachments
                         <ArrowRight size={18} />
                      </button>
                   </div>
                </div>
             )}

             {/* ATTACHMENTS */}
             {activeTab === "more" && (
                <div className="p-8 lg:p-12 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div className="max-w-3xl space-y-12">
                      <div>
                         <h2 className="text-xl font-black text-gray-900 tracking-tight">Attachments & Documents</h2>
                         <p className="text-sm text-gray-400 mt-1 italic">Academic records, referral documents, or photos.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-6">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 text-left block">Document Upload</label>
                            <div className="p-8 bg-indigo-900 rounded-[2.5rem] text-white shadow-2xl relative group cursor-pointer overflow-hidden text-center">
                               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-400/30 transition-all" />
                               <div className="relative z-10 flex flex-col items-center gap-4">
                                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white border border-white/10">
                                     <Paperclip size={24} />
                                  </div>
                                  <div>
                                     <p className="text-xs font-black uppercase tracking-widest">Select Files</p>
                                     <p className="text-[10px] text-white/50 mt-1">Images, PDFs up to 10MB</p>
                                  </div>
                               </div>
                            </div>
                         </div>
                         <div className="space-y-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block">Expected Documents</label>
                            <ul className="space-y-2">
                               {[
                                 "Past Academic Transcripts",
                                 "Transfer Certificate (TC)",
                                 "Passport sized photo",
                                 "Guardian ID Proof"
                               ].map(doc => (
                                 <li key={doc} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <div className="w-4 h-4 rounded-full border border-indigo-200" />
                                    <span className="text-xs font-bold text-gray-600">{doc}</span>
                                 </li>
                               ))}
                            </ul>
                         </div>
                      </div>

                      <div className="pt-8 border-t border-gray-50 flex flex-col sm:flex-row gap-4">
                         <button className="flex-1 py-5 bg-indigo-600 text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3">
                            Confirm & Add Prospect
                            <CheckCircle2 size={24} />
                         </button>
                         <button className="sm:w-32 py-5 bg-gray-50 text-gray-400 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:text-rose-500 transition-colors">
                            Discard
                         </button>
                      </div>
                   </div>
                </div>
             )}
          </div>
        </div>
      </div>

      {/* Builder Modal Overlay */}
      {showBuilder && (
        <FormTemplateBuilder 
          onSave={(template) => {
            console.log("Template Saved", template);
            setShowBuilder(false);
          }}
          onCancel={() => setShowBuilder(false)}
        />
      )}

      {/* MOBILE UI - Steps Counter & Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/10 flex items-center gap-4 shadow-2xl lg:hidden z-40 w-[90%] max-w-sm">
         <div className="flex-1">
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Step {tabs.findIndex(t => t.id === activeTab) + 1}/6</p>
            <p className="text-[11px] font-black text-white uppercase truncate">{tabs.find(t => t.id === activeTab)?.label}</p>
         </div>
         <div className="flex gap-2 w-24">
            {activeTab !== "basic" && (
               <button 
                 onClick={() => {
                   const currentIndex = tabs.findIndex(t => t.id === activeTab);
                   if (currentIndex > 0) setActiveTab(tabs[currentIndex-1].id);
                 }}
                 className="flex-1 p-2.5 bg-white/10 text-white rounded-xl flex items-center justify-center"
               >
                  <ChevronLeft size={18} />
               </button>
            )}
            <button 
               onClick={activeTab === "more" ? () => {} : handleNext}
               className="flex-1 p-2.5 bg-indigo-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20"
            >
               {activeTab === "more" ? <CheckCircle2 size={18} /> : <ArrowRight size={18} />}
            </button>
         </div>
      </div>
    </div>
  );
};

// Helper for linkage icon (since Link is a reserved word)
const LinkIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

export default AddProspectForm;
