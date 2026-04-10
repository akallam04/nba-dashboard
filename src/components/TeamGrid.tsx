"use client";

import { useState, useCallback, useDeferredValue } from "react";
import type { Team } from "@/types";
import { TeamCard } from "./TeamCard";
import { SearchInput } from "./SearchInput";
import { EmptyState } from "./EmptyState";

interface TeamGridProps {
  teams: Team[];
}

export function TeamGrid({ teams }: TeamGridProps) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const filtered = deferredQuery
    ? teams.filter(
        (t) =>
          t.strTeam.toLowerCase().includes(deferredQuery.toLowerCase()) ||
          t.strLocation?.toLowerCase().includes(deferredQuery.toLowerCase()) ||
          t.strTeamShort?.toLowerCase().includes(deferredQuery.toLowerCase())
      )
    : teams;

  const clearSearch = useCallback(() => setQuery(""), []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <SearchInput
          value={query}
          onChange={setQuery}
          resultCount={filtered.length}
          className="flex-1 max-w-md"
        />
        <p className="text-sm text-muted shrink-0">
          {deferredQuery ? (
            <>
              <span className="text-primary font-medium">{filtered.length}</span>
              {" "}of {teams.length} teams
            </>
          ) : (
            <>
              <span className="text-primary font-medium">{teams.length}</span>
              {" "}teams
            </>
          )}
        </p>
      </div>

      {filtered.length === 0 ? (
        <EmptyState query={deferredQuery} onClear={clearSearch} />
      ) : (
        <div
          id="team-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
          role="list"
          aria-label="NBA teams"
        >
          {filtered.map((team, i) => (
            <div key={team.idTeam} role="listitem">
              <TeamCard team={team} index={i} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
