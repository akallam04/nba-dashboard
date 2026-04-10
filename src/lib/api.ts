import type { Team, TeamsApiResponse, Player, PlayersApiResponse } from "@/types";

const BASE_URL = "https://www.thesportsdb.com/api/v1/json/3";

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function safeFetch<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new ApiError(`Request failed with status ${res.status}`, res.status);
  }
  return res.json() as Promise<T>;
}

export async function getAllTeams(): Promise<Team[]> {
  const data = await safeFetch<TeamsApiResponse>(
    `${BASE_URL}/search_all_teams.php?l=NBA`
  );
  if (!data.teams) return [];
  return data.teams.sort((a, b) => a.strTeam.localeCompare(b.strTeam));
}

export async function getTeam(id: string): Promise<Team> {
  // lookupteam.php always returns Arsenal on the free API key regardless of the
  // id parameter. Instead, fetch all NBA teams (cached, same URL as the list
  // page so Next.js deduplicates the request) and find by idTeam.
  const teams = await getAllTeams();
  const team = teams.find((t) => t.idTeam === id);
  if (!team) throw new ApiError("Team not found", 404);
  return team;
}

export async function getTeamPlayers(id: string): Promise<Player[]> {
  try {
    const data = await safeFetch<PlayersApiResponse>(
      `${BASE_URL}/lookup_all_players.php?id=${encodeURIComponent(id)}`
    );
    return data.player ?? [];
  } catch {
    return [];
  }
}
