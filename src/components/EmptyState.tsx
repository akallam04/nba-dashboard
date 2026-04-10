import { Button } from "./Button";

interface EmptyStateProps {
  query: string;
  onClear: () => void;
}

export function EmptyState({ query, onClear }: EmptyStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center py-24 text-center gap-5"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-elevated border border-border text-3xl select-none">
        🏀
      </div>
      <div className="space-y-1.5">
        <p className="font-display font-semibold text-xl text-primary">
          No teams found
        </p>
        <p className="text-sm text-muted max-w-xs">
          No NBA teams match{" "}
          <span className="text-secondary font-medium">
            &ldquo;{query}&rdquo;
          </span>
          . Try a different name or city.
        </p>
      </div>
      <Button variant="secondary" size="sm" onClick={onClear}>
        Clear search
      </Button>
    </div>
  );
}
