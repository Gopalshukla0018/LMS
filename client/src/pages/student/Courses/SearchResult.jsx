import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";  

const SearchResult = ({ course }) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 py-4 border-b border-gray-300 md:flex-row md:items-center">
      <Link
        to={`/course-detail/${course._id}`}
        className="flex flex-col w-full gap-4 md:flex-row md:w-auto"
      >
        <img
          src={course.courseThumbnail || "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210523192133/HTML-Course-For-Beginners-By-GeeksforGeeks.png"}
          alt="course-thumbnail"
          className="object-cover w-full h-32 rounded md:w-56"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-bold md:text-xl">{course.courseTitle}</h1>
          <p>{course.courseSubTitle || "No subtitle available"}</p>
          <p className="text-sm text-gray-700">
            Instructor: <span className="font-bold">{course.creator?.name || "Unknown"}</span>
          </p>
          <Badge className="mt-2 w-fit md:mt-0">{course.courseLevel}</Badge>
        </div>
      </Link>
      <div className="w-full mt-4 md:mt-0 md:text-right md:w-auto">
        <h1 className="text-lg font-bold md:text-xl">₹{course.coursePrice}</h1>
      </div>
    </div>
  );
};

export default SearchResult;