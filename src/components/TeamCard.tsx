"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Team } from "@/types";
import { normalizeColor } from "@/lib/utils";

interface TeamCardProps {
  team: Team;
  index?: number;
}

export function TeamCard({ team, index = 0 }: TeamCardProps) {
  const accentColor = normalizeColor(team.strColour1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: Math.min(index * 0.04, 0.6),
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={{ y: -3 }}
    >
      <Link
        href={`/teams/${team.idTeam}`}
        className="group block rounded-2xl border border-border bg-elevated overflow-hidden transition-all duration-200 hover:border-border-hover hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        aria-label={`View ${team.strTeam} details`}
        tabIndex={0}
      >
        <div
          className="h-1 w-full transition-opacity duration-200 group-hover:opacity-90"
          style={{ backgroundColor: accentColor }}
          aria-hidden="true"
        />

        <div className="p-5">
          <div className="flex items-start gap-4">
            <div
              className="relative w-16 h-16 shrink-0 rounded-xl p-1.5 flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}18` }}
            >
              {team.strBadge ? (
                <Image
                  src={team.strBadge}
                  alt={`${team.strTeam} logo`}
                  fill
                  sizes="64px"
                  className="object-contain p-1"
                />
              ) : (
                <span className="text-2xl select-none" aria-hidden="true">
                  🏀
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0 pt-0.5">
              <h2 className="font-display font-bold text-base text-primary leading-tight truncate group-hover:text-accent transition-colors duration-150">
                {team.strTeam}
              </h2>
              {team.strTeamShort && (
                <p className="text-xs font-mono text-muted mt-0.5">
                  {team.strTeamShort}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 space-y-1.5 text-xs text-secondary">
            {team.strLocation && (
              <div className="flex items-center gap-1.5">
                <LocationIcon className="w-3.5 h-3.5 shrink-0 text-muted" />
                <span className="truncate">{team.strLocation}</span>
              </div>
            )}
            {team.strStadium && (
              <div className="flex items-center gap-1.5">
                <StadiumIcon className="w-3.5 h-3.5 shrink-0 text-muted" />
                <span className="truncate">{team.strStadium}</span>
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {team.intFormedYear && (
              <span className="inline-flex items-center h-6 px-2.5 rounded-full text-xs font-medium bg-surface text-secondary border border-border">
                Est. {team.intFormedYear}
              </span>
            )}
            {team.strDivision && (
              <span
                className="inline-flex items-center h-6 px-2.5 rounded-full text-xs font-medium border"
                style={{
                  backgroundColor: `${accentColor}18`,
                  borderColor: `${accentColor}40`,
                  color: accentColor,
                }}
              >
                {team.strDivision}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function LocationIcon({ className }: { className?: string }) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function StadiumIcon({ className }: { className?: string }) {
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
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
