import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useGetCreatorCoursesQuery } from "@/features/api/courseApi";
import { Edit2Icon, PlusCircle } from "lucide-react";

const CourseTable = () => {
  const { data, isLoading, refetch } = useGetCreatorCoursesQuery();
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <h1 className="text-lg text-center text-gray-800 dark:text-gray-200">Loading..</h1>;

  return (
    <div className="max-w-5xl px-4 mx-auto mt-12">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-800 dark:text-gray-100">
          My Courses
        </h2>
        <Button
          className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700"
          onClick={() => navigate("create")}
        >
          <PlusCircle size={18} />
          Create Course
        </Button>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden border border-gray-200 shadow-sm dark:border-gray-700 rounded-xl">
        <Table>
          <TableCaption className="text-gray-500 dark:text-gray-400">
            A list of your created courses.
          </TableCaption>

          <TableHeader className="bg-gray-50 dark:bg-gray-800">
            <TableRow>
              <TableHead className="w-[120px] text-gray-700 dark:text-gray-300 font-medium">Price</TableHead>
              <TableHead className="font-medium text-gray-700 dark:text-gray-300">Status</TableHead>
              <TableHead className="font-medium text-gray-700 dark:text-gray-300">Title</TableHead>
              <TableHead className="font-medium text-right text-gray-700 dark:text-gray-300">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.courses?.map((course) => (
              <TableRow
                key={course._id}
                className="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <TableCell className="font-medium text-gray-800 dark:text-gray-200">
                  {course?.coursePrice || "NA"}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      course?.isPublished
                        ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300"
                    }`}
                  >
                    {course?.isPublished ? "Published" : "Draft"}
                  </span>
                </TableCell>
                <TableCell className="text-gray-700 dark:text-gray-200">{course?.courseTitle}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 rounded-lg dark:border-gray-600 hover:bg-indigo-50 dark:hover:bg-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-200"
                    onClick={() => navigate(`${course._id}`)}
                  >
                    <Edit2Icon size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CourseTable;
