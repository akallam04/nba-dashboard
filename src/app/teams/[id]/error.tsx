"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/ErrorState";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function TeamError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Team page error:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <ErrorState
        title="Team not found"
        message="We couldn't load this team's data. It may not exist or the API is temporarily unavailable."
        onRetry={reset}
      />
    </div>
  );
}
