import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col w-4/5 space-y-3">
      <Skeleton className="h-44 w-44 mb-4 rounded-xl" />
      <div className="flex flex-col w-full justify-between ">
        <div>
          <Skeleton className="h-4 mb-4 w-44 " />
          <Skeleton className="h-4 mb-2" />
          <Skeleton className="h-4" />
        </div>
      </div>
    </div>
  );
}
