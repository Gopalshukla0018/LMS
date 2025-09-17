import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Selector } from "@/components/Selectors/Selector";
import { CourseLevel } from "@/components/Selectors/CourseLevel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditCourseMutation } from "@/features/api/courseApi";
import { toast } from "sonner";

const CourseTab = () => {
  const isPublished = true;

  const [input, setInput] = useState({
    courseTitle: "",
    courseSubTitle: "",
    Coursecategory: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();

  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();
  const params = useParams();
  const courseID = params.courseId;

  const handleChange = (e) => {
    console.log("title", input);
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleChangeSubtitle = (e) => {
    console.log("subtitle", input);
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const getSelectedCategory = (value) => {
    console.log("Selected category:", value);
    setInput({ ...input, Coursecategory: value });
  };

  const getcourseLevel = (value) => {
    console.log("Course Level:", value);
    setInput({ ...input, courseLevel: value });
  };

  // update handler
  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("courseSubTitle", input.courseSubTitle);
    formData.append("Coursecategory", input.Coursecategory);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);
    await editCourse({ formData, courseId: courseID });
    navigate("/admin/courses")
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course Updated Successfully");
    }
    if (error) {
      toast.error(error.data.message || "Failed to update course");
    }
  }, [isSuccess, error]);

  // get file
  const getThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreviewThumbnail(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle> Basic Course Information</CardTitle>
          <CardDescription>
            {" "}
            Make changes to your courses here. click when your're done{" "}
          </CardDescription>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            {isPublished ? "Unpublished" : "Published"}
          </Button>
          <Button>Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-5 space-y-4">
          <div>
            <Label>Course Title</Label>
            <Input
              type="text"
              placeholder="Ex. FullStack Developer Complete Course"
              name="courseTitle"
              className="mt-1"
              value={input.courseTitle}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Course SubTitle</Label>
            <Input
              type="text"
              placeholder="Become FullStack Developer From Zero To Hero"
              name="courseSubTitle"
              className="mt-1"
              value={input.courseSubTitle}
              onChange={handleChangeSubtitle}
            />
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div className="flex items-center gap-5">
            <div>
              <Label className="mb-3">Category</Label>
              <Selector getSelectedCategory={getSelectedCategory} />
            </div>
            <div>
              <Label className="mb-3">Course Level</Label>
              <CourseLevel getcourseLevel={getcourseLevel} />
            </div>
            <div>
              <Label className="mb-3">Price in INR</Label>
              <input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={handleChange}
                placeholder="Ex. 499"
                className="px-4 py-2 border rounded-md outline-none "
              />
            </div>
          </div>
          <div>
            <Label className="mb-3 ">Course Tumbnail</Label>
            <input
              className="px-4 py-2 border rounded-md outline-none w-fit "
              accept="image/*"
              type="file"
              onChange={getThumbnail}
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                alt="Course Thumbnail"
                className="object-cover h-48 mt-3 rounded-md w-96"
              />
            )}
          </div>
          <div>
            <Button
              variant="outline"
              onClick={() => navigate("/admin/courses")}
            >
              Cencle
            </Button>
            <Button
              disabled={isLoading}
              className="ml-3"
              onClick={updateCourseHandler}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save "
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
