"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Plus,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  Info,
  ChevronLeft,
  Check,
  CheckCheck,
  ShieldAlert,
  Ticket,
  FileText,
  Pin,
  Headset,
  Briefcase,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

type Role = "Student" | "Parent" | "Teacher" | "HR" | "Admin";
type FilterType = "All" | "Students" | "Staff" | "HR";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
  attachments?: { type: "image" | "file"; name: string; url: string }[];
  isUrgent?: boolean;
}

interface Chat {
  id: string;
  name: string;
  role: Role;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  department?: string;
  isPinned?: boolean;
  messages: Message[];
}

const chatsData: Chat[] = [
  {
    id: "hr-1",
    name: "HR Operations",
    role: "HR",
    department: "Administration",
    lastMessage: "Your leave request for next week is approved.",
    timestamp: "10:24 AM",
    unreadCount: 0,
    isOnline: true,
    isPinned: true,
    messages: [
      {
        id: "m1",
        senderId: "other",
        text: "Hello! How can I help you today?",
        timestamp: "Yesterday",
        status: "read",
      },
      {
        id: "m2",
        senderId: "me",
        text: "I wanted to check my leave status for next week.",
        timestamp: "Yesterday",
        status: "read",
      },
      {
        id: "m3",
        senderId: "other",
        text: "Checking that for you... One moment.",
        timestamp: "10:20 AM",
        status: "read",
      },
      {
        id: "m4",
        senderId: "other",
        text: "Your leave request for next week is approved.",
        timestamp: "10:24 AM",
        status: "sent",
      },
    ],
  },
  {
    id: "t-1",
    name: "Dr. Sarah Johnson",
    role: "Teacher",
    department: "Physics",
    lastMessage: "Please submit the lab reports by Friday morning.",
    timestamp: "09:45 AM",
    unreadCount: 2,
    isOnline: true,
    messages: [],
  },
  {
    id: "p-1",
    name: "Mr. Ramesh Thapa",
    role: "Parent",
    lastMessage: "Thank you for the update on Aryan's progress.",
    timestamp: "Yesterday",
    unreadCount: 0,
    isOnline: false,
    messages: [],
  },
  {
    id: "s-1",
    name: "Aryan Sharma",
    role: "Student",
    lastMessage: "I finished the assignment. Should I upload it to the portal?",
    timestamp: "Mon",
    unreadCount: 1,
    isOnline: true,
    messages: [],
  },
];

const roleColors: Record<Role, string> = {
  Student: "bg-blue-50 text-blue-600 border-blue-100",
  Parent: "bg-purple-50 text-purple-600 border-purple-100",
  Teacher: "bg-emerald-50 text-emerald-600 border-emerald-100",
  HR: "bg-rose-50 text-rose-600 border-rose-100",
  Admin: "bg-amber-50 text-amber-600 border-amber-100",
};

const ChatManagement = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(chatsData[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [messageInput, setMessageInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return;

    // In a real app, logic to append message to state would go here
    setMessageInput("");
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
      {/* 1️⃣ CHAT LIST SIDEBAR */}
      <div
        className={`w-full lg:w-96 flex flex-col border-r border-gray-50 bg-white ${selectedChat ? "hidden lg:flex" : "flex"}`}
      >
        {/* Header */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-black text-gray-900 uppercase tracking-tight">
              Messages
            </h1>
            <button className="p-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all">
              <Plus size={18} />
            </button>
          </div>

          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-bold placeholder:text-gray-300 focus:ring-2 focus:ring-gray-900/5 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {["All", "Students", "Staff", "HR"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter as FilterType)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeFilter === filter
                    ? "bg-gray-900 text-white shadow-lg shadow-gray-200"
                    : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* HR Quick Access */}
        <div className="px-6 mb-4">
          <button className="w-full p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-4 hover:bg-rose-100 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
              <Headset size={20} />
            </div>
            <div className="flex-1 text-left">
              <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest">
                Connect with HR
              </p>
              <p className="text-xs font-bold text-rose-900">
                Resolve payroll & policies
              </p>
            </div>
            <div className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-6">
          {chatsData.map((chat) => (
            <motion.div
              layout
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 rounded-3xl cursor-pointer transition-all flex gap-4 items-center group relative ${
                selectedChat?.id === chat.id
                  ? "bg-gray-50"
                  : "hover:bg-gray-50/50"
              }`}
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 font-bold overflow-hidden border-2 border-white shadow-sm">
                  {chat.name[0]}
                </div>
                {chat.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight truncate">
                    {chat.name}
                  </h3>
                  <span className="text-[9px] font-bold text-gray-400">
                    {chat.timestamp}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border ${roleColors[chat.role]}`}
                  >
                    {chat.role}
                  </span>
                  {chat.isPinned && (
                    <Pin
                      size={10}
                      className="text-gray-300 fill-current rotate-45"
                    />
                  )}
                </div>
                <p className="text-[11px] text-gray-500 font-medium truncate italic leading-tight">
                  {chat.lastMessage}
                </p>
              </div>

              {chat.unreadCount > 0 && (
                <div className="w-5 h-5 bg-gray-900 text-white text-[9px] font-black rounded-lg flex items-center justify-center shadow-lg shadow-gray-200">
                  {chat.unreadCount}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* 2️⃣ CHAT WINDOW */}
      <div
        className={`flex-1 flex flex-col bg-gray-50/30 ${!selectedChat ? "hidden lg:flex items-center justify-center" : "flex"}`}
      >
        {selectedChat ? (
          <>
            {/* Header */}
            <div className="p-6 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedChat(null)}
                  className="lg:hidden p-2 hover:bg-gray-50 rounded-xl text-gray-400"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 font-bold border border-gray-100">
                    {selectedChat.name[0]}
                  </div>
                  {selectedChat.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight leading-none mb-1">
                    {selectedChat.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      {selectedChat.role} •{" "}
                      {selectedChat.department || "General"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-3 hover:bg-gray-50 rounded-2xl text-gray-400 transition-all">
                  <Phone size={18} />
                </button>
                <button className="p-3 hover:bg-gray-50 rounded-2xl text-gray-400 transition-all">
                  <Video size={18} />
                </button>
                <button className="p-3 hover:bg-gray-50 rounded-2xl text-gray-400 transition-all">
                  <Info size={18} />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-8 space-y-6"
            >
              <div className="flex justify-center mb-8">
                <span className="px-4 py-1.5 bg-gray-100 rounded-full text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  February 10, 2026
                </span>
              </div>

              {selectedChat.messages.length > 0 ? (
                selectedChat.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.senderId === "me" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[70%] p-5 rounded-4xl shadow-sm relative group overflow-hidden ${
                        msg.senderId === "me"
                          ? "bg-gray-900 text-white rounded-tr-none"
                          : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                      }`}
                    >
                      <p className="text-sm font-medium leading-relaxed">
                        {msg.text}
                      </p>

                      <div
                        className={`flex items-center gap-2 mt-2 ${msg.senderId === "me" ? "justify-end text-white/50" : "text-gray-400"}`}
                      >
                        <span className="text-[9px] font-black uppercase">
                          {msg.timestamp}
                        </span>
                        {msg.senderId === "me" &&
                          (msg.status === "read" ? (
                            <CheckCheck
                              size={12}
                              className="text-emerald-400"
                            />
                          ) : (
                            <Check size={12} />
                          ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto opacity-50">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-300 mb-6 scale-150">
                    <Zap size={32} />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 uppercase">
                    Start a Conversation
                  </h3>
                  <p className="text-xs text-gray-500 font-medium mt-2">
                    Send a message to {selectedChat.name} to begin your
                    interaction.
                  </p>
                </div>
              )}
            </div>

            {/* HR Features Toolbar (if HR chat) */}
            {selectedChat.role === "HR" && (
              <div className="px-8 pb-4">
                <div className="flex gap-2 p-2 bg-white rounded-2xl border border-gray-100 overflow-x-auto no-scrollbar shadow-sm">
                  {[
                    { icon: Ticket, label: "New Ticket" },
                    { icon: ShieldAlert, label: "Flag Urgent" },
                    { icon: FileText, label: "Leave Request" },
                    { icon: Briefcase, label: "Payroll Inquiry" },
                  ].map((tool) => (
                    <button
                      key={tool.label}
                      className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 rounded-xl whitespace-nowrap group transition-all border border-transparent hover:border-gray-100"
                    >
                      <tool.icon size={14} className="text-rose-500" />
                      <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest group-hover:text-gray-900">
                        {tool.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message Input Area */}
            <div className="p-8 bg-white border-t border-gray-100">
              <div className="flex items-center gap-4 bg-gray-50 rounded-3xl p-2 pr-4 focus-within:ring-2 focus-within:ring-gray-900/5 transition-all">
                <button className="p-4 hover:bg-gray-100 rounded-2xl text-gray-400 transition-all">
                  <Paperclip size={20} />
                </button>
                <input
                  type="text"
                  placeholder="Type your message here..."
                  className="flex-1 bg-transparent border-none py-4 text-sm font-bold placeholder:text-gray-300 focus:ring-0"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button className="p-4 hover:bg-gray-100 rounded-2xl text-gray-400 transition-all">
                  <Smile size={20} />
                </button>
                <button
                  onClick={handleSendMessage}
                  className="p-4 bg-gray-900 text-white rounded-2xl shadow-xl shadow-gray-200 hover:scale-105 active:scale-95 transition-all"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 rounded-[2.5rem] bg-white shadow-2xl flex items-center justify-center text-gray-200 mx-auto rotate-12">
              <Headset size={48} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                Select a Chat
              </h2>
              <p className="text-sm text-gray-400 font-medium mt-1">
                Choose a conversation to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatManagement;
