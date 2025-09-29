import React from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "@/features/api/courseApi";
import EnrollCourseBtn from "@/components/EnrollCourseBtn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { BadgeInfo, Users, Lock, PlayCircle, Video } from "lucide-react";

const CourseDetail = () => {
  const { id } = useParams();
  const { data: courseData, isLoading, isError } = useGetCourseByIdQuery(id);

  if (isLoading) {
    return <CourseDetailSkeleton />;
  }

  if (isError || !courseData) {
    return <div className="p-8 text-center">Error: Course not found.</div>;
  }

  const { course } = courseData;

  const previewLecture =
    course.lectures?.find((lec) => lec.isPreview) || course.lectures?.[0];

  return (
    <div className="mt-16 bg-gray-50 dark:bg-black">
      {/* --- Top Banner Section --- */}
      <div className="text-white bg-gray-900 dark:bg-gray-950">
        <div className="container px-4 py-12 mx-auto md:px-6 lg:py-16">
          <div className="max-w-4xl space-y-3">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {course.courseTitle}
            </h1>
            <p className="text-lg text-gray-300 md:text-xl">
              {course.courseSubTitle}
            </p>
            <div className="flex flex-wrap items-center text-sm text-gray-400 gap-x-6 gap-y-2">
              <span>
                Created by{" "}
                <span className="font-semibold text-indigo-300">
                  {course.creator.name}
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <BadgeInfo size={16} />
                Last updated {new Date(course.updatedAt).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={16} />
                {course.enrolledStudents?.length || 0} students enrolled
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="container grid grid-cols-1 gap-8 px-4 py-10 mx-auto md:px-6 lg:grid-cols-3 lg:gap-12">
        {/* Left Section (Course Content) */}
        <div className="space-y-8 lg:col-span-2">
          <Card className="border dark:border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl">Course Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                {course.courseDescription}
              </p>
            </CardContent>
          </Card>

          <Card className="border dark:border-gray-800">
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>
                {course.lectures?.length || 0} lectures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {course.lectures.map((lecture) => (
                  <AccordionItem value={lecture._id} key={lecture._id}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-3">
                        {lecture.isPreview ? (
                          <PlayCircle className="text-green-500" size={18} />
                        ) : (
                          <Lock className="text-gray-500" size={18} />
                        )}
                        <span>{lecture.lectureTitle}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      This lecture is{" "}
                      {lecture.isPreview ? "available for preview." : "locked."}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Right Section (Purchase Card) - now with sticky positioning on larger screens */}
        <div className="lg:sticky top-24 h-fit">
          <Card className="overflow-hidden border shadow-lg dark:border-gray-800">
            <CardContent className="p-0">
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
            </CardContent>
            <div className="p-6">
              <h3 className="mb-4 text-3xl font-bold text-center">
                ₹{course.coursePrice}
              </h3>
              <EnrollCourseBtn courseId={id} price={course.coursePrice} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const CourseDetailSkeleton = () => (
  <div className="mt-16 animate-pulse">
    <div className="w-full h-48 bg-gray-200 dark:bg-gray-800"></div>
    <div className="container grid grid-cols-1 gap-8 px-4 py-10 mx-auto md:px-6 lg:grid-cols-3 lg:gap-12">
      <div className="space-y-8 lg:col-span-2">
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-64" />
      </div>
      <div className="lg:sticky top-24 h-fit">
        <Skeleton className="w-full h-96" />
      </div>
    </div>
  </div>
);

export default CourseDetail;
