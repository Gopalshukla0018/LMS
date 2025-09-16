import { Button } from "@/components/ui/button";
import { Selector } from "@/components/Selectors/Selector";
import { useCreateCourseMutation } from "@/features/api/courseApi";
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

  const getSelectedCategory = (value) => setCategory(value);

  const createCourseHandler = async () => {
    await createCourse({ courseTitle, category });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course Created");
      navigate("/admin/courses");
    }
  }, [isSuccess, error]);

  return (
    <div className="w-full min-h-screen px-6 py-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* Full Page Header */}
      <div className="mb-10 text-center">
        <h1 className="mb-2 text-4xl font-extrabold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
          Add New Course
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Fill in the course details and save to continue
        </p>
      </div>

      {/* Full Width Form */}
      <div className="grid w-full gap-8 p-8 shadow-xl bg-white/80 backdrop-blur-lg rounded-2xl dark:bg-gray-900/70">
        {/* Title Input */}
        <div className="relative">
          <input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder=" "
            className="w-full px-4 pt-5 pb-2 text-base bg-transparent border border-gray-300 peer rounded-xl dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
          />
          <label className="absolute left-3 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-blue-600 dark:peer-focus:text-blue-400">
            Course Title
          </label>
        </div>

        {/* Category Selector */}
        <div className="p-5 border border-gray-200 rounded-xl bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700">
          <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            Select Category
          </p>
          <Selector getSelectedCategory={getSelectedCategory} />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/courses")}
            className="px-6 py-3 text-base font-medium transition-all bg-white border border-gray-200 shadow-md rounded-xl hover:shadow-lg dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
          >
            Back
          </Button>
          <Button
            disabled={isLoading}
            onClick={createCourseHandler}
            className="px-6 py-3 text-base font-semibold text-white transition-all shadow-lg rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Please wait
              </>
            ) : (
              "Add Course"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
