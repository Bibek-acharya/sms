"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Beaker,
  Microscope,
  ShieldAlert,
  Clock,
  Users,
  Calendar as CalendarIcon,
  CheckCircle2,
  X,
  Bell,
  Edit3,
  ArrowRight,
  Thermometer,
  FlaskConical,
  Gauge,
  Download,
  ChevronRight,
  ClipboardList,
  FileBadge,
  Activity,
  UserCheck,
  Package,
  History
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type TabMode = "Classes" | "Inventory" | "Attendance" | "Safety";
const LaboratoryManagement = () => {
  const [activeTab, setActiveTab] = useState<TabMode>("Classes");
  const [showAddClass, setShowAddClass] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);

  const tabs: { id: TabMode; label: string; icon: React.ElementType }[] = [
    { id: "Classes", label: "Lab Classes", icon: Microscope },
    { id: "Inventory", label: "Inventory", icon: Beaker },
    { id: "Attendance", label: "Attendance", icon: UserCheck },
    { id: "Safety", label: "Safety Logs", icon: ShieldAlert },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header & Controls */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Lab & Inventory</h1>
          <div className="flex items-center gap-2 mt-1">
             <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-widest">System Active</span>
             <span className="text-[10px] font-bold text-gray-400 italic font-mono uppercase">LIMS - v2.4</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
           <button 
             onClick={() => activeTab === "Inventory" ? setShowAddItem(true) : setShowAddClass(true)}
             className="px-6 py-3 bg-gray-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center gap-2 shadow-xl shadow-gray-200"
           >
              <Plus size={16} /> {activeTab === "Inventory" ? "Add Item" : "New Lab Class"}
           </button>
           <button className="px-5 py-3 bg-white text-gray-600 rounded-2xl text-[10px] font-bold uppercase tracking-widest border border-gray-100 hover:bg-gray-50 flex items-center gap-2 shadow-sm">
              <Download size={16} /> Reports
           </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm overflow-x-auto no-scrollbar">
         {tabs.map((tab) => (
            <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`flex-1 min-w-[120px] flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab.id 
                  ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100" 
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
               }`}
            >
               <tab.icon size={16} />
               {tab.label}
            </button>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Dynamic Content based on Active Tab */}
        <div className="lg:col-span-8 space-y-6">
           
           {/* SEARCH & FILTERS SECTION */}
           <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                 <input 
                   type="text" 
                   className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-10 pr-4 text-xs font-bold focus:ring-2 focus:ring-indigo-500/20" 
                   placeholder={`Search ${activeTab.toLowerCase()}...`}
                 />
                 <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
              <div className="flex gap-2">
                 <button className="p-3 bg-gray-50 text-gray-500 rounded-2xl hover:bg-gray-100 transition-colors">
                    <Filter size={18} />
                 </button>
                 <select className="bg-gray-50 border-none rounded-2xl py-3 px-4 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-indigo-500/20">
                    <option>All Departments</option>
                    <option>Biology</option>
                    <option>Chemistry</option>
                    <option>Physics</option>
                 </select>
              </div>
           </div>

           {/* LAB CLASSES VIEW */}
           {activeTab === "Classes" && (
              <div className="space-y-4">
                 {[
                    { id: "S-101", title: "Plant Anatomy", subject: "Biology", class: "G10-A", teacher: "Ms. Sarah", tech: "Rajiv K.", status: "Scheduled", time: "10:30 AM", date: "Feb 12" },
                    { id: "S-102", title: "Acid-Base Titration", subject: "Chemistry", class: "G12-C", teacher: "Mr. Dave", tech: "Anita S.", status: "Ongoing", time: "01:00 PM", date: "Today" },
                    { id: "S-103", title: "Wave Motion Practical", subject: "Physics", class: "G11-B", teacher: "Prof. Mike", tech: "Rajiv K.", status: "Completed", time: "09:00 AM", date: "Feb 09" },
                 ].map((session) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={session.id} 
                      className="group bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:border-indigo-500/30 transition-all cursor-pointer relative overflow-hidden"
                    >
                       <Link href={`/dashboard/labs/${session.id}`} className="absolute inset-0 z-10" />
                       <div className={`absolute top-0 left-0 w-1.5 h-full ${session.status === 'Ongoing' ? 'bg-emerald-500' : session.status === 'Scheduled' ? 'bg-blue-500' : 'bg-gray-300'}`} />
                       <div className="flex flex-col sm:flex-row justify-between gap-4">
                          <div className="flex gap-4">
                             <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${session.subject === 'Biology' ? 'bg-green-50 text-green-600' : session.subject === 'Chemistry' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>
                                {session.subject === 'Biology' ? <Microscope size={24} /> : session.subject === 'Chemistry' ? <Beaker size={24} /> : <Gauge size={24} />}
                             </div>
                             <div>
                                <h3 className="text-sm font-black text-gray-900 tracking-tight">{session.title}</h3>
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 font-bold text-gray-400 text-[10px] uppercase tracking-wider">
                                   <span className="flex items-center gap-1"><Users size={12} /> {session.class}</span>
                                   <span className="flex items-center gap-1"><CalendarIcon size={12} /> {session.date}</span>
                                   <span className="flex items-center gap-1"><Clock size={12} /> {session.time}</span>
                                </div>
                             </div>
                          </div>
                          <div className="flex flex-row sm:flex-col justify-between items-end gap-2">
                             <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                                session.status === 'Ongoing' ? 'bg-emerald-100 text-emerald-700' : 
                                session.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
                             }`}>
                                {session.status}
                             </span>
                             <div className="flex items-center gap-2">
                                <button className="p-2 bg-gray-50 text-gray-400 rounded-xl hover:text-indigo-600 hover:bg-indigo-50 transition-all"><Edit3 size={16} /></button>
                                <button className="p-2 bg-gray-50 text-gray-400 rounded-xl hover:text-indigo-600 hover:bg-indigo-50 transition-all"><ArrowRight size={16} /></button>
                             </div>
                          </div>
                       </div>
                    </motion.div>
                 ))}
                 <button className="w-full py-4 border-2 border-dashed border-gray-100 rounded-3xl text-[10px] font-black text-gray-300 uppercase tracking-widest hover:border-indigo-400 hover:text-indigo-400 transition-all">
                    Load Archive Classes
                 </button>
              </div>
           )}

           {/* INVENTORY VIEW */}
           {activeTab === "Inventory" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                    { name: "Hydrochloric Acid (HCl)", category: "Chemical", qty: 2.5, unit: "Liters", status: "Available", color: "bg-blue-50 text-blue-600" },
                    { name: "Glass Beakers (250ml)", category: "Consumable", qty: 4, unit: "Pcs", status: "Low Stock", color: "bg-amber-50 text-amber-600" },
                    { name: "Sulphuric Acid", category: "Chemical", qty: 0, unit: "Liters", status: "Expired", color: "bg-rose-50 text-rose-600" },
                    { name: "Digital Microscope", category: "Equipment", qty: 15, unit: "Units", status: "Available", color: "bg-emerald-50 text-emerald-600" },
                 ].map((item, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:translate-y-[-2px] transition-all">
                       <div className="flex justify-between items-start mb-4">
                          <div className={`p-3 rounded-2xl ${item.color}`}>
                             {item.category === 'Chemical' ? <FlaskConical size={20} /> : item.category === 'Equipment' ? <Microscope size={20} /> : <Package size={20} />}
                          </div>
                          <span className={`px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                             item.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 
                             item.status === 'Low Stock' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                          }`}>
                             {item.status}
                          </span>
                       </div>
                       <h3 className="text-sm font-black text-gray-800">{item.name}</h3>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{item.category}</p>
                       <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-4">
                          <div className="flex items-baseline gap-1">
                             <span className="text-xl font-black text-gray-900">{item.qty}</span>
                             <span className="text-[10px] font-bold text-gray-400 uppercase">{item.unit}</span>
                          </div>
                          <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Record Usage</button>
                       </div>
                    </div>
                 ))}
                 <button className="md:col-span-2 group py-8 border-2 border-dashed border-gray-100 rounded-4xl flex flex-col items-center justify-center gap-3 hover:border-indigo-400 transition-all">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 group-hover:bg-indigo-50 group-hover:text-indigo-400 transition-all">
                       <Plus size={24} />
                    </div>
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest group-hover:text-indigo-400">Scan QR to Add Item</span>
                 </button>
              </div>
           )}

           {/* ATTENDANCE VIEW */}
           {activeTab === "Attendance" && (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                 <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                    <div>
                        <h3 className="text-sm font-black text-gray-800 tracking-tight italic">Live Session Attendance</h3>
                        <p className="text-[9px] font-extrabold text-indigo-600 uppercase mt-1 tracking-widest">Ongoing: Acid-Base Titration (G12-C)</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-black text-gray-900">22<span className="text-gray-300">/</span>25</span>
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                           <UserCheck size={20} />
                        </div>
                    </div>
                 </div>
                 <div className="divide-y divide-gray-50">
                    {[
                       { name: "Adrian Mark", roll: "1204", status: "Present", time: "01:05 PM" },
                       { name: "Bishal Gurung", roll: "1208", status: "Present", time: "01:02 PM" },
                       { name: "Cynthia Rai", roll: "1212", status: "Absent", time: "-" },
                       { name: "Daniel Smith", roll: "1215", status: "Present", time: "01:10 PM" },
                    ].map((student, idx) => (
                       <div key={idx} className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-all">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-black text-xs text-gray-400 uppercase">
                                {student.name.charAt(0)}
                             </div>
                             <div>
                                <h4 className="text-xs font-bold text-gray-800">{student.name}</h4>
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Roll: {student.roll}</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-4">
                             <div className="text-right hidden sm:block">
                                <p className="text-[9px] font-black text-gray-400 uppercase">Check-in</p>
                                <p className="text-[10px] font-bold text-gray-700">{student.time}</p>
                             </div>
                             <div className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border-2 transition-all ${
                                student.status === 'Present' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-300'
                             }`}>
                                {student.status}
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
                 <div className="p-5 bg-gray-50 flex justify-center">
                    <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 hover:text-indigo-600 transition-colors">
                       <ClipboardList size={14} /> View Student Roster <ChevronRight size={14} />
                    </button>
                 </div>
              </div>
           )}

           {/* SAFETY LOGS VIEW */}
           {activeTab === "Safety" && (
              <div className="space-y-6">
                 {/* Incident Alert Banner */}
                 <div className="p-6 bg-rose-600 rounded-3xl text-white shadow-xl shadow-rose-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
                    <div className="relative z-10 flex items-center gap-5">
                       <div className="p-3 bg-white/20 rounded-2xl">
                          <ShieldAlert size={28} />
                       </div>
                       <div>
                          <h4 className="text-lg font-black uppercase tracking-tight">Safety Critical Notification</h4>
                          <p className="text-xs text-white/80 font-medium italic">Fume hood in Chemistry Lab 3 requires immediate maintenance. Avoid hazardous volatile experiments.</p>
                       </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                       { title: "Chemical Hygiene Plan", status: "Active", date: "Jan 2026", icon: FileBadge, color: "text-blue-600 bg-blue-50" },
                       { title: "Emergency Drill Log", status: "Recent", date: "Feb 04", icon: Activity, color: "text-purple-600 bg-purple-50" },
                       { title: "Hazmat Handling SOP", status: "Updated", date: "Today", icon: ClipboardList, color: "text-emerald-600 bg-emerald-50" },
                    ].map((log, idx) => (
                       <div key={idx} className={`bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:bg-gray-50 cursor-pointer transition-all`}>
                          <div className={`p-3 rounded-2xl ${log.color} shrink-0`}>
                             <log.icon size={20} />
                          </div>
                          <div>
                             <h4 className="text-[11px] font-black text-gray-800 uppercase tracking-tighter leading-tight">{log.title}</h4>
                             <p className="text-[9px] font-extrabold text-gray-400 mt-0.5">{log.date} • {log.status}</p>
                          </div>
                       </div>
                    ))}
                 </div>

                 <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
                    <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                       <History size={16} className="text-indigo-600" /> Recent Compliance Incidents
                    </h3>
                    <div className="space-y-4">
                       {[
                         { msg: "Spillage of Copper Sulfate in Hallway", type: "Minor", time: "2 days ago", action: "Neutralized & Cleaned" },
                         { msg: "Burner Valve Leakage Found during Inspection", type: "Moderate", time: "Feb 02", action: "Technician Alerted" },
                       ].map((inc, i) => (
                          <div key={i} className="flex gap-4 p-4 rounded-2xl bg-gray-50/50 border border-transparent hover:border-gray-100 transition-all">
                             <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${inc.type === 'Minor' ? 'bg-amber-400' : 'bg-rose-500'}`} />
                             <div className="flex-1">
                                <div className="flex justify-between items-start">
                                   <p className="text-xs font-bold text-gray-800">{inc.msg}</p>
                                   <span className="text-[9px] font-black text-gray-400 uppercase">{inc.time}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                   <span className="text-[8px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded-full">Cleared</span>
                                   <p className="text-[10px] text-gray-500 italic">Action: {inc.action}</p>
                                </div>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           )}
        </div>

        {/* Right Side: Quick Stats & Insights */}
        <div className="lg:col-span-4 space-y-6">
           {/* Environmental Monitoring */}
           <div className="bg-white p-6 rounded-5xl border border-gray-100 shadow-sm relative overflow-hidden group">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-50/50 rounded-full blur-3xl group-hover:bg-blue-100/50 transition-all" />
              <div className="relative z-10">
                 <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Thermometer size={16} className="text-blue-600" /> Env conditions
                 </h3>
                 <div className="space-y-6">
                    <div>
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                          <span>Temperature</span>
                          <span className="text-gray-900 font-mono">22.4°C</span>
                       </div>
                       <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full w-[65%] bg-blue-500" />
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                          <span>Humidity</span>
                          <span className="text-gray-900 font-mono">45%</span>
                       </div>
                       <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full w-[45%] bg-cyan-500" />
                       </div>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-2xl flex gap-3 items-center">
                       <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0">
                          <CheckCircle2 size={16} />
                       </div>
                       <p className="text-[9px] font-bold text-emerald-800 leading-tight">All environmental systems within safe operating thresholds for chemical storage.</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Stock Notifications */}
           <div className="bg-white p-6 rounded-5xl border border-gray-100 shadow-sm">
              <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                 <Bell size={16} className="text-amber-500" /> Supply Alerts
              </h3>
              <div className="space-y-4">
                 {[
                    { item: "Nitric Acid", alert: "Expiry Alert", msg: "Expires in 4 days", type: "Critical" },
                    { item: "Microscope Slides", alert: "Stock Low", msg: "Only 5 packs left", type: "Warning" },
                    { item: "Iodine Solution", alert: "Re-order", msg: "Auto-reorder triggered", type: "Info" },
                 ].map((alert, i) => (
                    <div key={i} className="flex gap-4 items-start p-3 hover:bg-gray-50 rounded-2xl transition-all cursor-pointer group">
                       <div className={`w-2 h-2 mt-1.5 rounded-full ${alert.type === 'Critical' ? 'bg-rose-500' : alert.type === 'Warning' ? 'bg-amber-400' : 'bg-blue-400'}`} />
                       <div>
                          <p className="text-[11px] font-black text-gray-800 group-hover:text-indigo-600 transition-colors uppercase tracking-tighter leading-none">{alert.item}</p>
                          <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{alert.alert} • {alert.msg}</p>
                       </div>
                    </div>
                 ))}
                 <button className="w-full py-3 bg-gray-50 text-gray-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all mt-4 shadow-sm">
                    Open Stock Ledger
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* MODALS OVERLAYS */}
      <AnimatePresence>
         {showAddClass && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
               <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  onClick={() => setShowAddClass(false)}
                  className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" 
               />
               <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
               >
                  <div className="p-8 lg:p-12">
                     <div className="flex justify-between items-start mb-10">
                        <div>
                           <h2 className="text-2xl font-black text-gray-900 tracking-tight">Schedule Lab Class</h2>
                           <p className="text-sm text-gray-400 mt-1 font-medium">Coordinate facility usage and technical assistance</p>
                        </div>
                        <button onClick={() => setShowAddClass(false)} className="p-3 bg-gray-100 text-gray-400 rounded-2xl hover:bg-rose-50 hover:text-rose-600 transition-all">
                           <X size={20} />
                        </button>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-5">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 text-left block">Lab Title / Experiment</label>
                              <input type="text" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold" placeholder="e.g. Wave Interference" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 text-left block">Class / Section</label>
                              <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold">
                                 <option>Grade 11 - Section B</option>
                                 <option>Grade 12 - Section A</option>
                              </select>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 text-left block">Date</label>
                                 <input type="date" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold" />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 text-left block">Time</label>
                                 <input type="time" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold" />
                              </div>
                           </div>
                        </div>

                        <div className="space-y-5">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 text-left block">Assigned Staff</label>
                              <div className="space-y-3">
                                 <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold">
                                    <option>Teacher: Prof. Mike Wilson</option>
                                    <option>Teacher: Dr. Elena R.</option>
                                 </select>
                                 <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold">
                                    <option>Technician: Rajiv K. Poddar</option>
                                    <option>Technician: Anita Sharma</option>
                                 </select>
                              </div>
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 text-left block">Equipment Required</label>
                              <div className="p-4 bg-gray-50 rounded-2xl min-h-[100px] flex flex-wrap gap-2 items-start border border-dashed border-gray-200">
                                 <span className="px-3 py-1 bg-white rounded-lg text-[10px] font-bold text-gray-600 border border-gray-100 flex items-center gap-1 group">Microscopes <X size={10} className="hover:text-rose-500 cursor-pointer" /></span>
                                 <span className="px-3 py-1 bg-white rounded-lg text-[10px] font-bold text-gray-600 border border-gray-100 flex items-center gap-1 group">Glass Slides <X size={10} className="hover:text-rose-500 cursor-pointer" /></span>
                                 <button className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest">+ Add</button>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="mt-12 flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-50">
                         <button onClick={() => setShowAddClass(false)} className="flex-1 py-4 bg-indigo-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-indigo-100 hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                            Confirm Schedule
                            <CheckCircle2 size={18} />
                         </button>
                         <button onClick={() => setShowAddClass(false)} className="sm:px-10 py-4 bg-gray-50 text-gray-400 rounded-[1.5rem] font-black text-xs uppercase tracking-widest">
                            Cancel
                         </button>
                     </div>
                  </div>
               </motion.div>
            </div>
         )}

         {showAddItem && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
               <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setShowAddItem(false)}
                  className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" 
               />
               <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl"
               >
                   <div className="p-10 text-center">
                      <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                         <Beaker size={40} />
                      </div>
                      <h2 className="text-2xl font-black text-gray-900 tracking-tight leading-none mb-2 italic uppercase">New Inventory Item</h2>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-10">Asset Registration & Tracking</p>
                      
                      <div className="space-y-5 text-left">
                         <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block">Item Name / Asset ID</label>
                           <input type="text" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold" placeholder="e.g. Magnesium Strips" />
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block">Category</label>
                              <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold">
                                 <option>Chemical</option>
                                 <option>Equipment</option>
                                 <option>Consumable</option>
                              </select>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                               <div className="space-y-2">
                                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block text-center">Qty</label>
                                 <input type="number" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-center" placeholder="0" />
                               </div>
                               <div className="space-y-2">
                                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block text-center">Unit</label>
                                 <input type="text" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-center uppercase" placeholder="L / KG" />
                               </div>
                            </div>
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block">Storage Location</label>
                            <input type="text" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold" placeholder="Cabinet B-2, Shelf 4" />
                         </div>
                      </div>

                      <div className="mt-10 pt-8 border-t border-gray-50 flex gap-4">
                         <button onClick={() => setShowAddItem(false)} className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-50 hover:bg-emerald-700 transition-all">
                            Add to Ledger
                         </button>
                         <button onClick={() => setShowAddItem(false)} className="px-6 py-4 bg-gray-100 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest">
                            X
                         </button>
                      </div>
                   </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

      {/* MOBILE CTA BAR */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 px-6 py-4 rounded-3xl border border-white/10 flex items-center gap-6 shadow-2xl z-40 lg:hidden">
         <div className="flex gap-4">
            {tabs.map(t => (
               <button 
                 key={t.id}
                 onClick={() => setActiveTab(t.id)}
                 className={`p-2.5 rounded-xl transition-all ${activeTab === t.id ? 'bg-indigo-600 text-white' : 'text-gray-400'}`}
               >
                  <t.icon size={20} />
               </button>
            ))}
         </div>
         <div className="w-px h-6 bg-white/10" />
         <button 
           onClick={() => activeTab === 'Inventory' ? setShowAddItem(true) : setShowAddClass(true)}
           className="w-10 h-10 bg-white text-gray-900 rounded-xl flex items-center justify-center font-black"
         >
            <Plus size={24} />
         </button>
      </div>
    </div>
  );
};

export default LaboratoryManagement;
