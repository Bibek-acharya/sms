"use client";

import React, { useState } from "react";

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  initialPageSize?: number;
  searchQuery?: string;
}

const DataTable = <T extends { id: string | number }>({
  data,
  columns,
  onView,
  onEdit,
  onDelete,
  initialPageSize = 10,
  searchQuery = "",
}: DataTableProps<T>) => {
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
    new Set(),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);
  if (searchQuery !== prevSearchQuery) {
    setPrevSearchQuery(searchQuery);
    setCurrentPage(1);
  }

  const toggleSelectAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(data.map((item) => item.id)));
    }
  };

  const toggleSelectRow = (id: string | number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const filteredData = React.useMemo(() => {
    if (!searchQuery) return data;
    return data.filter((item) =>
      columns.some((col) => {
        let value: string | number | React.ReactNode = "";
        if (typeof col.accessor === "function") {
          value = col.accessor(item);
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const val = (item as any)[col.accessor];
          value = typeof val === "string" || typeof val === "number" ? val : "";
        }

        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        if (typeof value === "number") {
          return value.toString().includes(searchQuery);
        }
        return false;
      }),
    );
  }, [data, columns, searchQuery]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  return (
    <div className="w-full rounded-xl border border-gray-100 shadow-sm bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#14B8A6] text-white">
              <th className="py-4 px-6">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-white/20 bg-white/10 checked:bg-white accent-white cursor-pointer"
                  checked={selectedRows.size === data.length && data.length > 0}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="py-4 px-4 text-[11px] font-bold uppercase tracking-wider">
                SN
              </th>
              {columns.map((column, idx) => (
                <th
                  key={idx}
                  className={`py-4 px-4 text-[11px] font-bold uppercase tracking-wider ${column.className || ""}`}
                >
                  {column.header}
                </th>
              ))}
              <th className="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm">
            {paginatedData.map((item, index) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50/50 transition-colors group"
              >
                <td className="py-4 px-6">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-200 text-[#14B8A6] focus:ring-[#14B8A6] cursor-pointer"
                    checked={selectedRows.has(item.id)}
                    onChange={() => toggleSelectRow(item.id)}
                  />
                </td>
                <td className="py-4 px-4 text-gray-400 font-medium">
                  {startIndex + index + 1}
                </td>
                {columns.map((column, idx) => (
                  <td
                    key={idx}
                    className={`py-4 px-4 text-gray-600 ${column.className || ""}`}
                  >
                    {typeof column.accessor === "function"
                      ? column.accessor(item)
                      : (item[column.accessor] as React.ReactNode)}
                  </td>
                ))}
                <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                  {onView && (
                    <button
                      onClick={() => onView(item)}
                      className="p-1.5 text-blue-500 hover:bg-blue-50 rounded transition-colors"
                      title="View"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={() => onEdit(item)}
                      className="p-1.5 text-[#14B8A6] hover:bg-teal-50 rounded transition-colors"
                      title="Edit"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(item)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                      title="Delete"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-t border-gray-50 bg-white">
        <div className="flex items-center gap-4">
          <div className="text-xs font-medium text-gray-500">
            {filteredData.length > 0 ? (
              <>
                Showing <span className="text-gray-900">{startIndex + 1}</span>{" "}
                to{" "}
                <span className="text-gray-900">
                  {Math.min(startIndex + pageSize, filteredData.length)}
                </span>{" "}
                of <span className="text-gray-900">{filteredData.length}</span>{" "}
                entries
              </>
            ) : (
              "No entries found"
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Show
            </span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-[#F8FAFC] border border-gray-100 rounded-lg px-2 py-1 text-xs font-bold text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 transition-all cursor-pointer"
            >
              {[10, 20, 30, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-md border border-gray-100 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex gap-1">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-md text-xs font-bold transition-all ${
                  currentPage === i + 1
                    ? "bg-[#14B8A6] text-white shadow-lg shadow-teal-500/20"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-2 rounded-md border border-gray-100 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
