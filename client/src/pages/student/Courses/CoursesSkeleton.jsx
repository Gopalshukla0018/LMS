import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
const CoursesSkeleton = () => {
  return (
    <div className="overflow-hidden transition-shadow bg-white rounded-lg shadow-md  hover:shadow-lg">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="w-3/4 h-6" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="w-6 h-6 rounded-full" />
            <Skeleton className="w-20 h-4" />
          </div>
          <Skeleton className="w-16 h-4" />
        </div>
        <Skeleton className="w-1/4 h-4" />
      </div>
    </div>
  );
};

export default CoursesSkeleton;
