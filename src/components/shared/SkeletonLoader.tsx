
// src/components/shared/SkeletonLoader.tsx: A simple skeleton loader component.
// Used to indicate loading states while data is being fetched.

import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoader = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-1/2" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
      <Skeleton className="h-64 w-full" />
    </div>
  );
};

export default SkeletonLoader;
