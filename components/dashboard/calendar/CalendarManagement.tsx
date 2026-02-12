"use client";

import React, { useState } from "react";
import {
  Plus,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Download,
  Printer,
  X,
  LayoutGrid,
  List,
  Columns,
  Table as RoutineIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getNepaliDate, toNepaliNumeral } from "@/lib/calendar-utils";
import Link from "next/link";

type ViewType = "Month" | "Week" | "Agenda";
type EventType = "Exam" | "Holiday" | "Event" | "PTM" | "Deadline";

interface AcademicEvent {
  id: string;
  title: string;
  type: EventType;
  start: string;
  end: string;
  time?: string;
  audience: string[];
  description: string;
  isLocked: boolean;
  hasConflict?: boolean;
}

const CalendarManagement = () => {
  const [view, setView] = useState<ViewType>("Month");
  const [selectedEvent, setSelectedEvent] = useState<AcademicEvent | null>(
    null,
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const events: AcademicEvent[] = [
    {
      id: "E1",
      title: "Quarterly Examination",
      type: "Exam",
      start: "2026-02-15",
      end: "2026-02-22",
      audience: ["Grade 6-12"],
      description: "Main quarterly exams for secondary section.",
      isLocked: true,
    },
    {
      id: "E2",
      title: "Spring Break",
      type: "Holiday",
      start: "2026-02-25",
      end: "2026-02-28",
      audience: ["All"],
      description: "Mid-term spring break for students and staff.",
      isLocked: false,
    },
    {
      id: "E3",
      title: "Science Exhibition",
      type: "Event",
      start: "2026-02-12",
      end: "2026-02-12",
      time: "10:00 AM - 04:00 PM",
      audience: ["Students", "Parents"],
      description: "Annual science and technology showcase.",
      isLocked: false,
      hasConflict: true,
    },
    {
      id: "E4",
      title: "Parent-Teacher Meeting",
      type: "PTM",
      start: "2026-02-14",
      end: "2026-02-14",
      time: "09:00 AM - 01:00 PM",
      audience: ["Parents"],
      description: "Progress discussion for first term.",
      isLocked: false,
    },
  ];

  const eventColors: Record<EventType, string> = {
    Exam: "bg-rose-50 text-rose-600 border-rose-100",
    Holiday: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Event: "bg-blue-50 text-blue-600 border-blue-100",
    PTM: "bg-purple-50 text-purple-600 border-purple-100",
    Deadline: "bg-amber-50 text-amber-600 border-amber-100",
  };

  return (
    <div className="space-y-6">
      {/* ERP Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
            Academic Calendar
          </h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
            Institutional Timeline • Feb 2026
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
            {[
              { id: "Month", icon: LayoutGrid },
              { id: "Week", icon: Columns },
              { id: "Agenda", icon: List },
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setView(v.id as ViewType)}
                className={`p-2 rounded-lg transition-all ${view === v.id ? "bg-gray-900 text-white" : "text-gray-400 hover:text-gray-600"}`}
                title={v.id}
              >
                <v.icon size={16} />
              </button>
            ))}
          </div>

          <div className="h-8 w-px bg-gray-100 mx-1 hidden sm:block" />

          <Link
            href="/dashboard/routine"
            className="px-4 py-2.5 bg-white border border-gray-100 text-gray-900 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-gray-50 transition-all flex items-center gap-2"
          >
            <RoutineIcon size={14} /> View Class Routine
          </Link>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center gap-2"
          >
            <Plus size={14} /> Add Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Filters & Legend */}
        <div className="space-y-6 order-2 lg:order-1">
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-6 whitespace-nowrap">
              Today&apos;s Date
            </h3>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 mb-6">
              <p className="text-[10px] font-black text-emerald-900 uppercase tracking-widest leading-none">
                Magh 27, 2082
              </p>
              <p className="text-[9px] font-bold text-emerald-600 uppercase mt-1">
                Tuesday
              </p>
            </div>

            <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-6">
              Calendar Filters
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Academic Year
                </label>
                <select className="w-full bg-gray-50 border-none rounded-xl px-4 py-2.5 text-[10px] font-black uppercase text-gray-600 focus:ring-0 cursor-pointer">
                  <option>AY 2025-26</option>
                  <option>AY 2024-25</option>
                </select>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-50">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2">
                  Event Categories
                </p>
                {(Object.keys(eventColors) as EventType[]).map((type) => (
                  <label
                    key={type}
                    className="flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${eventColors[type].split(" ")[0]}`}
                      />
                      <span className="text-[10px] font-black text-gray-600 uppercase group-hover:text-gray-900 transition-colors">
                        {type}s
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-200 text-emerald-600 focus:ring-emerald-500/20"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-900 text-white p-6 rounded-[2.5rem] shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-500/20 rounded-xl text-emerald-500">
                <Bell size={18} />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-widest">
                Upcoming Reminders
              </h3>
            </div>
            <div className="space-y-4">
              {[
                { title: "Science Expo Setup", time: "Tomorrow, 08:30 AM" },
                { title: "Exam Paper Drafts", time: "Feb 12, 11:00 AM" },
              ].map((rem, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-2xl space-y-1">
                  <p className="text-xs font-black text-white">{rem.title}</p>
                  <p className="text-[9px] font-bold text-gray-400 uppercase">
                    {rem.time}
                  </p>
                </div>
              ))}
              <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[9px] font-black uppercase transition-all">
                Enable Desktop Alerts
              </button>
            </div>
          </div>
        </div>

        {/* Main Calendar View */}
        <div className="lg:col-span-3 space-y-6 order-1 lg:order-2">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden min-h-175">
            {/* Calendar Header */}
            <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight leading-none">
                    February 2026
                  </h2>
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-1">
                    Magh - Falgun 2082
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400">
                    <ChevronLeft size={18} />
                  </button>
                  <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 bg-gray-50 text-[10px] font-black uppercase rounded-lg text-gray-500 hover:text-gray-900">
                  Today
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-900">
                  <Printer size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-900">
                  <Download size={16} />
                </button>
              </div>
            </div>

            {/* Month Grid View */}
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-1"
              >
                <div className="grid grid-cols-7 border-b border-gray-50">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className="py-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest"
                      >
                        {day}
                      </div>
                    ),
                  )}
                </div>
                <div className="grid grid-cols-7">
                  {Array.from({ length: 35 }).map((_, i) => {
                    const day = i - 0; // Feb 1st 2026 is Sunday
                    const isToday = day === 10;
                    const nepaliDate = getNepaliDate(day, 2, 2026);

                    return (
                      <div
                        key={i}
                        className={`min-h-30 border-r border-b border-gray-50 p-2 relative group hover:bg-gray-50/50 transition-all ${i % 7 === 6 ? "border-r-0" : ""}`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full ${
                              isToday
                                ? "bg-emerald-600 text-white"
                                : day > 0 && day <= 28
                                  ? "text-gray-900"
                                  : "text-gray-200"
                            }`}
                          >
                            {day > 0 && day <= 28 ? day : ""}
                          </span>
                          {day > 0 && day <= 28 && nepaliDate && (
                            <span className="text-[9px] font-bold text-gray-400 absolute top-2 right-2 group-hover:text-emerald-500 transition-colors">
                              {toNepaliNumeral(nepaliDate.day)}
                            </span>
                          )}
                        </div>

                        <div className="mt-2 space-y-1">
                          {events
                            .filter((e) => {
                              const startDay = parseInt(e.start.split("-")[2]);
                              const endDay = parseInt(e.end.split("-")[2]);
                              return day >= startDay && day <= endDay;
                            })
                            .map((e, idx) => (
                              <div
                                key={idx}
                                onClick={() => setSelectedEvent(e)}
                                className={`px-2 py-1 rounded-md text-[8px] font-black uppercase truncate border cursor-pointer hover:shadow-sm transition-all relative ${eventColors[e.type]}`}
                              >
                                {e.hasConflict && (
                                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border border-white" />
                                )}
                                {e.isLocked && (
                                  <span className="mr-1 inline-block">🔒</span>
                                )}
                                {e.title}
                              </div>
                            ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Event Details Overlay/Sidebar */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-100 flex items-center justify-end p-4 lg:p-6 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="relative w-full max-w-sm bg-white h-full rounded-[2.5rem] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
                    Event Snapshot
                  </h3>
                  <div
                    className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full inline-block ${eventColors[selectedEvent.type]}`}
                  >
                    {selectedEvent.type}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-2 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-xl"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 p-8 overflow-y-auto space-y-8 no-scrollbar">
                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-gray-900 leading-tight">
                    {selectedEvent.title}
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase">
                      <CalendarIcon size={14} className="text-emerald-500" />{" "}
                      {selectedEvent.start === selectedEvent.end
                        ? selectedEvent.start
                        : `${selectedEvent.start} - ${selectedEvent.end}`}
                    </div>
                    {selectedEvent.time && (
                      <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase">
                        <Clock size={14} className="text-blue-500" />{" "}
                        {selectedEvent.time}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Audience Visibility
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.audience.map((a, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-xl"
                      >
                        <Users size={12} className="text-gray-400" />
                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-tighter">
                          {a}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Description
                  </p>
                  <p className="text-sm font-medium text-gray-600 leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                {selectedEvent.hasConflict && (
                  <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 flex gap-3">
                    <AlertTriangle
                      size={18}
                      className="text-rose-600 shrink-0"
                    />
                    <div>
                      <p className="text-xs font-black text-rose-600 uppercase underline decoration-rose-300">
                        Schedule Conflict
                      </p>
                      <p className="text-[10px] text-rose-500 font-bold mt-1">
                        Overlaps with &apos;Laboratory Maintenance&apos; in Room
                        402.
                      </p>
                    </div>
                  </div>
                )}

                <div className="pt-8 border-t border-gray-50 space-y-4">
                  <button className="w-full py-4 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-gray-200 hover:bg-black transition-all">
                    Edit Event
                  </button>
                  <button className="w-full py-4 bg-gray-100 text-rose-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all">
                    Cancel Event
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AddEventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

const AddEventModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center p-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        <div className="p-8 max-h-[90vh] overflow-y-auto no-scrollbar">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                Schedule New Event
              </h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                Calendar Synchronization Active
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-3 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-2xl transition-all"
            >
              <X size={20} />
            </button>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Event Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Science Fair Registration"
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-emerald-500/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Category
                </label>
                <select className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-0 cursor-pointer appearance-none">
                  <option>Event</option>
                  <option>Exam</option>
                  <option>Holiday</option>
                  <option>PTM</option>
                  <option>Deadline</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Visibility
                </label>
                <select className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-0 cursor-pointer appearance-none">
                  <option>All School</option>
                  <option>Students Only</option>
                  <option>Parents Only</option>
                  <option>Staff Only</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-0"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Event Narrative
              </label>
              <textarea
                rows={4}
                className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-medium focus:ring-emerald-500/20"
                placeholder="Provide detailed context for the community..."
              />
            </div>

            <div className="flex gap-4 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
              <div className="p-2 bg-emerald-100 rounded-xl text-emerald-600 self-start">
                <CheckCircle2 size={18} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-emerald-900 uppercase">
                  Conflict Shield Enabled
                </p>
                <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-tight">
                  The system will alert you if this event overlaps with routine
                  classes or priority exams.
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-4 bg-gray-100 text-gray-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-2 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all"
              >
                Schedule Event
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CalendarManagement;
