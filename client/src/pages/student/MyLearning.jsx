import React from "react";
import Course from "./Courses/Course";
import { useLoardUserQuery } from "@/features/api/authApi";
import { Link } from "react-router-dom";

const MyLearning = () => {
  const { data, isLoading } = useLoardUserQuery();
  const myLearningCourses = data?.user.enrolledCourses || [];

  return (
    <div className="max-w-6xl gap-8 px-4 mx-auto my-12 mt-20 sm:px-6 lg:px-8 sm:my-36 lg:my-20">
      <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">My Learning</h1>

      <div className="mt-6">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearningCourses.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            You are not enrolled in any courses
          </p>
        ) : (
       
            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {myLearningCourses.map((course, index) => (
                <Course course={course} key={index} />
              ))}
            </div>
  
        )}
      </div>
    </div>
  );
};

export default MyLearning;

// Skeleton component for loading state
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="h-40 bg-gray-300 rounded-lg sm:h-48 lg:h-56 dark:bg-gray-700 animate-pulse"
      ></div>
    ))}
  </div>
);
