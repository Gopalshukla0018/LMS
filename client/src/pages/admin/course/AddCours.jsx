import { Button } from "@/components/ui/button";
import { Selector } from "@/components/ui/Selector";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const [createCourse, { data, error, isSuccess, isLoading }] =
    useCreateCourseMutation();

  const navigate = useNavigate();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };
  const createCourseHandler = async () => {
    await createCourse({ courseTitle, category });
  };

  // for displaying  toast

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course Craeted");
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 p-6 mx-4 my-6 transition-colors duration-300 bg-white shadow-lg rounded-2xl sm:mx-10 dark:bg-gray-900">
      {/* Header */}
      <div className="pb-4 mb-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="mb-2 text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
          Add Course Details
        </h1>
        <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
          Fill in the details below to create your new course.
        </p>
      </div>

      {/* Title Input */}
      <div className="flex flex-col gap-2 mt-6 sm:flex-row sm:items-center">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Title
        </Label>
        <input
          type="text"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          placeholder="Enter course name"
          className="flex-1 px-4 py-2 text-sm transition-colors border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-blue-400"
        />
      </div>

      {/* Category Selector */}
      <div className="flex flex-col gap-2 mt-6 sm:flex-row sm:items-center">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Category
        </Label>
        <Selector getSelectedCategory={getSelectedCategory} />
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-10">
        <Button
          variant="outline"
          className="gap-2 px-6 py-2 font-semibold text-gray-700 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          onClick={() => navigate("/admin/courses")}
        >
          Back
        </Button>
        <Button
          disabled={isLoading}
          onClick={createCourseHandler}
          className="gap-2 px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Add Course"
          )}
        </Button>
      </div>
    </div>
  );
};

export default AddCourse;
