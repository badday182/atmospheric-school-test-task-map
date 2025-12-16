import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

export function LoadingState() {
  return (
    <div className="relative h-full w-full">
      <Skeleton className="h-full w-full rounded-xl" />
      <Spinner className="absolute inset-0 m-auto size-4" />
    </div>
  );
}
