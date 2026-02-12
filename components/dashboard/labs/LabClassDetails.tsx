"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Users, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Beaker, 
  Microscope, 
  ShieldAlert, 
  Save,
  Download,
  Search,
  MoreVertical,
  FlaskConical,
  UserCheck,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  status: "Present" | "Absent" | "Late";
  time?: string;
}

const LabClassDetails = ({ id }: { id: string }) => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"All" | "Present" | "Absent">("All");

  const [students, setStudents] = useState<Student[]>([
    { id: "1", name: "Adrian Mark", rollNumber: "1204", status: "Present", time: "10:32 AM" },
    { id: "2", name: "Bishal Gurung", rollNumber: "1208", status: "Present", time: "10:35 AM" },
    { id: "3", name: "Cynthia Rai", rollNumber: "1212", status: "Absent" },
    { id: "4", name: "Daniel Smith", rollNumber: "1215", status: "Present", time: "10:30 AM" },
    { id: "5", name: "Elena Rodriguez", rollNumber: "1218", status: "Present", time: "10:40 AM" },
    { id: "6", name: "Fahad Al-Khalid", rollNumber: "1220", status: "Absent" },
    { id: "7", name: "Grace Hopper", rollNumber: "1222", status: "Late", time: "11:00 AM" },
  ]);

  const sessionInfo = {
    title: "Acid-Base Titration",
    subject: "Chemistry",
    class: "Grade 12 - Section C",
    teacher: "Mr. Dave Harrison",
    technician: "Anita Sharma",
    date: "Feb 10, 2026",
    time: "10:30 AM - 12:30 PM",
    room: "Lab 3 (Wet Lab)",
    status: "Ongoing"
  };

  const toggleStatus = (studentId: string) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const nextStatus = s.status === "Present" ? "Absent" : "Present";
        return { 
          ...s, 
          status: nextStatus,
          time: nextStatus === "Present" ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined
        };
      }
      return s;
    }));
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         s.rollNumber.includes(searchQuery);
    const matchesFilter = selectedFilter === "All" || s.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      // Logic for saving to backend would go here
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Dynamic Breadcrumbs & Title */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] hover:opacity-70 transition-all"
          >
            <ArrowLeft size={14} /> Back to Hub
          </button>
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                <Beaker size={24} />
             </div>
             <div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-none italic uppercase">
                   {sessionInfo.title}
                </h1>
                <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
                   {sessionInfo.class} • {sessionInfo.subject}
                </p>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
           <button 
             onClick={handleSave}
             disabled={isSaving}
             className="flex-1 md:flex-none px-6 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-gray-200"
           >
              {isSaving ? "Saving..." : <><Save size={16} /> Save Attendance</>}
           </button>
           <button className="p-4 bg-white border border-gray-100 text-gray-400 rounded-2xl hover:bg-gray-50 transition-all">
              <Download size={20} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Session Details & Monitoring */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2 italic">
                 <Clock size={16} className="text-indigo-600" /> Session Schedule
              </h3>
              <div className="space-y-5">
                 {[
                   { label: "Date", value: sessionInfo.date, icon: Calendar },
                   { label: "Duration", value: sessionInfo.time, icon: Clock },
                   { label: "Facility", value: sessionInfo.room, icon: FlaskConical },
                   { label: "Instructor", value: sessionInfo.teacher, icon: UserCheck },
                   { label: "Assistant", value: sessionInfo.technician, icon: Microscope },
                 ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-2xl bg-gray-50/50">
                       <div className="w-8 h-8 rounded-xl bg-white text-gray-400 flex items-center justify-center shadow-sm">
                          <item.icon size={16} />
                       </div>
                       <div>
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">{item.label}</p>
                          <p className="text-xs font-bold text-gray-700 mt-1">{item.value}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="bg-rose-50 p-6 rounded-[2.5rem] border border-rose-100">
              <h3 className="text-xs font-black text-rose-900 uppercase tracking-widest mb-4 flex items-center gap-2 italic">
                 <ShieldAlert size={16} /> Resource Usage Warnings
              </h3>
              <div className="space-y-3">
                 <div className="p-3 bg-white rounded-2xl flex gap-3">
                    <AlertCircle size={14} className="text-rose-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] font-bold text-rose-800 leading-relaxed italic">
                       HCl Acid quantity high consumption predicted for this session. Low stock alert active.
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Right: Attendance Interface */}
        <div className="lg:col-span-8 flex flex-col gap-6">
           {/* Filters & Search */}
           <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative font-sans">
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full bg-gray-50 border-none rounded-2xl py-3.5 pl-11 pr-4 text-xs font-bold focus:ring-2 focus:ring-indigo-500/20" 
                   placeholder="Search student by name or roll..."
                 />
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" size={18} />
              </div>
              <div className="flex bg-gray-50 p-1.5 rounded-2xl gap-1 overflow-x-auto no-scrollbar">
                 {["All", "Present", "Absent"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter as any)}
                      className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                         selectedFilter === filter 
                         ? "bg-white text-indigo-600 shadow-sm" 
                         : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                       {filter}
                    </button>
                 ))}
              </div>
           </div>

           {/* Student List */}
           <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
              <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center sm:px-8">
                 <div className="flex items-center gap-2">
                    <h3 className="text-xs font-black text-gray-800 uppercase tracking-[0.1em] italic">Student Roster</h3>
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded-full text-[9px] font-black">{filteredStudents.length} Students</span>
                 </div>
                 <button className="text-[9px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Mark All Present</button>
              </div>

              <div className="divide-y divide-gray-50">
                 {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                       <div key={student.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-indigo-50/20 transition-all group">
                          <div className="flex items-center gap-4">
                             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all ${
                                student.status === "Present" ? "bg-emerald-50 text-emerald-600" : 
                                student.status === "Absent" ? "bg-rose-50 text-rose-500" : "bg-amber-50 text-amber-600"
                             }`}>
                                {student.name.charAt(0)}
                             </div>
                             <div>
                                <h4 className="text-sm font-black text-gray-800 tracking-tight">{student.name}</h4>
                                <div className="flex items-center gap-3 mt-1">
                                   <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Roll: {student.rollNumber}</p>
                                   {student.time && (
                                      <p className="text-[9px] font-bold text-indigo-400 flex items-center gap-1 italic">
                                         <Clock size={10} /> {student.time}
                                      </p>
                                   )}
                                </div>
                             </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                             <div className="flex bg-gray-100/50 p-1.5 rounded-2xl gap-1">
                                <button 
                                  onClick={() => toggleStatus(student.id)}
                                  className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                                    student.status === "Present" ? "bg-emerald-600 text-white shadow-xl shadow-emerald-100" : "text-gray-400 hover:bg-white"
                                  }`}
                                >
                                   Present
                                </button>
                                <button 
                                  onClick={() => toggleStatus(student.id)}
                                  className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                                    student.status === "Absent" ? "bg-rose-500 text-white shadow-xl shadow-rose-100" : "text-gray-400 hover:bg-white"
                                  }`}
                                >
                                   Absent
                                </button>
                             </div>
                             <button className="p-3 text-gray-300 hover:text-gray-900 transition-colors">
                                <MoreVertical size={20} />
                             </button>
                          </div>
                       </div>
                    ))
                 ) : (
                    <div className="py-20 flex flex-col items-center justify-center text-gray-300 gap-4">
                       <Users size={48} className="opacity-20" />
                       <p className="text-xs font-black uppercase tracking-widest">No matching students found</p>
                    </div>
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LabClassDetails;
