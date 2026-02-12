import React from "react";

const DashboardPage = () => {
  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl p-8 border border-gray-100 min-h-[calc(100vh-10rem)] shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Example cards to show it's a dashboard */}
          {[
            { label: "Total Students", value: "1,234", color: "bg-blue-500" },
            { label: "Total Staff", value: "56", color: "bg-teal-500" },
            { label: "Total Classes", value: "24", color: "bg-purple-500" },
            {
              label: "Total Revenue",
              value: "$12,345",
              color: "bg-orange-500",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-2xl bg-[#F8FAFC] border border-gray-50 flex flex-col gap-2"
            >
              <span className="text-gray-500 text-xs font-semibold">
                {stat.label}
              </span>
              <span className="text-2xl font-bold text-gray-800">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
