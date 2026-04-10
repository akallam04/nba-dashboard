"use client";

import { Button } from "./Button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load the data. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center py-24 text-center gap-5"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-elevated border border-border text-3xl select-none">
        ⚠️
      </div>
      <div className="space-y-1.5">
        <p className="font-display font-semibold text-xl text-primary">{title}</p>
        <p className="text-sm text-muted max-w-xs">{message}</p>
      </div>
      {onRetry && (
        <Button variant="primary" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
