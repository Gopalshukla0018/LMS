import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import LectureTab from "./LectureTab";

const EditLecture = () => {
  const { courseId } = useParams();

  return (
    <div className="px-6 mt-10">
      <div className="flex items-center gap-3 mb-6">
        <Link to={`/admin/courses/${courseId}/lecture`}>
          <Button size="icon" variant="outline" className="rounded-full">
            <ArrowLeft size={18} />
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold">Update Your Lecture</h1>
      </div>

      <LectureTab />
    </div>
  );
};

export default EditLecture;
