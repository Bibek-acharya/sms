import { Suspense } from "react";
import AddProspectForm from "@/components/dashboard/prospect/AddProspectForm";

export default function AddProspectPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div>Loading...</div>}>
        <AddProspectForm />
      </Suspense>
    </div>
  );
}
