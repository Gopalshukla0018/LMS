import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Badge } from "@/components/ui/badge";

const Course = ({ course }) => {
  return (
    <Card className="relative p-0 overflow-hidden transition-all duration-300 transform border border-gray-200 shadow-md group rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md hover:shadow-xl hover:-translate-y-1">
      {/* Image */}
      <div className="relative">
        <img
          src={course?.creator?.photoUrl || "https://img-c.udemycdn.com/course/750x422/3873464_403c_3.jpg"}
          alt="Next.js course thumbnail"
          className="object-cover w-full h-40 transition-transform duration-300 rounded-t-xl group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent rounded-t-xl"></div>
        {/* Floating Badge */}
        <Badge className="absolute top-3 right-3 bg-blue-600 text-white px-2.5 py-0.5 text-xs rounded-full shadow-md">
          {course.category}
        </Badge>
      </div>

      {/* Content */}
      <CardContent className="px-5 py-4">
        {/* Title */}
        <h1 className="mb-3 text-base font-bold leading-snug text-gray-900 transition-colors duration-300 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
         {course?.courseTitle}
        </h1>

        {/* Creator + Price */}
        <div className="flex items-center justify-between">
          {/* Avatar + Name */}
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8 border border-gray-200 dark:border-gray-700">
              <AvatarImage
                src={course?.creator?.photoUrl || "https://img-c.udemycdn.com/course/750x422/3873464_403c_3.jpg"}
                alt="Instructor avatar"
              />
              <AvatarFallback>GS</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Gopal Shukla
            </span>
          </div>

          {/* Price */}
          <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
            ₹499
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Course;
