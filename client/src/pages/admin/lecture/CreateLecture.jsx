import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetCourseLecturesQuery,
} from "@/features/api/courseApi";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");

  console.log("title is ", lectureTitle);

  const navigate = useNavigate();
  const params = useParams();
  const courseID = params.courseId;
  console.log("course id for debug is ", courseID);

  // fetch from api
  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();
  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
  } = useGetCourseLecturesQuery(courseID);
  console.log("for debug data is :-", lectureData);

  const createLectureHandler = async () => {
    const courseId = params.courseId;

    await createLecture({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Lecture Created");

      // navigate(`/admin/courses/${courseID}/lecture`);
    }

    if (error) {
      toast.error(error?.data?.message || "Failed to create lecture");
    }
  }, [isSuccess, error]);
  return (
    <div className="w-full min-h-screen px-6 py-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* Full Page Header */}
      <div className="mb-10 text-center">
        <h1 className="mb-2 text-4xl font-extrabold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
          Add New Lecture
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
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder=" "
            className="w-full px-4 pt-5 pb-2 text-base bg-transparent border border-gray-300 peer rounded-xl dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
          />
          <Label className="absolute left-3 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-blue-600 dark:peer-focus:text-blue-400">
            Course Title
          </Label>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/courses/${courseID}`)}
            className="px-6 py-3 text-base font-medium transition-all bg-white border border-gray-200 shadow-md rounded-xl hover:shadow-lg dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
          >
            Back to course
          </Button>
          <Button
            disabled={isLoading}
            onClick={createLectureHandler}
            className="px-6 py-3 text-base font-semibold text-white transition-all shadow-lg rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Please wait
              </>
            ) : (
              "Create lecture"
            )}
          </Button>
        </div>

        <div className="mt-10">
          {lectureLoading ? (
            <p>Loading lectures...</p>
          ) : lectureError ? (
            <p>Failed to load lectures.</p>
          ) : !lectureData?.lectures || lectureData?.lectures.length === 0 ? (
            <p>No lectures available.</p>
          ) : (
            lectureData.lectures.map((lecture, index) => (
              <div className="mt-4" key={lecture._id}>
                <Lecture lecture={lecture} index={index} courseID={courseID} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;


