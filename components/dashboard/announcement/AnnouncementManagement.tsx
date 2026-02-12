"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Megaphone,
  Users,
  Bell,
  Calendar,
  Clock,
  FileText,
  Edit3,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  X,
  MessageSquare,
  Pin,
  BarChart3,
  MailIcon,
} from "lucide-react";
import { motion } from "framer-motion";

type Priority = "Normal" | "Important" | "Urgent";
type Status = "Published" | "Scheduled" | "Draft" | "Archived";
type Audience = "All" | "Students" | "Parents" | "Staff";

interface Announcement {
  id: string;
  title: string;
  preview: string;
  content: string;
  priority: Priority;
  audience: Audience[];
  status: Status;
  publishDate: string;
  author: string;
  reads: number;
  delivery: {
    app: boolean;
    sms: boolean;
    email: boolean;
  };
}

const AnnouncementManagement = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);

  const announcements: Announcement[] = [
    {
      id: "ANN-001",
      title: "Annual Sports Meet 2026",
      preview:
        "We are excited to announce the dates for our annual sports meet...",
      content: "Full content about sports meet goes here...",
      priority: "Important",
      audience: ["Students", "Parents"],
      status: "Published",
      publishDate: "10 Feb 2026, 09:00 AM",
      author: "Admin Team",
      reads: 450,
      delivery: { app: true, sms: false, email: true },
    },
    {
      id: "ANN-002",
      title: "Urgent: School Closure Tomorrow",
      preview:
        "Due to heavy rainfall forecast, the school will remain closed...",
      content: "Full content about weather closure...",
      priority: "Urgent",
      audience: ["All"],
      status: "Published",
      publishDate: "09 Feb 2026, 08:30 PM",
      author: "Principal's Office",
      reads: 1200,
      delivery: { app: true, sms: true, email: true },
    },
    {
      id: "ANN-003",
      title: "Upcoming Parent-Teacher Meeting",
      preview:
        "Schedule for the Q1 PTM is now available. Please check your slots...",
      content: "Full content about PTM slots...",
      priority: "Normal",
      audience: ["Parents"],
      status: "Scheduled",
      publishDate: "15 Feb 2026, 10:00 AM",
      author: "Academic Coordinator",
      reads: 0,
      delivery: { app: true, sms: false, email: false },
    },
  ];

  if (selectedAnnouncement) {
    return (
      <AnnouncementDetails
        announcement={selectedAnnouncement}
        onBack={() => setSelectedAnnouncement(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
            Announcements
          </h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
            Communication Hub • AY 2025-26
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-2 px-4">
            <Search size={14} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search announcements..."
              className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest text-gray-600 focus:ring-0 w-40"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center gap-2"
          >
            <Plus size={14} /> New Announcement
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total", count: 24, icon: Megaphone, color: "gray" },
          {
            label: "Published",
            count: 18,
            icon: CheckCircle2,
            color: "emerald",
          },
          { label: "Scheduled", count: 4, icon: Clock, color: "blue" },
          { label: "Drafts", count: 2, icon: FileText, color: "amber" },
          { label: "Urgent", count: 1, icon: AlertCircle, color: "rose" },
        ].map((card, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm"
          >
            <div
              className={`w-8 h-8 rounded-xl bg-${card.color}-50 text-${card.color}-600 flex items-center justify-center mb-3`}
            >
              <card.icon size={16} />
            </div>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">
              {card.label}
            </p>
            <h3 className="text-xl font-black text-gray-900 leading-none">
              {card.count}
            </h3>
          </div>
        ))}
      </div>

      {/* Main List */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <div className="flex gap-4">
            {["All", "Students", "Parents", "Staff"].map((tab) => (
              <button
                key={tab}
                className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-900">
            <Filter size={18} />
          </button>
        </div>
        <div className="divide-y divide-gray-50">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className="p-6 hover:bg-gray-50/50 transition-all cursor-pointer group"
              onClick={() => setSelectedAnnouncement(ann)}
            >
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                        ann.priority === "Urgent"
                          ? "bg-rose-50 text-rose-600"
                          : ann.priority === "Important"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-gray-50 text-gray-500"
                      }`}
                    >
                      {ann.priority}
                    </span>
                    <span
                      className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                        ann.status === "Published"
                          ? "bg-emerald-50 text-emerald-600"
                          : ann.status === "Scheduled"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-gray-50 text-gray-500"
                      }`}
                    >
                      {ann.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {ann.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium line-clamp-2 max-w-2xl">
                    {ann.preview}
                  </p>
                  <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-1.5">
                      <Users size={12} /> {ann.audience.join(", ")}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} /> {ann.publishDate}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BarChart3 size={12} /> {ann.reads} Reads
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {ann.delivery.app && (
                      <div
                        className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border border-white"
                        title="App Notification"
                      >
                        <Bell size={10} />
                      </div>
                    )}
                    {ann.delivery.sms && (
                      <div
                        className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border border-white"
                        title="SMS"
                      >
                        <MessageSquare size={10} />
                      </div>
                    )}
                    {ann.delivery.email && (
                      <div
                        className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border border-white"
                        title="Email"
                      >
                        <MailIcon size={10} />
                      </div>
                    )}
                  </div>
                  <button className="p-2 text-gray-300 hover:text-gray-900 transition-all">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CreateAnnouncementModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

const CreateAnnouncementModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
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
        className="relative bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        <div className="p-8 max-h-[90vh] overflow-y-auto no-scrollbar">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                Create Announcement
              </h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                Broadcast to school community
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
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Announcement Title
              </label>
              <input
                type="text"
                placeholder="e.g. Annual Exams Schedule Released"
                className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:ring-emerald-500/20"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Priority Level
                </label>
                <select className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:ring-emerald-500/20 appearance-none cursor-pointer">
                  <option>Normal</option>
                  <option>Important</option>
                  <option>Urgent</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Target Audience
                </label>
                <select className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:ring-emerald-500/20 appearance-none cursor-pointer">
                  <option>All School</option>
                  <option>Students Only</option>
                  <option>Parents Only</option>
                  <option>Staff Only</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Content Text
              </label>
              <div className="bg-gray-50 rounded-2xl p-4 border border-transparent focus-within:border-emerald-500/20 focus-within:bg-white transition-all">
                <div className="flex gap-2 mb-4 border-b border-gray-100 pb-4">
                  <button
                    type="button"
                    className="p-2 hover:bg-white rounded-lg text-gray-400 hover:text-gray-900 transition-all font-serif"
                  >
                    B
                  </button>
                  <button
                    type="button"
                    className="p-2 hover:bg-white rounded-lg text-gray-400 hover:text-gray-900 transition-all font-serif italic"
                  >
                    I
                  </button>
                  <button
                    type="button"
                    className="p-2 hover:bg-white rounded-lg text-gray-400 hover:text-gray-900 transition-all underline"
                  >
                    U
                  </button>
                  <div className="w-px h-6 bg-gray-100 mx-2" />
                  <button
                    type="button"
                    className="p-2 hover:bg-white rounded-lg text-gray-400 hover:text-gray-900 transition-all font-bold text-xs"
                  >
                    A+
                  </button>
                </div>
                <textarea
                  rows={6}
                  placeholder="Type your message content here..."
                  className="w-full bg-transparent border-none text-sm font-medium text-gray-700 focus:ring-0 p-0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Schedule Publish
                </label>
                <div className="bg-gray-50 rounded-2xl px-6 py-4 flex items-center gap-3">
                  <Clock size={16} className="text-gray-400" />
                  <input
                    type="datetime-local"
                    className="bg-transparent border-none text-sm font-bold text-gray-900 focus:ring-0 p-0 cursor-pointer"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Expiry Date
                </label>
                <div className="bg-gray-50 rounded-2xl px-6 py-4 flex items-center gap-3">
                  <Calendar size={16} className="text-gray-400" />
                  <input
                    type="date"
                    className="bg-transparent border-none text-sm font-bold text-gray-900 focus:ring-0 p-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100">
              <h4 className="text-[10px] font-black text-emerald-900 uppercase tracking-widest mb-4">
                Delivery Options
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: "app", label: "App Notification", icon: Bell },
                  { id: "sms", label: "Direct SMS", icon: MessageSquare },
                  { id: "email", label: "E-mail Blast", icon: MailIcon },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-emerald-100 cursor-pointer hover:border-emerald-500 transition-all group"
                  >
                    <input type="checkbox" defaultChecked className="hidden" />
                    <opt.icon size={20} className="text-emerald-500" />
                    <span className="text-[9px] font-black text-emerald-900 uppercase tracking-tighter text-center">
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-4 bg-gray-100 text-gray-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
              >
                Save Draft
              </button>
              <button
                type="submit"
                className="flex-2 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all"
              >
                Publish Announcement
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

const AnnouncementDetails = ({
  announcement,
  onBack,
}: {
  announcement: Announcement;
  onBack: () => void;
}) => {
  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase hover:text-emerald-600 transition-all mb-4"
      >
        <ChevronRight size={14} className="rotate-180" /> Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Content Card */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span
                className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                  announcement.priority === "Urgent"
                    ? "bg-rose-50 text-rose-600"
                    : "bg-amber-50 text-amber-600"
                }`}
              >
                {announcement.priority}
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Published on {announcement.publishDate}
              </span>
            </div>
            <h1 className="text-3xl font-black text-gray-900 mb-6 leading-tight">
              {announcement.title}
            </h1>
            <div className="prose prose-sm max-w-none text-gray-600 font-medium leading-relaxed">
              <p>{announcement.content}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            <div className="mt-12 pt-12 border-t border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center font-black text-xs text-gray-400">
                  AT
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    Posted By
                  </p>
                  <p className="text-xs font-black text-gray-900">
                    {announcement.author}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-3 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-xl transition-all">
                  <Edit3 size={18} />
                </button>
                <button className="p-3 bg-rose-50 text-rose-400 hover:text-rose-600 rounded-xl transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-6">
              Audit History
            </h3>
            <div className="space-y-6">
              {[
                {
                  action: "Announcement Published",
                  time: "10 Feb, 09:00 AM",
                  by: "Admin Team",
                },
                {
                  action: "Draft Created",
                  time: "09 Feb, 04:30 PM",
                  by: "Academic Coordinator",
                },
              ].map((log, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-0.5 bg-emerald-100 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-900">
                      {log.action}
                    </p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                      {log.time} • {log.by}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Target Audience */}
          <div className="bg-gray-900 text-white rounded-[2.5rem] p-8 shadow-xl">
            <h3 className="text-sm font-black uppercase mb-8 flex items-center gap-2">
              <Users size={18} className="text-emerald-500" /> Engagement
              Statistics
            </h3>
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                    Target Audience
                  </p>
                  <p className="text-xs font-black text-white">
                    {announcement.audience.join(", ")}
                  </p>
                </div>
                <div className="p-3 bg-white/5 rounded-2xl">
                  <Pin size={16} />
                </div>
              </div>
              <div className="space-y-4 pt-4 border-t border-white/5">
                {[
                  { label: "App Impressions", count: "1,240", percent: 92 },
                  { label: "Email Opens", count: "890", percent: 75 },
                  { label: "SMS Delivered", count: "100%", percent: 100 },
                ].map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-gray-400">
                      <span>{stat.label}</span>
                      <span>{stat.count}</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500"
                        style={{ width: `${stat.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all mt-4">
                Generate Report
              </button>
            </div>
          </div>

          {/* Quick Info */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-6">
              Delivery Logs
            </h3>
            <div className="space-y-4">
              {[
                { id: "APP", sent: true, time: "09:00 AM" },
                { id: "SMS", sent: false, time: "-" },
                { id: "MAIL", sent: true, time: "09:05 AM" },
              ].map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl"
                >
                  <span className="text-[10px] font-black text-gray-900">
                    {log.id}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase text-gray-400">
                      {log.time}
                    </span>
                    {log.sent ? (
                      <CheckCircle2 size={14} className="text-emerald-500" />
                    ) : (
                      <X size={14} className="text-rose-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementManagement;
