"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./SidebarContext";

const Sidebar = () => {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();

  const menuItems: {
    name: string;
    icon: string;
    path: string;
    hasSub?: boolean;
  }[] = [
    { name: "Dashboard", icon: "dashboard", path: "/dashboard" },
    { name: "Staff", icon: "staff", path: "/dashboard/staff" },
    {
      name: "Student",
      icon: "student",
      path: "/dashboard/student",
    },
    { name: "Class", icon: "class", path: "/dashboard/class" },
    { name: "Exams", icon: "exams", path: "/dashboard/exams" },
    {
      name: "Admission",
      icon: "admission",
      path: "/dashboard/admission",
    },
    { name: "Inquiry", icon: "inquiry", path: "/dashboard/inquiry" },
    { name: "Lead", icon: "lead", path: "/dashboard/lead" },
    { name: "Prospect", icon: "prospect", path: "/dashboard/prospect" },
    { name: "Finance", icon: "finance", path: "/dashboard/finance" },
    { name: "Accounts", icon: "accounts", path: "/dashboard/accounts" },
    {
      name: "Academic calendar",
      icon: "calendar",
      path: "/dashboard/calendar",
    },
    {
      name: "Routine",
      icon: "routine",
      path: "/dashboard/routine",
    },
    {
      name: "Announcement",
      icon: "announcement",
      path: "/dashboard/announcement",
    },
    { name: "Chat", icon: "chat", path: "/dashboard/chat" },
    {
      name: "Appointment",
      icon: "appointment",
      path: "/dashboard/appointment",
    },
    { name: "Labs", icon: "labs", path: "/dashboard/labs" },
    { name: "Report", icon: "report", path: "/dashboard/report" },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "dashboard":
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        );
      case "staff":
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case "student":
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        );
      case "class":
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        );
      case "exams":
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="m9 15 2 2 4-4" />
          </svg>
        );
      case "admission":
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="16" y1="11" x2="22" y2="11" />
          </svg>
        );
      case "inquiry":
      case "chat":
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        );
      case "lead":
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <polyline points="16 11 18 13 22 9" />
          </svg>
        );
      case "prospect":
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        );
      case "finance":
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
            <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
            <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
          </svg>
        );
      case "accounts":
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        );
      case "calendar":
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        );
      case "routine":
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <line x1="3" y1="16" x2="21" y2="16" />
            <line x1="8" y1="4" x2="8" y2="22" />
            <line x1="16" y1="4" x2="16" y2="22" />
          </svg>
        );
      case "announcement":
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        );
      case "appointment":
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <polyline points="16 11 18 13 22 9" />
          </svg>
        );
      case "labs":
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16.3 6.2 11 11.5 8.5 9 3 14.5l5 2 2 5 5.5-5.5L21 11.3l-4.7-5.1Z" />
            <path d="M9 15l-1.5 1.5" />
            <path d="M15 9l-1.5 1.5" />
          </svg>
        );
      case "report":
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        );
      case "profile":
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        );
      default:
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } h-full bg-white border-r border-gray-100 flex flex-col p-4 overflow-y-auto relative z-20 transition-all duration-300 ease-in-out`}
    >
      {/* School Name & Toggle Section */}
      <div className={`mb-10 px-2 ${isCollapsed ? "items-center" : ""}`}>
        <div
          className={`flex items-center gap-3 mb-6 cursor-pointer hover:opacity-80 transition-opacity ${
            isCollapsed ? "justify-center" : ""
          }`}
          onClick={toggleSidebar}
        >
          <div className="w-10 h-10 rounded-xl bg-[#14B8A6] flex items-center justify-center text-white shadow-lg shadow-teal-500/20 shrink-0">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <h1 className="text-sm font-bold text-gray-800 leading-tight">
                School Management
              </h1>
              <span className="text-[10px] font-bold text-[#14B8A6] uppercase tracking-wider">
                System
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mb-8">
        {!isCollapsed && (
          <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-4">
            Menu
          </h2>
        )}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            const isRadiusLg = isCollapsed;
            return (
              <Link
                key={item.name}
                href={item.path}
                title={isCollapsed ? item.name : ""}
                className={`flex items-center justify-between px-3 py-2.5 transition-all group ${
                  isRadiusLg ? "rounded-lg" : "rounded-xl"
                } ${
                  isActive
                    ? "bg-[#14B8A6] text-white shadow-lg shadow-teal-500/20"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                } ${isCollapsed ? "justify-center" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={
                      isActive
                        ? "text-white"
                        : "text-gray-400 group-hover:text-gray-900"
                    }
                  >
                    {getIcon(item.icon)}
                  </span>
                  {!isCollapsed && (
                    <span className="text-[13px] font-semibold truncate">
                      {item.name}
                    </span>
                  )}
                </div>
                {!isCollapsed && item.hasSub && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={
                      isActive
                        ? "text-white"
                        : "text-gray-400 group-hover:text-gray-900"
                    }
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
