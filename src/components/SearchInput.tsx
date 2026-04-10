"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  resultCount?: number;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search teams…",
  className,
  resultCount,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={cn("relative", className)}>
      <label htmlFor="team-search" className="sr-only">
        Search NBA teams
      </label>
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-3.5 text-muted pointer-events-none w-4 h-4 shrink-0" />
        <input
          ref={inputRef}
          id="team-search"
          type="search"
          role="searchbox"
          aria-label="Search NBA teams"
          aria-controls="team-grid"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-11 pl-10 pr-10 rounded-xl border border-border bg-elevated text-primary placeholder:text-muted text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent hover:border-border-hover"
          autoComplete="off"
          spellCheck={false}
        />
        {value && (
          <button
            type="button"
            onClick={() => {
              onChange("");
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="absolute right-3 text-muted hover:text-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            <XIcon className="w-4 h-4" />
          </button>
        )}
      </div>
      {value && resultCount !== undefined && (
        <p className="sr-only" role="status" aria-live="polite">
          {resultCount === 0
            ? "No teams found"
            : `${resultCount} team${resultCount === 1 ? "" : "s"} found`}
        </p>
      )}
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
