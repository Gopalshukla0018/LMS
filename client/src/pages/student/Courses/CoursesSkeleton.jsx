import React from "react";

const CoursesSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white shadow-md dark:bg-gray-800 rounded-xl animate-pulse">
      <div className="w-full h-40 bg-gray-300 rounded-lg dark:bg-gray-700" />
      <div className="w-3/4 h-6 bg-gray-300 rounded dark:bg-gray-700" />
      <div className="w-full h-4 bg-gray-200 rounded dark:bg-gray-600" />
      <div className="w-5/6 h-4 bg-gray-200 rounded dark:bg-gray-600" />
      <div className="w-24 h-10 mt-2 bg-gray-300 rounded-full dark:bg-gray-700" />
    </div>
  );
};

export default CoursesSkeleton;
