import EnrollCourseBtn from "@/components/EnrollCourseBtn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { useGetCourseByIdQuery } from "@/features/api/courseApi";
import { BadgeInfo, Lock } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

const CourseDetail = () => {
  const { id } = useParams();
  const { data: courseData, isLoading, isError } = useGetCourseByIdQuery(id);

  if (isLoading) {
    return <div>Loading course details...</div>;
  }
  if (isError || !courseData) {
    return <div>Error loading course or course not found.</div>;
  }

  const { course } = courseData;

  

  console.log("video url is ", course.lectures[0].videoUrl);

 
  return (
    <div className="mt-16 space-y-10">

      <div className="bg-[#2D2F31] text-white">
        <div className="flex flex-col gap-2 px-4 py-8 mx-auto max-w-7xl md:px-8">
          <h1 className="text-2xl font-bold md:text-3xl">
            {course.courseTitle}
          </h1>
          <p className="text-base md:text-lg">{course.courseDescription}</p>
          <p className="text-base md:text-lg">
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">
              {course.creator.name}
            </span>
          </p>
          <div className="flex items-center gap-2 mt-1 text-sm">
            <BadgeInfo size={16} />
            <p>
              Last updated {new Date(course.updatedAt).toLocaleDateString()}
            </p>
          </div>

          <p className="mt-1 text-sm">
            Students enrolled: {course.enrolledStudents?.length || 0}+
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-10 px-4 mx-auto my-5 max-w-7xl md:px-8 lg:flex-row">
        {/* Left Section */}
        <div className="w-full space-y-6 lg:w-2/3">
          <h2 className="text-xl font-bold md:text-2xl">Description</h2>
          <p className="text-sm leading-relaxed">{course.courseDescription}</p>
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>
                {course.lectures?.length || 0} lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {(course.lectures || []).map((lecture, idx) => (
                <div
                  key={lecture._id || idx}
                  className="flex items-center gap-3 text-sm cursor-pointer hover:text-primary"
                >
                  <span>
                    <Lock size={14} />
                  </span>

                  <p>{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Section */}
        <div className="w-full space-y-5 lg:w-1/3">
          <Card>
            <CardContent className="flex flex-col p-4">
              <div className="flex items-center justify-center w-full mb-4 text-white bg-black aspect-video">
                <ReactPlayer
                  src={course.lectures[0].videoUrl}
                  controls={true}
                  width="100%"
                  height="100%"
                  config={{
                    file: {
                      attributes: {
                        controlsList: "nodownload", 
                      },
                      forceVideo: true,
                    },
                  }}
                  onContextMenu={(e) => e.preventDefault()} 
                />
                

              </div>
              <Separator className="my-2" />
              <h3 className="text-lg font-semibold md:text-xl">
                Course Price: ₹{course.coursePrice}
              </h3>
            </CardContent>
            <CardFooter className="flex justify-center">
              {
                <EnrollCourseBtn courseId={id} />
              }
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
