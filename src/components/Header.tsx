import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md"
            aria-label="NBA Teams Dashboard home"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white font-display font-bold text-sm select-none">
              NBA
            </span>
            <span className="font-display font-bold text-lg text-primary group-hover:text-accent transition-colors duration-150 hidden sm:block">
              Teams Dashboard
            </span>
          </Link>

          <nav className="flex items-center gap-3">
            <a
              href="https://www.thesportsdb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 text-sm text-muted hover:text-secondary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-1"
            >
              <span>Powered by TheSportsDB</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15,3 21,3 21,9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
