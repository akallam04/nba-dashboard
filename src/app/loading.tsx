import { TeamGridSkeleton } from "@/components/LoadingIndicator";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <section className="mb-10 md:mb-12">
        <div className="flex flex-col gap-2 animate-pulse">
          <div className="h-3.5 w-28 bg-surface rounded" />
          <div className="h-12 w-64 bg-surface rounded-lg" />
          <div className="h-5 w-80 bg-surface rounded mt-1" />
        </div>
      </section>

      <div className="mb-6">
        <div className="h-11 w-full max-w-md bg-elevated border border-border rounded-xl animate-pulse" />
      </div>

      <TeamGridSkeleton count={30} />
    </div>
  );
}
