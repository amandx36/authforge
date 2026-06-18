
import { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <ResetPasswordForm />
    </Suspense>
  );
}

