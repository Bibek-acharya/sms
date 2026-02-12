import React, { Suspense } from "react";
import AddStaffForm from "@/components/dashboard/staff/AddStaffForm";

const AddStaffPage = () => {
  return (
    <div className="w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <AddStaffForm />
      </Suspense>
    </div>
  );
};

export default AddStaffPage;
