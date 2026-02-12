import { Suspense } from "react";
import NewAdmissionForm from "@/components/dashboard/admission/NewAdmissionForm";

export default function NewAdmissionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewAdmissionForm />
    </Suspense>
  );
}
