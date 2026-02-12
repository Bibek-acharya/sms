"use client";

import React from "react";
import { useParams } from "next/navigation";
import InquiryDetails from "@/components/dashboard/inquiry/InquiryDetails";

const InquiryPage = () => {
  const params = useParams();
  const id = params.id as string;

  return <InquiryDetails id={id} />;
};

export default InquiryPage;
