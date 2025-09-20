import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";



const EditLecture = () => {
  const {courseId}= useParams();
  return (
    <div className="flex items-center justify-between mt-6">
      <div className="flex items-center gap-2">
        <Link to={`/admin/courses/${courseId}/lecture`}>
          <Button size='icon' variant='outline' className="rounded-full"  >
            <ArrowLeft size={16}/>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EditLecture;
