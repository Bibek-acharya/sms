"use client";

import React from "react";
import { useParams } from "next/navigation";
import ProspectDetails from "@/components/dashboard/prospect/ProspectDetails";

const ProspectDetailsPage = () => {
  const params = useParams();
  const id = params.id as string;

  return <ProspectDetails id={id} />;
};

export default ProspectDetailsPage;
