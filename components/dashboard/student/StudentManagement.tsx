"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DataTable from "../DataTable";

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  parentName: string;
  contact: string;
  status: "Active" | "Inactive" | "On Leave";
  email: string;
}

const StudentManagement = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [students] = useState<Student[]>([
    {
      id: "1",
      name: "John Maxwell Doe",
      rollNumber: "ADM-2024-001",
      class: "10-A",
      parentName: "Richard Doe",
      contact: "+1 234 567 890",
      status: "Active",
      email: "john.doe@example.com",
    },
    {
      id: "2",
      name: "Jane Smith",
      rollNumber: "ADM-2024-042",
      class: "10-B",
      parentName: "Robert Smith",
      contact: "+1 234 567 891",
      status: "Active",
      email: "jane.smith@example.com",
    },
    {
      id: "3",
      name: "Mike Johnson",
      rollNumber: "ADM-2024-088",
      class: "9-A",
      parentName: "William Johnson",
      contact: "+1 234 567 892",
      status: "Inactive",
      email: "mike.j@example.com",
    },
  ]);

  const columns = [
    {
      header: "Student Name",
      accessor: (student: Student) => (
        <div className="flex flex-col">
          <span className="font-bold text-gray-800 uppercase tracking-tight">
            {student.name}
          </span>
          <span className="text-[10px] text-gray-400 font-medium italic">
            {student.email}
          </span>
        </div>
      ),
    },
    {
      header: "ID / Roll",
      accessor: (student: Student) => (
        <span className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
          {student.rollNumber}
        </span>
      ),
    },
    {
      header: "Class & Section",
      accessor: (student: Student) => (
        <span className="text-[11px] font-black text-gray-600 uppercase">
          {student.class}
        </span>
      ),
    },
    {
      header: "Guardian",
      accessor: (student: Student) => (
        <div className="flex flex-col">
          <span className="text-[11px] font-black text-gray-700 uppercase">
            {student.parentName}
          </span>
          <span className="text-[9px] text-gray-400 font-bold">
            {student.contact}
          </span>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: (student: Student) => (
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              student.status === "Active"
                ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                : student.status === "On Leave"
                  ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.4)]"
                  : "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.4)]"
            }`}
          />
          <span
            className={`text-[10px] font-black uppercase tracking-widest ${
              student.status === "Active"
                ? "text-emerald-600"
                : student.status === "On Leave"
                  ? "text-amber-600"
                  : "text-red-500"
            }`}
          >
            {student.status}
          </span>
        </div>
      ),
    },
  ];

  const handleView = (student: Student) =>
    router.push(`/dashboard/student/${student.id}`);
  const handleEdit = (student: Student) =>
    router.push(`/dashboard/student/add?id=${student.id}`);
  const handleDelete = (student: Student) => {
    if (
      confirm(`Are you sure you want to deactivate ${student.name}'s record?`)
    ) {
      console.log("Deactivating student:", student.id);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-3xl border border-gray-100 shadow-sm gap-4">
        <div className="relative w-full sm:w-64 lg:w-96">
          <input
            type="text"
            placeholder="Search by name, roll, class or guardian..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 pl-10 pr-4 text-xs font-bold focus:ring-2 focus:ring-[#14B8A6]/20 transition-all text-gray-600 placeholder:text-gray-400"
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
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-6 py-3 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">
            Export List
          </button>
          <button
            onClick={() => router.push("/dashboard/student/add")}
            className="flex-1 sm:flex-none bg-[#14B8A6] text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-teal-500/20 hover:bg-[#0D9488] transition-all text-center"
          >
            + Register New Student
          </button>
        </div>
      </div>

      <DataTable
        data={students}
        columns={columns}
        searchQuery={searchQuery}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default StudentManagement;
