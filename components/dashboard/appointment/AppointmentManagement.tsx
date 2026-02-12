"use client";

import React, { useState } from "react";
import {
  Plus,
  Calendar as CalendarIcon,
  Search,
  Filter,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  X,
  Info,
  Bell,
  LayoutGrid,
  List,
  Trash2,
  Edit3,
  ArrowRight,
  ShieldAlert,
  Briefcase,
  Headset,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type AppointmentStatus = "Pending" | "Confirmed" | "Completed" | "Canceled";
type AppointmentType =
  | "Parent Meeting"
  | "Counseling"
  | "Administrative"
  | "HR"
  | "Medical";
type ViewType = "List" | "Grid";
type TabType = "Upcoming" | "Completed" | "Pending" | "Canceled";

interface Participant {
  name: string;
  role: string;
  avatar?: string;
}

interface Appointment {
  id: string;
  title: string;
  type: AppointmentType;
  participants: Participant[];
  date: string;
  time: string;
  duration: string;
  location: string;
  staff: string;
  status: AppointmentStatus;
  notes: string;
  priority: "Normal" | "High";
}

const appointmentsData: Appointment[] = [
  {
    id: "APT-001",
    title: "Parent-Teacher Review",
    type: "Parent Meeting",
    participants: [
      { name: "Aryan's Father", role: "Parent" },
      { name: "Aryan Sharma", role: "Student" },
    ],
    date: "Feb 12, 2026",
    time: "10:30 AM",
    duration: "30 Min",
    location: "Block B, Room 204",
    staff: "Dr. Sarah Johnson",
    status: "Confirmed",
    notes: "Discussion regarding quarterly performance in Physics.",
    priority: "Normal",
  },
  {
    id: "APT-002",
    title: "Behavioral Counseling",
    type: "Counseling",
    participants: [{ name: "Riya Patel", role: "Student" }],
    date: "Feb 12, 2026",
    time: "02:00 PM",
    duration: "45 Min",
    location: "Counseling Suite",
    staff: "Ms. Elena Gilbert",
    status: "Pending",
    notes: "Routine monthly check-in.",
    priority: "High",
  },
  {
    id: "APT-003",
    title: "Payroll Inquiry",
    type: "HR",
    participants: [{ name: "John Doe", role: "Staff" }],
    date: "Feb 13, 2026",
    time: "11:00 AM",
    duration: "15 Min",
    location: "HR Office",
    staff: "Mr. David Smith",
    status: "Confirmed",
    notes: "Clarification on overtime hours.",
    priority: "Normal",
  },
  {
    id: "APT-004",
    title: "Annual Sports Planning",
    type: "Administrative",
    participants: [{ name: "Coordinators Group", role: "Staff" }],
    date: "Feb 10, 2026",
    time: "09:00 AM",
    duration: "1 Hour",
    location: "Conference Hall",
    staff: "Principal's Office",
    status: "Completed",
    notes: "Finalizing dates and venue logistics.",
    priority: "High",
  },
];

const statusStyles: Record<AppointmentStatus, string> = {
  Pending: "bg-amber-50 text-amber-600 border-amber-100",
  Confirmed: "bg-emerald-50 text-emerald-600 border-emerald-100",
  Completed: "bg-blue-50 text-blue-600 border-blue-100",
  Canceled: "bg-rose-50 text-rose-600 border-rose-100",
};

const typeIcons: Record<AppointmentType, React.ElementType> = {
  "Parent Meeting": Users,
  Counseling: ShieldAlert,
  Administrative: Briefcase,
  HR: Headset,
  Medical: Info,
};

const AppointmentManagement = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Upcoming");
  const [viewType, setViewType] = useState<ViewType>("List");
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight leading-none mb-2">
            Appointment Hub
          </h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Manage Institutional Engagements
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
            {[
              { id: "List", icon: List },
              { id: "Grid", icon: LayoutGrid },
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setViewType(v.id as ViewType)}
                className={`p-2 rounded-lg transition-all ${viewType === v.id ? "bg-gray-900 text-white" : "text-gray-400 hover:text-gray-600"}`}
              >
                <v.icon size={16} />
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className="px-6 py-3 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center gap-2"
          >
            <Plus size={14} /> Schedule Meeting
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2 relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by purpose, participant, or staff..."
            className="w-full bg-white border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold shadow-sm placeholder:text-gray-300 focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
        </div>

        <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm overflow-x-auto no-scrollbar">
          {["Upcoming", "Completed", "Pending", "Canceled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as TabType)}
              className={`flex-1 px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                activeTab === tab
                  ? "bg-gray-900 text-white shadow-lg shadow-gray-200"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white text-gray-400 rounded-2xl border border-gray-100 hover:text-gray-900 transition-all text-[10px] font-black uppercase tracking-widest">
          <Filter size={16} /> Filters
        </button>
      </div>

      {/* Appointment Grid/List */}
      <div
        className={
          viewType === "Grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {appointmentsData
          .filter((apt) => {
            if (activeTab === "Upcoming")
              return apt.status === "Confirmed" || apt.status === "Pending";
            return apt.status === activeTab;
          })
          .map((apt) => (
            <motion.div
              layout
              key={apt.id}
              onClick={() => setSelectedAppointment(apt)}
              className={`cursor-pointer group bg-white border border-gray-100 rounded-4xl p-6 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all relative overflow-hidden ${
                viewType === "List"
                  ? "flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  : ""
              }`}
            >
              {apt.priority === "High" && (
                <div className="absolute top-0 right-0 px-4 py-1.5 bg-rose-500 text-white text-[8px] font-black uppercase tracking-widest rounded-bl-2xl">
                  High Priority
                </div>
              )}

              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex flex-col items-center justify-center text-center group-hover:bg-emerald-50 transition-colors relative">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                    FEB
                  </span>
                  <span className="text-xl font-black text-gray-900">
                    {apt.date.split(" ")[1].replace(",", "")}
                  </span>
                  <div className="absolute -top-1 -left-1 w-6 h-6 bg-white rounded-lg border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-emerald-600 shadow-sm">
                    {React.createElement(typeIcons[apt.type], { size: 12 })}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border ${statusStyles[apt.status]}`}
                    >
                      {apt.status}
                    </span>
                    <span className="text-[10px] font-black text-gray-300 uppercase underline decoration-gray-100">
                      {apt.id}
                    </span>
                  </div>
                  <h3 className="text-md font-black text-gray-900 uppercase tracking-tight group-hover:text-emerald-600 transition-colors">
                    {apt.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase">
                      <Clock size={12} /> {apt.time} ({apt.duration})
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase">
                      <MapPin size={12} /> {apt.location}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`flex items-center gap-8 ${viewType === "List" ? "" : "mt-6 pt-6 border-t border-gray-50"}`}
              >
                <div className="flex -space-x-2">
                  {apt.participants.map((p, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-lg bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-black text-gray-400 uppercase"
                      title={`${p.name} (${p.role})`}
                    >
                      {p.name[0]}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border-2 border-white flex items-center justify-center text-[10px] font-black text-emerald-600">
                    +1
                  </div>
                </div>

                <div className="hidden lg:block">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">
                    Assigned Staff
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-md bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <CheckCircle2 size={10} />
                    </div>
                    <p className="text-xs font-bold text-gray-900">
                      {apt.staff}
                    </p>
                  </div>
                </div>

                {viewType === "List" && (
                  <button className="p-3 bg-gray-50 text-gray-400 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-all ml-auto">
                    <ArrowRight size={18} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
      </div>

      {/* Appointment Details Sidebar */}
      <AnimatePresence>
        {selectedAppointment && (
          <div className="fixed inset-0 z-100 flex items-center justify-end p-4 lg:p-6 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAppointment(null)}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="relative w-full max-w-md h-full bg-white rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Sidebar Header */}
              <div className="p-8 border-b border-gray-50 bg-gray-50/50">
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${statusStyles[selectedAppointment.status]}`}
                  >
                    {selectedAppointment.status}
                  </div>
                  <button
                    onClick={() => setSelectedAppointment(null)}
                    className="p-2 hover:bg-white rounded-xl text-gray-400 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>
                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight leading-none mb-2">
                  {selectedAppointment.title}
                </h2>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase">
                  <CalendarIcon size={14} /> {selectedAppointment.date} •{" "}
                  <Clock size={14} /> {selectedAppointment.time}
                </div>
              </div>

              {/* Sidebar Content */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Meeting Specifics
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-2xl">
                      <div className="flex items-center gap-2 mb-2 text-emerald-600">
                        <MapPin size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          Location
                        </span>
                      </div>
                      <p className="text-sm font-bold text-gray-900">
                        {selectedAppointment.location}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl">
                      <div className="flex items-center gap-2 mb-2 text-blue-600">
                        <Info size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          Duration
                        </span>
                      </div>
                      <p className="text-sm font-bold text-gray-900">
                        {selectedAppointment.duration}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Participants
                  </p>
                  <div className="space-y-3">
                    {selectedAppointment.participants.map((p, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-xs font-black text-gray-400 uppercase">
                            {p.name[0]}
                          </div>
                          <div>
                            <p className="text-sm font-black text-gray-900 uppercase tracking-tight">
                              {p.name}
                            </p>
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                              {p.role}
                            </p>
                          </div>
                        </div>
                        <button className="p-2 text-gray-300 hover:text-emerald-600 transition-colors">
                          <Info size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Agenda & Notes
                    </p>
                    <button className="p-2 text-gray-300 hover:text-gray-900">
                      <Edit3 size={14} />
                    </button>
                  </div>
                  <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 italic text-sm font-medium text-amber-900 leading-relaxed">
                    &ldquo;{selectedAppointment.notes}&rdquo;
                  </div>
                </div>

                {/* Timeline Placeholder */}
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Activity Log
                  </p>
                  <div className="space-y-4 ml-4 border-l-2 border-gray-50 pl-6 relative">
                    <div className="relative">
                      <div className="absolute -left-7.75 top-0 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-white" />
                      <p className="text-[10px] font-black text-gray-900 uppercase">
                        Confirmed by Coordinator
                      </p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                        Today • 09:15 AM
                      </p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-7.75 top-0 w-3 h-3 rounded-full bg-gray-200 ring-4 ring-white" />
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-tight">
                        Meeting Scheduled
                      </p>
                      <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">
                        Yesterday • 04:30 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-8 border-t border-gray-50 bg-white">
                <div className="flex gap-3">
                  <button className="flex-1 py-4 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                    <Bell size={14} /> Send Reminder
                  </button>
                  <button className="p-4 bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-100 transition-all">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Schedule Modal Placeholder */}
      <AnimatePresence>
        {isScheduleModalOpen && (
          <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsScheduleModalOpen(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-5xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                    New Appointment
                  </h2>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                    Institutional Scheduling
                  </p>
                </div>
                <button
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="p-3 hover:bg-gray-50 rounded-2xl text-gray-400"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 max-h-[70vh] overflow-y-auto no-scrollbar space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
                    Appointment Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold placeholder:text-gray-300 focus:ring-2 focus:ring-emerald-500/20 shadow-inner"
                    placeholder="e.g. Behavioral Review"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
                      Appointment Type
                    </label>
                    <select className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-600 focus:ring-2 focus:ring-emerald-500/20">
                      <option>Parent Meeting</option>
                      <option>Counseling</option>
                      <option>HR Inquiry</option>
                      <option>Administrative</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
                      Priority Level
                    </label>
                    <div className="flex gap-2">
                      <button className="flex-1 py-4 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase text-emerald-600 shadow-sm">
                        Normal
                      </button>
                      <button className="flex-1 py-4 bg-rose-50 border border-rose-100 rounded-2xl text-[10px] font-black uppercase text-rose-600 shadow-sm">
                        Urgent
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
                      Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
                      Time
                    </label>
                    <input
                      type="time"
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
                    Agenda / Purpose
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold placeholder:text-gray-300 focus:ring-2 focus:ring-emerald-500/20 shadow-inner"
                    placeholder="Briefly describe the meeting objectives..."
                  ></textarea>
                </div>
              </div>

              <div className="p-8 bg-gray-50 border-t border-gray-100 flex gap-4">
                <button className="flex-1 py-4 bg-white border border-gray-200 text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:text-gray-900 transition-all">
                  Discard
                </button>
                <button className="flex-2 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all">
                  Submit for Approval
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppointmentManagement;
