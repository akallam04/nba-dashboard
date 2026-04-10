"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/ErrorState";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <ErrorState
        title="Failed to load teams"
        message="We couldn't fetch the NBA teams data. Check your connection and try again."
        onRetry={reset}
      />
    </div>
  );
}
