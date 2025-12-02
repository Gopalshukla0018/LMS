import { Edit, Edit2, Edit3 } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
const Lecture = ({ lecture, index, courseId }) => {
  const navigate = useNavigate();
  const goToEditLecture = () => {
    navigate(`${lecture._id}`);
  };

  return (
    <div className="flex items-center justify-between p-3 mt-2 rounded-md bg-secondary text-secondary-foreground dark:text-white">
      <h1 className="font-bold text-gray-800 dark:text-grray-100 ">
        Lecture-{index + 1} {lecture.lectureTitle}
      </h1>
      <Edit
        onClick={goToEditLecture}
        size={20}
        className="text-gray-600 cursor-pointer dark:text-gray-300 hover:text-blur-600 dark:hover:text-blur-400"
      />
    </div>
  );
};

export default Lecture;
