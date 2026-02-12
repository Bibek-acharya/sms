"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DataTable from "@/components/dashboard/DataTable";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
  contact: string;
  status: "Active" | "On Leave" | "Inactive";
}

const mockStaff: StaffMember[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Mathematics Teacher",
    email: "sarah.j@school.com",
    contact: "+1 234 567 8901",
    status: "Active",
  },
  {
    id: "2",
    name: "Robert Wilson",
    role: "Physics Teacher",
    email: "robert.w@school.com",
    contact: "+1 234 567 8902",
    status: "Active",
  },
  {
    id: "3",
    name: "Emily Davis",
    role: "English HOD",
    email: "emily.d@school.com",
    contact: "+1 234 567 8903",
    status: "On Leave",
  },
  {
    id: "4",
    name: "Michael Chen",
    role: "Computer Science",
    email: "michael.c@school.com",
    contact: "+1 234 567 8904",
    status: "Active",
  },
  {
    id: "5",
    name: "Jessica Brown",
    role: "Admin Staff",
    email: "jessica.b@school.com",
    contact: "+1 234 567 8905",
    status: "Inactive",
  },
];

const StaffManagement = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const columns = [
    {
      header: "Staff Name",
      accessor: (item: StaffMember) => (
        <div className="flex flex-col">
          <span className="font-bold text-gray-700">{item.name}</span>
          <span className="text-[11px] text-gray-400 font-medium lowercase italic">
            {item.email}
          </span>
        </div>
      ),
    },
    {
      header: "Role / Designation",
      accessor: (item: StaffMember) => (
        <div className="flex flex-col">
          <span className="font-bold text-gray-600 text-[11px] uppercase tracking-wider">
            {item.role}
          </span>
          <span className="text-[10px] text-emerald-500 font-black uppercase">
            Teaching Staff
          </span>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: (item: StaffMember) => (
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              item.status === "Active"
                ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                : item.status === "On Leave"
                  ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.4)]"
                  : "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.4)]"
            }`}
          />
          <span
            className={`text-[10px] font-black uppercase tracking-widest ${
              item.status === "Active"
                ? "text-emerald-600"
                : item.status === "On Leave"
                  ? "text-amber-600"
                  : "text-red-500"
            }`}
          >
            {item.status}
          </span>
        </div>
      ),
    },
    { header: "Contact Info", accessor: "contact" as const },
  ];

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm gap-4">
        <div className="relative w-full sm:w-64 lg:w-80">
          <input
            type="text"
            placeholder="Search staff members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-gray-100 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 transition-all text-gray-600 placeholder:text-gray-400"
          />
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        </div>
        <Link
          href="/dashboard/staff/add"
          className="bg-[#14B8A6] text-white px-6 py-2.5 rounded-lg font-bold shadow-lg shadow-teal-500/20 hover:bg-[#0D9488] transition-all w-full sm:w-auto text-center"
        >
          + Add New Staff
        </Link>
      </div>

      <DataTable
        data={mockStaff}
        columns={columns}
        searchQuery={searchQuery}
        onView={(staff) => router.push(`/dashboard/staff/${staff.id}`)}
        onEdit={(staff) => router.push(`/dashboard/staff/add?id=${staff.id}`)}
        onDelete={(staff) => {
          if (confirm(`Are you sure you want to deactivate ${staff.name}?`)) {
            console.log("Deactivating staff member:", staff.id);
          }
        }}
      />
    </div>
  );
};

export default StaffManagement;
