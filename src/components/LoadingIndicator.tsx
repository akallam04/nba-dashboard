import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

export function Spinner({ size = "md", className, label = "Loading…" }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center justify-center", className)}
    >
      <svg
        className={cn("animate-spin text-accent", sizeMap[size])}
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
    </span>
  );
}

export function TeamCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="rounded-2xl border border-border bg-elevated overflow-hidden animate-pulse"
    >
      <div className="h-1 bg-surface" />
      <div className="p-5 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-surface shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-surface rounded-md w-3/4" />
            <div className="h-3.5 bg-surface rounded-md w-1/2" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-surface rounded w-full" />
          <div className="h-3 bg-surface rounded w-5/6" />
        </div>
        <div className="flex gap-2 pt-1">
          <div className="h-6 w-20 bg-surface rounded-full" />
          <div className="h-6 w-24 bg-surface rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function TeamGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
      aria-busy="true"
      aria-label="Loading teams"
    >
      {Array.from({ length: count }).map((_, i) => (
        <TeamCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="animate-pulse space-y-8" aria-busy="true" aria-label="Loading team details">
      <div className="h-8 w-32 bg-surface rounded-lg" />
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="w-full lg:w-64 xl:w-80 shrink-0">
          <div className="aspect-square rounded-2xl bg-elevated border border-border" />
        </div>
        <div className="flex-1 space-y-6">
          <div className="space-y-3">
            <div className="h-12 bg-surface rounded-lg w-3/4" />
            <div className="h-5 bg-surface rounded w-1/3" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-elevated border border-border rounded-xl" />
            ))}
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-surface rounded w-full" />
            <div className="h-4 bg-surface rounded w-11/12" />
            <div className="h-4 bg-surface rounded w-4/5" />
            <div className="h-4 bg-surface rounded w-11/12" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface LoadingIndicatorProps {
  variant?: "spinner" | "skeleton-grid" | "skeleton-detail";
  count?: number;
  className?: string;
}

export function LoadingIndicator({
  variant = "spinner",
  count = 12,
  className,
}: LoadingIndicatorProps) {
  if (variant === "skeleton-grid") return <TeamGridSkeleton count={count} />;
  if (variant === "skeleton-detail") return <DetailSkeleton />;
  return (
    <div className={cn("flex items-center justify-center py-24", className)}>
      <Spinner size="lg" />
    </div>
  );
}
