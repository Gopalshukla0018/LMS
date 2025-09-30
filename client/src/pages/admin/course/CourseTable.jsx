import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetCreatorCoursesQuery } from "@/features/api/courseApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit2Icon, PlusCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const CourseTable = () => {
  const { data, isLoading } = useGetCreatorCoursesQuery();
  const navigate = useNavigate();

  if (isLoading) return <CourseTableSkeleton />;

  const courses = data?.courses || [];

  return (
    <div className="container px-4 py-8 mx-auto sm:px-6 lg:px-8">
      {/* --- Header Section --- */}
      <div className="flex flex-col items-start justify-between gap-4 mb-6 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          My Courses
        </h2>
        <Button
          className="flex items-center gap-2"
          onClick={() => navigate("/admin/courses/create")} // Use absolute path for clarity
        >
          <PlusCircle size={18} />
          Create Course
        </Button>
      </div>

      {/* --- Mobile View: List of Cards --- */}
      <div className="grid gap-4 md:hidden">
        {courses.length > 0 ? courses.map((course) => (
          <Card key={course._id} className="border dark:border-gray-800">
            <CardHeader>
              <CardTitle className="text-base font-semibold leading-tight truncate">
                {course.courseTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Price</p>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  ₹{course.coursePrice || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Status</p>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    course.isPublished
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                  }`}
                >
                  {course.isPublished ? "Published" : "Draft"}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center w-full gap-2"
                onClick={() => navigate(`/admin/courses/${course._id}`)}
              >
                <Edit2Icon size={14} /> Edit Course
              </Button>
            </CardFooter>
          </Card>
        )) : (
          <p className="py-10 text-center text-gray-500 dark:text-gray-400">You haven't created any courses yet.</p>
        )}
      </div>

      {/* --- Desktop View: Table --- */}
      <div className="hidden overflow-hidden border border-gray-200 rounded-lg md:block dark:border-gray-800">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-800">
            <TableRow>
              <TableHead className="w-[250px]">Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.length > 0 ? courses.map((course) => (
              <TableRow key={course._id} className="dark:border-gray-800">
                <TableCell className="font-medium">{course.courseTitle}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      course.isPublished
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                    }`}
                  >
                    {course.isPublished ? "Published" : "Draft"}
                  </span>
                </TableCell>
                <TableCell>₹{course.coursePrice || "N/A"}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigate(`/admin/courses/${course._id}`)}
                  >
                    <Edit2Icon size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  You haven't created any courses yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Skeleton loader for a better user experience
const CourseTableSkeleton = () => (
  <div className="container px-4 py-8 mx-auto sm:px-6 lg:px-8 animate-pulse">
    <div className="flex items-center justify-between mb-6">
      <Skeleton className="w-32 h-8" />
      <Skeleton className="h-10 w-36" />
    </div>
    <Skeleton className="w-full rounded-lg h-80" />
  </div>
);

export default CourseTable;