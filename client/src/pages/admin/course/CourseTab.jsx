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
import { Loader2, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useToggelPublishUnpublishMutation,
} from "@/features/api/courseApi";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    courseSubTitle: "",
    Coursecategory: "",
    courseLevel: "",
    coursePrice: "",
    courseDescription: "",
    courseThumbnail: "",
  });

  // RTK Query Hooks ----

  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

  const params = useParams();
  const courseId = params.courseId;
  console.log("course id is:-", courseId);
  const { data: courseByIdData, isLoading: courseByIdLoading } =
    useGetCourseByIdQuery(courseId);

  const [toggelPublishUnpublish] = useToggelPublishUnpublishMutation();
  console.log("toggle data is", toggelPublishUnpublish.data);

  const course = courseByIdData?.course; // <-- define course here

  useEffect(() => {
    if (course) {
      setInput({
        courseTitle: course.courseTitle || "",
        courseSubTitle: course.courseSubTitle || "",
        courseDescription: course.courseDescription,
        Coursecategory: course.category || "",
        courseLevel: course.courseLevel || "",
        coursePrice: course.coursePrice || "",
        courseThumbnail: course.courseThumbnail || "",
      });
    }
  }, [course]);

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();

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
    await editCourse({ formData, courseId: courseId });
  };

  // togggel handler--
  const publishUnpublishHandler = async (action) => {
    try {
      const response = await toggelPublishUnpublish({
        courseId,
        query: action,
      });
      if (response.data) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("failled to publish or unpublish course try again  ");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course Updated Successfully");
      // navigate("/admin/courses");
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to update course");
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

  // ADD THIS LOADING CHECK
  if (courseByIdLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-16 h-16 animate-spin" />
      </div>
    );
  }

  // Optional but recommended: Check if course exists after loading
  if (!course) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Course not found.</p>
      </div>
    );
  }

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

        <div className="flex items-center gap-4">
          {/* Publish/Unpublish Switch with label */}
          <div className="flex items-center gap-2">
            <Switch
              checked={!!course.isPublished && course.lectures.length > 0}
              disabled={course.lectures.length === 0}
              onCheckedChange={(checked) =>
                publishUnpublishHandler(checked ? "true" : "false")
              }
              className={`data-[state=unchecked]:bg-red-500 data-[state=checked]:bg-green-500`}
            />
            <span className="text-sm font-medium">
              {course.isPublished ? "Published" : "Unpublished"}
            </span>
          </div>

          {/* Remove Icon Button with circle background */}
          <button
            // onClick={removeCourseHandler}
            className="flex items-center justify-center w-10 h-10 text-red-600 bg-red-100 rounded-full hover:bg-red-200"
          >
            <Trash2 className="w-5 h-5" />
          </button>
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
            <Label className="mb-3 ">Course Thumbnail</Label>
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
              Cancel
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
