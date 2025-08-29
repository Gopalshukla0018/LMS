import React from "react";
import CoursesSkeleton from "./Courses/CoursesSkeleton";
import Course from "./Courses/Course";
const courses = [1, 2, 3, 4, 5, 6, , 7];
const Courses = () => {
  const isLoading = false;
  return (
    <div className="bg-gray-50">
      <div className="p-6 mx-auto max-w-7xl">
        <h2 className="mb-10 text-3xl font-bold text-center "> Our Courses</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CoursesSkeleton key={index} />
              ))
            : (courses.map((course, index) =>  <Course key={index}/>))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
