"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  UserPlus, 
  Users, 
  Wand2, 
  Paperclip,
  ChevronLeft,
  Calendar,
  Clock,
  Plus,
  ArrowRight,
  Search,
  CheckCircle2,
  AlertCircle,
  Hash,
  Mail,
  Smartphone,
  Tag,
  FileText,
  MousePointer2,
  Trash2,
  Layout
} from "lucide-react";
import FormTemplateBuilder from "./FormTemplateBuilder";

type LeadTab = "basic" | "assignment" | "custom" | "more";

const AddLeadForm = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<LeadTab>("basic");
  const [showBuilder, setShowBuilder] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const tabs: { id: LeadTab; label: string; icon: React.ElementType; color: string }[] = [
    { id: "basic", label: "Basic Info", icon: UserPlus, color: "text-blue-500" },
    { id: "assignment", label: "Assignment", icon: Users, color: "text-indigo-500" },
    { id: "custom", label: "Custom Form", icon: Layout, color: "text-purple-500" },
    { id: "more", label: "Additional", icon: Paperclip, color: "text-teal-500" },
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
                <span className="text-indigo-600 underline underline-offset-4 decoration-2">Add New</span>
              </div>
              <h1 className="text-2xl font-black text-gray-900 mt-1">Add New Lead</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button className="flex-1 md:flex-none px-6 py-2.5 bg-gray-50 text-gray-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-gray-100 hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                <CheckCircle2 size={16} /> Save Lead
             </button>
             <button className="flex-1 md:flex-none px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                <Users size={16} /> Assign Counselor
             </button>
          </div>
        </div>
      </div>

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
               <div className="p-4 bg-indigo-50 rounded-2xl">
                  <p className="text-[10px] font-black text-indigo-700 uppercase tracking-widest mb-1">Lead Probability</p>
                  <div className="flex items-center justify-between">
                     <span className="text-xs font-bold text-indigo-800">High</span>
                     <div className="flex gap-0.5">
                        <div className="w-1.5 h-3 bg-indigo-500 rounded-full" />
                        <div className="w-1.5 h-3 bg-indigo-500 rounded-full" />
                        <div className="w-1.5 h-3 bg-indigo-200 rounded-full" />
                     </div>
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
                     <h2 className="text-xl font-black text-gray-900 tracking-tight">Lead Basic Info</h2>
                     <p className="text-sm text-gray-400 mt-1">Standard student or parent contact details</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Student / Lead Full Name</label>
                           <input type="text" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold" placeholder="e.g. Robert Smith" />
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
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Lead Source</label>
                           <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold">
                              <option>Website Inquiry</option>
                              <option>Social Media</option>
                              <option>Referral / Word of Mouth</option>
                              <option>Walk-in</option>
                              <option>Phone Call</option>
                              <option>Marketing Campaign</option>
                           </select>
                        </div>
                     </div>

                     <div className="space-y-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Lead Type</label>
                           <div className="grid grid-cols-3 gap-3">
                              {["Admission", "General", "Other"].map(type => (
                                 <label key={type} className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-2xl border-2 border-transparent hover:border-indigo-500/20 cursor-pointer transition-all has-checked:border-indigo-600 has-checked:bg-indigo-50">
                                    <input type="radio" name="leadType" className="hidden" defaultChecked={type === "Admission"} />
                                    <Tag className="text-indigo-400" size={18} />
                                    <span className="text-[10px] font-black uppercase tracking-tight">{type}</span>
                                 </label>
                              ))}
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Interested Grade / Program</label>
                           <div className="relative">
                              <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold">
                                 <option>Grade 8 - Middle School</option>
                                 <option>Grade 9 - High School</option>
                                 <option>Grade 10 - Science Stream</option>
                              </select>
                           </div>
                        </div>
                        <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 flex gap-4">
                           <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
                              <Wand2 size={20} />
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-indigo-800 uppercase tracking-widest mb-1">Smart Match</p>
                              <p className="text-xs text-indigo-700/70 italic leading-relaxed">System suggests Grade 10 based on similar previous inquiries from this area.</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="mt-12 flex justify-end">
                     <button onClick={handleNext} className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center gap-3">
                        Continue to Assignment
                        <ArrowRight size={18} />
                     </button>
                  </div>
                </div>
             )}

             {/* ASSIGNMENT */}
             {activeTab === "assignment" && (
                <div className="p-8 lg:p-12 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div className="flex items-center justify-between mb-10">
                      <div>
                         <h2 className="text-xl font-black text-gray-900 tracking-tight">Assignment & Scheduling</h2>
                         <p className="text-sm text-gray-400">Delegate this lead to the right team member</p>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-xl">
                         <AlertCircle size={14} />
                         <span className="text-[10px] font-black uppercase tracking-widest">Unassigned</span>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-6">
                         <div className="space-y-2 text-left">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Assign to Officer / Counselor</label>
                            <div className="relative group">
                               <input type="text" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold pl-11" placeholder="Search staff by name or dept..." />
                               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            </div>
                            <div className="grid grid-cols-1 gap-2 mt-4">
                               {["Sarah Johnson (Head - Admissions)", "Robert Smith (Senior Counselor)", "Maria Garcia (Admissions Dept)"].map(staff => (
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
                         <div className="space-y-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Initial Priority Status</label>
                            <div className="grid grid-cols-3 gap-3">
                               {["High", "Medium", "Low"].map(level => (
                                  <button key={level} className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${level === "High" ? "bg-rose-50 border-rose-500 text-rose-600" : "bg-white border-gray-50 text-gray-400 hover:border-indigo-200"}`}>
                                     {level}
                                  </button>
                               ))}
                            </div>
                         </div>

                         <div className="p-8 bg-gray-50 rounded-4xl border border-gray-100 space-y-6">
                            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                               <Calendar size={16} className="text-indigo-600" />
                               Follow-up Reminder
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
                         </div>
                      </div>
                   </div>

                   <div className="mt-12 flex justify-end">
                      <button onClick={handleNext} className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-3">
                         Next: Custom Form
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
                         <h2 className="text-xl font-black text-gray-900 tracking-tight">Custom Form Integration</h2>
                         <p className="text-sm text-gray-400">Capture niche data using targeted templates</p>
                      </div>
                      <button 
                        onClick={() => setShowBuilder(true)}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center gap-2"
                      >
                         <Plus size={16} /> Create New Template
                      </button>
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                      <div className="lg:col-span-4 space-y-6">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Choose Existing Template</label>
                         <div className="space-y-2 overflow-y-auto max-h-100 pr-2 scrollbar-hide">
                            {["General Admission Inquiry", "Sports & Arts Program", "Scholarship Application", "Summer Camp 2026"].map(temp => (
                               <button 
                                 key={temp}
                                 onClick={() => setSelectedTemplate(temp)}
                                 className={`w-full p-5 rounded-2xl border-2 text-left transition-all ${selectedTemplate === temp ? "bg-purple-50 border-purple-600" : "bg-gray-50/50 border-transparent hover:border-gray-100"}`}
                               >
                                  <div className="flex items-center gap-3">
                                     <div className={`p-2 rounded-lg ${selectedTemplate === temp ? "bg-purple-600 text-white" : "bg-white text-gray-300"}`}>
                                        <FileText size={16} />
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
                                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Previous School</label>
                                     <input type="text" className="w-full p-4 bg-white border-none rounded-2xl text-sm font-bold shadow-sm" />
                                  </div>
                                  <div className="space-y-2">
                                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Extracurricular Interests</label>
                                     <input type="text" className="w-full p-4 bg-white border-none rounded-2xl text-sm font-bold shadow-sm" />
                                  </div>
                                  <div className="md:col-span-2 space-y-2">
                                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Special Medical Requirements</label>
                                     <textarea className="w-full p-4 bg-white border-none rounded-2xl text-sm font-bold shadow-sm min-h-24"></textarea>
                                  </div>
                               </div>
                            </div>
                         ) : (
                            <div className="bg-gray-50/30 h-full w-full rounded-4xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center p-12">
                               <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-gray-200 shadow-sm mb-4">
                                  <MousePointer2 size={32} />
                               </div>
                               <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">No Template Selected</h3>
                               <p className="text-xs text-gray-300 mt-2 max-w-50">Select any template from the left or create one using our builder.</p>
                            </div>
                         )}
                      </div>
                   </div>

                   <div className="mt-12 flex justify-end">
                      <button onClick={handleNext} className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-3">
                         Next: Additional Info
                         <ArrowRight size={18} />
                      </button>
                   </div>
                </div>
             )}

             {/* ADDITIONAL INFO */}
             {activeTab === "more" && (
                <div className="p-8 lg:p-12 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div className="max-w-3xl space-y-12">
                      <div>
                         <h2 className="text-xl font-black text-gray-900 tracking-tight">Additional Metadata</h2>
                         <p className="text-sm text-gray-400 mt-1 italic">Optional technical data to link this lead to specific campaigns or events.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-6">
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Associated Campaign / Event</label>
                               <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold">
                                  <option>None / Direct Entry</option>
                                  <option>Annual Open House 2026</option>
                                  <option>Social Media Blitz - Jan</option>
                                  <option>Education Fair Expro</option>
                               </select>
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Internal Notes</label>
                               <textarea className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold min-h-32" placeholder="Private internal comments..."></textarea>
                            </div>
                         </div>

                         <div className="space-y-6">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 text-left block">Supporting Attachments</label>
                            <div className="p-8 bg-indigo-900 rounded-[2.5rem] text-white shadow-2xl relative group cursor-pointer overflow-hidden text-center">
                               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-400/30 transition-all" />
                               <div className="relative z-10 flex flex-col items-center gap-4">
                                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white border border-white/10">
                                     <Paperclip size={24} />
                                  </div>
                                  <div>
                                     <p className="text-xs font-black uppercase tracking-widest">Upload Files</p>
                                     <p className="text-[10px] text-white/50 mt-1">Images, PDFs, Docs up to 10MB</p>
                                  </div>
                               </div>
                            </div>
                            <div className="flex gap-2 p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-400 items-center justify-center">
                               <Hash size={14} />
                               <span className="text-[10px] font-black uppercase tracking-widest">No Files Linked Yet</span>
                            </div>
                         </div>
                      </div>

                      <div className="pt-8 border-t border-gray-50 flex flex-col sm:flex-row gap-4">
                         <button className="flex-1 py-5 bg-indigo-600 text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3">
                            Confirm & Add Lead
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
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Step {tabs.findIndex(t => t.id === activeTab) + 1}/4</p>
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

export default AddLeadForm;
