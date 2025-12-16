import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

export function LoadingState() {
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Filter input skeleton */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Map skeleton */}
      <div className="flex-1 min-h-0 relative">
        <Skeleton className="h-full w-full rounded-2xl" />
        <Spinner className="absolute inset-0 m-auto size-8" />
      </div>
    </div>
  );
}
