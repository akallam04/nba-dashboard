import { getAllTeams } from "@/lib/api";
import { TeamGrid } from "@/components/TeamGrid";

export default async function HomePage() {
  const teams = await getAllTeams();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <section className="mb-10 md:mb-12">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-mono uppercase tracking-widest text-muted">
            2024–25 Season
          </p>
          <h1 className="font-display font-bold text-4xl md:text-5xl xl:text-6xl text-primary leading-none tracking-tight">
            All 30 <span className="text-accent">NBA</span> Teams
          </h1>
          <p className="text-secondary text-base md:text-lg mt-2 max-w-xl">
            Browse every franchise in the league. Click a team to explore their
            history, home arena, and roster.
          </p>
        </div>
      </section>

      <TeamGrid teams={teams} />
    </div>
  );
}
