"use client";

import React, { useState } from "react";
import DataTable from "../DataTable";
import { useRouter } from "next/navigation";

interface Classroom {
  id: string;
  className: string;
  section: string;
  classTeacher: string;
  totalStudents: number;
  capacity: number;
  roomNo: string;
  status: "Active" | "Inactive";
}

const mockClasses: Classroom[] = [
  {
    id: "1",
    className: "Grade 10",
    section: "A",
    classTeacher: "Sarah Johnson",
    totalStudents: 32,
    capacity: 40,
    roomNo: "R-101",
    status: "Active",
  },
  {
    id: "2",
    className: "Grade 10",
    section: "B",
    classTeacher: "Robert Wilson",
    totalStudents: 28,
    capacity: 40,
    roomNo: "R-102",
    status: "Active",
  },
  {
    id: "3",
    className: "Grade 9",
    section: "A",
    classTeacher: "Emily Davis",
    totalStudents: 35,
    capacity: 35,
    roomNo: "R-91",
    status: "Active",
  },
  {
    id: "4",
    className: "Grade 9",
    section: "B",
    classTeacher: "Michael Chen",
    totalStudents: 15,
    capacity: 35,
    roomNo: "R-92",
    status: "Inactive",
  },
  {
    id: "5",
    className: "Grade 8",
    section: "A",
    classTeacher: "Jessica Brown",
    totalStudents: 30,
    capacity: 40,
    roomNo: "R-81",
    status: "Active",
  },
];

const ClassManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const columns = [
    {
      header: "Class & Section",
      accessor: (item: Classroom) => (
        <div className="flex flex-col">
          <span className="font-bold text-gray-700">{item.className}</span>
          <span className="text-[11px] text-[#14B8A6] font-bold">
            Section {item.section}
          </span>
        </div>
      ),
    },
    { header: "Class Teacher", accessor: "classTeacher" as const },
    {
      header: "Students / Capacity",
      accessor: (item: Classroom) => (
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-600">
            {item.totalStudents}
          </span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-400 text-xs">{item.capacity}</span>
          <div className="ml-2 w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${item.totalStudents >= item.capacity ? "bg-amber-500" : "bg-[#14B8A6]"}`}
              style={{
                width: `${(item.totalStudents / item.capacity) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      ),
    },
    { header: "Room No", accessor: "roomNo" as const },
    {
      header: "Status",
      accessor: (item: Classroom) => (
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            item.status === "Active"
              ? "bg-green-50 text-green-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          {item.status}
        </span>
      ),
    },
  ];

  const handleView = (item: Classroom) =>
    router.push(`/dashboard/class/${item.id}`);
  const handleEdit = (item: Classroom) => console.log("Editing", item);
  const handleDelete = (item: Classroom) => console.log("Deleting", item);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm gap-4">
        <div className="relative w-full sm:w-64 lg:w-80">
          <input
            type="text"
            placeholder="Search classes..."
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
        <button
          onClick={() => router.push("/dashboard/class/add")}
          className="bg-[#14B8A6] text-white px-6 py-2.5 rounded-lg font-bold shadow-lg shadow-teal-500/20 hover:bg-[#0D9488] transition-all w-full sm:w-auto"
        >
          + Add New Class
        </button>
      </div>

      <DataTable
        data={mockClasses}
        columns={columns}
        searchQuery={searchQuery}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ClassManagement;
