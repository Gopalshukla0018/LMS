import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
const EditProfileSkeleton = () => {
  return (
    <div className="max-w-4xl px-4 mx-auto my-24 space-y-10">
      {/* Profile Heading */}
      <Skeleton className="w-1/3 h-8 rounded-md md:w-1/5" />

      {/* Profile Info */}
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
        {/* Avatar */}
        <Skeleton className="rounded-full w-28 h-28 md:w-32 md:h-32" />

        {/* Info */}
        <div className="flex-1 w-full space-y-4">
          <Skeleton className="w-1/2 h-5 rounded-md" />

          <Skeleton className="w-3/4 h-5 rounded-md" />
          <Skeleton className="w-1/3 h-5 rounded-md" />
          {/* Edit Button */}
          <Skeleton className="h-10 mt-2 rounded-md w-36" />
        </div>
      </div>

      {/* Courses Section */}
      <div className="space-y-4">
        <Skeleton className="w-1/3 h-6 rounded-md" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <Card key={index} className="p-4">
              <CardContent className="space-y-2">
                <Skeleton className="w-full h-24 rounded-md" />
                <Skeleton className="w-3/4 h-4 rounded-md" />
                <Skeleton className="w-1/2 h-4 rounded-md" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditProfileSkeleton;
