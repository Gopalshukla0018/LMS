import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Lecture = ({ lecture, index, courseId }) => {
  const navigate = useNavigate();
  const goToEditLecture = () => {
    navigate(`${lecture._id}`);
  };

  return (
    <div className="flex items-center justify-between p-3 mt-2 transition-colors rounded-md bg-secondary text-secondary-foreground dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700">
      <h1 className="font-bold text-gray-800 dark:text-gray-100">
        Lecture-{index + 1}: {lecture.lectureTitle}
      </h1>
      <Edit
        onClick={goToEditLecture}
        size={20}
        className="text-gray-600 transition-colors cursor-pointer dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
      />
    </div>
  );
};

export default Lecture;