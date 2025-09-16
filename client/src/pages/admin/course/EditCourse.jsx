import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import CourseTab from "./CourseTab";

const EditCourse = () => {
  return (
    <div className="flex-1 px-6 py-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Add details and information about your course
        </h1>
      <Link to="/admin/Lecture" className="px-4 py-2 text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700">
      Go to Lecture Page
      </Link>
      </div>
        <CourseTab/>
    
    </div>
  );
};

export default EditCourse;
