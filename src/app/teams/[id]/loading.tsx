import { DetailSkeleton } from "@/components/LoadingIndicator";

export default function TeamLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <DetailSkeleton />
    </div>
  );
}
