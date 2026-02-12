"use client";

import React, { use } from "react";
import LabClassDetails from "@/components/dashboard/labs/LabClassDetails";

const LabDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  return <LabClassDetails id={id} />;
};

export default LabDetailsPage;
