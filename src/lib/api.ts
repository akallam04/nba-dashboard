import nbaTeamsSnapshot from "@/data/nba-teams.json";
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
  // TheSportsDB free tier caps search_all_teams at 10 results and lookupteam returns
  // incorrect data. We use a committed snapshot for a complete, reliable team list.
  return (nbaTeamsSnapshot.teams as Team[])
    .slice()
    .sort((a, b) => (a.strTeam ?? "").localeCompare(b.strTeam ?? ""));
}

export async function getTeam(id: string): Promise<Team> {
  
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
