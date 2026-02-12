"use client";

import React from "react";
import { useParams } from "next/navigation";
import LeadDetails from "@/components/dashboard/lead/LeadDetails";

const LeadDetailsPage = () => {
  const params = useParams();
  const id = params.id as string;

  return <LeadDetails id={id} />;
};

export default LeadDetailsPage;
