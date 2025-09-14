import { Button } from "@/components/ui/button";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useGetCreatorCoursesQuery } from "@/features/api/courseApi";
import { Edit2Icon, PlusCircle } from "lucide-react";

const CourseTable = () => {
  const { data, isLoading } = useGetCreatorCoursesQuery();
  const navigate = useNavigate();

  if (isLoading) return <h1 className="text-lg text-center">Loading..</h1>;
  console.log("data is :", data);

  return (
    <div className="max-w-5xl px-4 mx-auto mt-12">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-800">
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
      <div className="overflow-hidden border border-gray-200 shadow-sm rounded-xl">
        <Table>
          <TableCaption className="text-gray-500">
            A list of your created courses.
          </TableCaption>

          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[120px] text-gray-700 font-medium">
                Price
              </TableHead>
              <TableHead className="font-medium text-gray-700">
                Status
              </TableHead>
              <TableHead className="font-medium text-gray-700">Title</TableHead>
              <TableHead className="font-medium text-right text-gray-700">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.courses?.map((course) => (
              <TableRow
                key={course.id}
                className="transition-colors duration-200 hover:bg-gray-50"
              >
                <TableCell className="font-medium text-gray-800">
                  {course?.coursePrice || "NA"}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      course?.isPublished
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {course?.isPublished ? "Published" : "Draft"}
                  </span>
                </TableCell>
                <TableCell className="text-gray-700">
                  {course?.courseTitle}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 rounded-lg hover:bg-indigo-50 hover:text-indigo-600"
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
