"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  FlaskConical,
  Edit3,
  Plus,
  ArrowUpRight,
  MoreVertical,
  CheckCircle2,
  Lock,
  Search,
  BookOpen,
  UserCheck,
  ChevronRight,
  Filter,
  Download,
  Printer,
  Copy
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type RoutineTab = "Class" | "Lab" | "Teacher";

const RoutineManagement = () => {
  const [activeTab, setActiveTab] = useState<RoutineTab>("Class");
  const [isCoordinator, setIsCoordinator] = useState(true); // Mocking permission
  const [selectedClass, setSelectedClass] = useState("Grade 10-A");
  const [selectedTeacher, setSelectedTeacher] = useState("Dr. Elena R.");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sunday"];
  const timeSlots = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM"];

  const tabs: { id: RoutineTab; label: string; icon: any }[] = [
    { id: "Class", label: "Class Routine", icon: BookOpen },
    { id: "Lab", label: "Lab Schedule", icon: FlaskConical },
    { id: "Teacher", label: "My Assignments", icon: UserCheck },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header & Permission Context */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Academic Routine</h1>
          <div className="flex items-center gap-2 mt-1">
             <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${isCoordinator ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"}`}>
                {isCoordinator ? "Coordinator Mode" : "Viewer Access"}
             </span>
             <span className="text-[10px] font-bold text-gray-400 italic font-mono uppercase">V-Schedule 2.0</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
           {isCoordinator && (
             <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-xl shadow-indigo-100">
                <Edit3 size={16} /> Edit Master Routine
             </button>
           )}
           <button className="px-5 py-3 bg-white text-gray-600 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-gray-100 hover:bg-gray-50 flex items-center gap-2 shadow-sm">
              <Download size={16} /> Export PDF
           </button>
        </div>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         {/* Sidebar Navigation for Routine Page */}
         <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-1">
               {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                       activeTab === tab.id 
                       ? "bg-gray-900 text-white shadow-xl shadow-gray-200" 
                       : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                    }`}
                  >
                     <tab.icon size={16} />
                     {tab.label}
                  </button>
               ))}
            </div>

            {/* Quick Select Context */}
            <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
               <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Select View</h4>
               {activeTab === "Class" && (
                  <select 
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-xs font-bold focus:ring-2 focus:ring-indigo-500/20"
                  >
                     <option>Grade 10-A</option>
                     <option>Grade 11-B</option>
                     <option>Grade 12-C</option>
                  </select>
               )}
               {activeTab === "Teacher" && (
                  <select 
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                    className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-xs font-bold focus:ring-2 focus:ring-indigo-500/20"
                  >
                     <option>Dr. Elena R.</option>
                     <option>Prof. Mike W.</option>
                     <option>Ms. Sarah Jenkins</option>
                  </select>
               )}
               <div className="pt-2">
                  <button className="w-full py-3 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-colors">
                     Apply Filter
                  </button>
               </div>
            </div>
         </div>

         {/* Routine Table Section */}
         <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
               <div className="p-6 border-b border-gray-50 bg-gray-50/30 flex justify-between items-center sm:px-8">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                        <CalendarIcon size={20} />
                     </div>
                     <div>
                        <h3 className="text-sm font-black text-gray-800 tracking-tight uppercase italic">{activeTab} View: {activeTab === "Class" ? selectedClass : activeTab === "Teacher" ? selectedTeacher : "All Labs"}</h3>
                        <p className="text-[9px] font-extrabold text-gray-400 mt-0.5 tracking-widest">WINTER TERM 2026</p>
                     </div>
                  </div>
                  {isCoordinator && (
                    <button className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-all flex items-center gap-2 text-[9px] font-black uppercase tracking-widest">
                       <Plus size={14} /> Add Slot
                    </button>
                  )}
               </div>

               <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full border-collapse">
                     <thead>
                        <tr>
                           <th className="p-4 bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-50 text-left min-w-[100px]">Time / Day</th>
                           {days.map(day => (
                              <th key={day} className="p-4 bg-gray-50/50 text-[10px] font-black text-gray-600 uppercase tracking-widest border-r border-gray-50 min-w-[150px]">{day}</th>
                           ))}
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                        {timeSlots.map(time => (
                           <tr key={time}>
                              <td className="p-4 bg-gray-50/20 text-[10px] font-bold text-gray-500 font-mono border-r border-gray-50">{time}</td>
                              {days.map(day => {
                                 // Mock data logic for visualization
                                 const isOccupied = Math.random() > 0.4;
                                 const type = activeTab === "Lab" ? "Lab" : "Lecture";
                                 
                                 return (
                                    <td key={day} className="p-2 border-r border-gray-50 group transition-colors hover:bg-gray-50/50">
                                       {isOccupied ? (
                                          <div className={`p-4 rounded-2xl border ${activeTab === "Lab" ? "bg-amber-50 border-amber-100 text-amber-700" : "bg-indigo-50 border-indigo-100 text-indigo-700"} relative group cursor-pointer hover:shadow-lg transition-all`}>
                                             <div className="flex justify-between items-start mb-2">
                                                <span className="text-[9px] font-black uppercase tracking-tight">{type}</span>
                                                {isCoordinator && <Edit3 size={10} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />}
                                             </div>
                                             <h5 className="text-[11px] font-black leading-tight uppercase tracking-tighter">
                                                {activeTab === "Class" ? "Advanced Biol-102" : activeTab === "Teacher" ? "Grade 12 Physics" : "Organic Chem 3"}
                                             </h5>
                                             <div className="mt-3 flex items-center gap-2">
                                                 <div className="w-5 h-5 rounded-full bg-white/50 flex items-center justify-center shrink-0">
                                                    {activeTab === "Lab" ? <FlaskConical size={10} /> : <BookOpen size={10} />}
                                                 </div>
                                                 <span className="text-[8px] font-bold whitespace-nowrap opacity-70 italic tracking-widest">
                                                    {activeTab === "Lab" ? "Lab #03" : "Room 402B"}
                                                 </span>
                                             </div>
                                          </div>
                                       ) : (
                                          isCoordinator && (
                                             <button className="w-full h-24 border-2 border-dashed border-gray-50 rounded-2xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 hover:border-indigo-400 hover:bg-indigo-50 transition-all">
                                                <Plus size={16} className="text-indigo-400" />
                                                <span className="text-[8px] font-black uppercase text-indigo-400">Add Session</span>
                                             </button>
                                          )
                                       )}
                                    </td>
                                 );
                              })}
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>

            {/* Quick Actions & Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-indigo-600 p-8 rounded-[3rem] text-white shadow-2xl shadow-indigo-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
                  <div className="relative z-10">
                     <h4 className="text-lg font-black tracking-tight leading-none italic uppercase mb-2">Copy Routine</h4>
                     <p className="text-xs text-white/60 font-medium mb-6">Duplicate this weekly routine for the next academic month.</p>
                     <button className="px-6 py-3 bg-white text-gray-900 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-gray-100 transition-colors">
                        <Copy size={14} /> Bulk Replicate
                     </button>
                  </div>
               </div>

               <div className="bg-white p-6 rounded-[3rem] border border-gray-100 shadow-sm">
                  <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-6 italic flex items-center gap-2">
                     <Lock size={16} className="text-amber-500" /> Routine Lock Info
                  </h4>
                  <div className="space-y-4">
                     <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-transparent">
                        <div className="w-10 h-10 rounded-xl bg-white text-emerald-500 flex items-center justify-center shrink-0 shadow-sm">
                           <CheckCircle2 size={20} />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-gray-900 uppercase tracking-tight leading-none mb-1">Status: Validated</p>
                           <p className="text-[9px] font-bold text-gray-400 leading-tight">Master routine for Term 2 has been locked and published by the Principal office.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default RoutineManagement;
