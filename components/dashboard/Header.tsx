"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const getPageInfo = (path: string) => {
    if (path.startsWith("/dashboard/staff/")) {
      return {
        title: "Staff Member Profile",
        description: "Viewing detailed professional and personal information",
      };
    }

    if (path.startsWith("/dashboard/student/")) {
      return {
        title: "Student Profile",
        description: "Viewing comprehensive student academic and personal file",
      };
    }

    if (path.startsWith("/dashboard/labs/") && path !== "/dashboard/labs") {
      return {
        title: "Lab Session Console",
        description: "Managing session attendance and resource monitoring",
      };
    }

    if (path.includes("/marks")) {
      return {
        title: "Exam Marks Entry",
        description: "Enter and validate student exam performances",
      };
    }

    switch (path) {
      case "/dashboard":
        return {
          title: "Dashboard Overview",
          description: "Welcome back! Here's what's happening today.",
        };
      case "/dashboard/staff":
        return {
          title: "Staff Management",
          description:
            "Manage all staff members and their roles in this section",
        };
      case "/dashboard/student":
        return {
          title: "Student Directory",
          description:
            "Manage your students and their academic records in this section",
        };
      case "/dashboard/exams":
        return {
          title: "Examinations",
          description: "Manage school exams, schedules, and student marks",
        };
      case "/dashboard/exams/create":
        return {
          title: "Create New Exam",
          description: "Design and schedule new academic evaluations",
        };
      case "/dashboard/exams/marks":
        return {
          title: "Exam Marks Entry",
          description: "Enter and validate student exam performances",
        };
      case "/dashboard/admission":
        return {
          title: "Admission Management",
          description: "Track student inquiries and applications journey",
        };
      case "/dashboard/admission/new":
        return {
          title: "New Student Admission",
          description: "Design and complete the student onboarding process",
        };
      case "/dashboard/class/add":
        return {
          title: "Add New Class & Section",
          description: "Create new academic classes and define their sections",
        };
      case "/dashboard/inquiry":
        return {
          title: "Inquiry Management",
          description: "Track leads, admissions, and visitor logs",
        };
      case "/dashboard/inquiry/new":
        return {
          title: "New Inquiry Entry",
          description: "Capture visitor details, call logs, and requests",
        };
      case "/dashboard/lead":
        return {
          title: "Lead Management",
          description: "Capture and convert potential students & inquiries",
        };
      case "/dashboard/lead/new":
        return {
          title: "Add New Lead",
          description: "Design custom forms and capture lead details",
        };
      case "/dashboard/prospect":
        return {
          title: "Prospect Management",
          description: "Track and nurture qualified leads for admission",
        };
      case "/dashboard/prospect/add":
        return {
          title: "Add New Prospect",
          description: "Capture comprehensive parent and academic details",
        };
      case "/dashboard/labs":
        return {
          title: "Lab & Inventory Management",
          description: "Manage lab sessions, tracking, and chemical inventory",
        };
      case "/dashboard/finance":
        return {
          title: "Finance & Accounts",
          description: "Monitor school revenue, expenses, and transactions",
        };
      case "/dashboard/class":
        return {
          title: "Classroom Management",
          description: "Manage classes, sections, and classroom assignments",
        };
      case "/dashboard/calendar":
        return {
          title: "Academic Calendar",
          description: "Stay updated with school events, holidays, and deadlines",
        };
      case "/dashboard/routine":
        return {
          title: "Academic Routine",
          description: "Manage and view class, lab, and teacher schedules",
        };
      case "/dashboard/announcement":
        return {
          title: "Announcements",
          description: "Broadcast news and updates to students and staff",
        };
      case "/dashboard/report":
        return {
          title: "Report Generator",
          description: "Generate and export detailed school analytics",
        };
      default:
        return {
          title: "School Management System",
          description: "Everything you need to manage your institution",
        };
    }
  };

  const { title, description } = getPageInfo(pathname);

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10 w-full">
      <div className="flex items-center gap-12">
        {/* Page Title & Description */}
        <div className="flex flex-col">
          <h1 className="text-lg font-bold text-gray-800 leading-tight">
            {title}
          </h1>
          <p className="text-[11px] font-medium text-gray-400 mt-0.5">
            {description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="p-2.5 rounded-full border border-gray-100 hover:bg-gray-50 transition-colors text-gray-500 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
          <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Settings */}
        <button className="p-2.5 rounded-full border border-gray-100 hover:bg-gray-50 transition-colors text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
          <div className="text-right">
            <p className="text-sm font-bold text-gray-800 leading-none">
              Person Name
            </p>
            <p className="text-[10px] font-medium text-gray-400 mt-1">Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
            <Image
              src="/assets/logo.png"
              alt="User"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
