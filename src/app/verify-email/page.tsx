
import { Suspense } from "react";
import VerifyEmailContent from "./VerifyEmailContent";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <VerifyEmailContent />
    </Suspense>
  );
}

