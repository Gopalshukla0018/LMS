import React from "react";
import Courses from "./Courses";
import CoursesSkeleton from "./Courses/CoursesSkeleton";
import Course from "./Courses/Course";
import { useLoardUserQuery } from "@/features/api/authApi";

const MyLearning = () => {
  const {data,isLoading}= useLoardUserQuery();
  const myLearningCourses = data?.user.enrolledCourses || []
  
  return (
    <div className="max-w-4xl mx-auto my-24 md:px-0">
      <h1 className="text-2xl font-bold">My learning</h1>
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearningCourses.length === 0 ? (
          <p>You are not enrolled in any courses</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
           {myLearningCourses.map((course,index)=> <Course  course={course} key={index}/> ) }
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;

// Skeleton component for loading state
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="h-40 bg-gray-300 rounded-lg dark:bg-gray-700 animate-pulse"
      ></div>
    ))}
  </div>
);
