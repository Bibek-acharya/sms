import { Suspense } from "react";
import AddStudentForm from "@/components/dashboard/student/AddStudentForm";

export default function AddStudentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddStudentForm />
    </Suspense>
  );
}
