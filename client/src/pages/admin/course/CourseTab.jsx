// import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
// import { Button } from "@/components/ui/button";
// import { Selector } from "@/components/Selectors/Selector";
// import { CourseLevel } from "@/components/Selectors/CourseLevel";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import React, { useState, useEffect } from "react";
// import { Loader2, Trash2 } from "lucide-react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   useEditCourseMutation,
//   useGetCourseByIdQuery,
//   useToggelPublishUnpublishMutation,
//   useDeleteCourseMutation,
// } from "@/features/api/courseApi";
// import { toast } from "sonner";
// import { Switch } from "@/components/ui/switch";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogFooter,
//   DialogTitle,
//   DialogDescription,
//   DialogTrigger,
//   DialogClose,
// } from "@/components/ui/dialog";

// const CourseTab = () => {
//   const [input, setInput] = useState({
//     courseTitle: "",
//     courseSubTitle: "",
//     Coursecategory: "",
//     courseLevel: "",
//     coursePrice: "",
//     courseDescription: "",
//     courseThumbnail: "",
//   });

//   // RTK Query Hooks ----
//   const [editCourse, { data, isLoading, isSuccess, error }] =
//     useEditCourseMutation();
//   const params = useParams();
//   const courseId = params.courseId;
//   const { data: courseByIdData, isLoading: courseByIdLoading } =
//     useGetCourseByIdQuery(courseId);
//   const [toggelPublishUnpublish] = useToggelPublishUnpublishMutation();
//   const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

//   const course = courseByIdData?.course;
//   useEffect(() => {
//     console.log("Current input state:", input);
//   }, [input]);

//   useEffect(() => {
//     if (course) {
//       setInput({
//         courseTitle: course.courseTitle || "",
//         courseSubTitle: course.courseSubTitle || "",
//         courseDescription: course.courseDescription,
//         Coursecategory: course.category || "",
//         courseLevel: course.courseLevel || "",
//         coursePrice: course.coursePrice || "",
//         courseThumbnail: course.courseThumbnail || "",
//       });
//     }
//   }, [course]);

//   const [previewThumbnail, setPreviewThumbnail] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const handleChangeSubtitle = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const getSelectedCategory = (value) => {
//     setInput({ ...input, Coursecategory: value });
//   };

//   const getcourseLevel = (value) => {
//     setInput({ ...input, courseLevel: value });
//   };

//   // update handler
//   const updateCourseHandler = async () => {
//     const formData = new FormData();
//     formData.append("courseTitle", input.courseTitle);
//     formData.append("courseSubTitle", input.courseSubTitle);
//     formData.append("courseDescription", input.courseDescription);
//     formData.append("Coursecategory", input.Coursecategory);
//     formData.append("courseLevel", input.courseLevel);
//     formData.append("coursePrice", input.coursePrice);
//     formData.append("courseThumbnail", input.courseThumbnail);
//     await editCourse({ formData, courseId: courseId });
//   };

//   // togggel handler--
//   const publishUnpublishHandler = async (action) => {
//     try {
//       const response = await toggelPublishUnpublish({
//         courseId,
//         query: action,
//       });
//       if (response.data) {
//         toast.success(response.data.message);
//       }
//     } catch (error) {
//       toast.error("failled to publish or unpublish course try again  ");
//     }
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success(data.message || "Course Updated Successfully");
//     }
//     if (error) {
//       toast.error(error?.data?.message || "Failed to update course");
//     }
//   }, [isSuccess, error]);

//   // get file
//   const getThumbnail = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setInput({ ...input, courseThumbnail: file });
//       const fileReader = new FileReader();
//       fileReader.onloadend = () => {
//         setPreviewThumbnail(fileReader.result);
//       };
//       fileReader.readAsDataURL(file);
//     }
//   };

//   if (courseByIdLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Loader2 className="w-16 h-16 animate-spin" />
//       </div>
//     );
//   }

//   if (!course) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p>Course not found.</p>
//       </div>
//     );
//   }

//   return (
//     <Card>
//       {/* --- MODIFIED FOR RESPONSIVENESS --- */}
//       <CardHeader className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
//         <div>
//           <CardTitle> Basic Course Information</CardTitle>
//           <CardDescription>
//             {" "}
//             Make changes to your courses here. click when you're done{" "}
//           </CardDescription>
//         </div>

//         <div className="flex items-center self-end gap-4 md:self-auto">
//           {/* Publish/Unpublish Switch with label */}
//           <div className="flex items-center gap-2">
//             <Switch
//               checked={!!course.isPublished && course.lectures.length > 0}
//               disabled={course.lectures.length === 0}
//               onCheckedChange={(checked) =>
//                 publishUnpublishHandler(checked ? "true" : "false")
//               }
//               className={`data-[state=unchecked]:bg-red-500 data-[state=checked]:bg-green-500`}
//             />
//             <span className="text-sm font-medium">
//               {course.isPublished ? "Published" : "Unpublished"}
//             </span>
//           </div>

//           {/* Remove Icon Button with circle background */}
//           <>
//             <button
//               onClick={() => setOpenDeleteDialog(true)}
//               disabled={isDeleting}
//               className="flex items-center justify-center w-10 h-10 text-red-600 bg-red-100 rounded-full hover:bg-red-200 disabled:opacity-50"
//             >
//               <Trash2 className="w-5 h-5" />
//             </button>

//             <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
//               <DialogContent>
//                 <DialogHeader>
//                   <DialogTitle>Delete Course</DialogTitle>
//                   <DialogDescription>
//                     Are you sure you want to delete this course? This action
//                     will remove all lectures and cannot be undone.
//                   </DialogDescription>
//                 </DialogHeader>
//                 <DialogFooter>
//                   <DialogClose asChild>
//                     <Button className="px-4 py-2 text-black bg-white border rounded">
//                       Cancel
//                     </Button>
//                   </DialogClose>
//                   <button
//                     onClick={async () => {
//                       try {
//                         const res = await deleteCourse(courseId).unwrap();
//                         toast.success(res.message || "Course deleted");
//                         setOpenDeleteDialog(false);
//                         navigate("/admin/courses");
//                       } catch (err) {
//                         toast.error(
//                           err?.data?.message || "Failed to delete course"
//                         );
//                       }
//                     }}
//                     disabled={isDeleting}
//                     className="px-4 py-2 ml-2 text-white bg-red-600 rounded disabled:opacity-50"
//                   >
//                     {isDeleting ? "Deleting..." : "Delete"}
//                   </button>
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog>
//           </>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="mt-5 space-y-4">
//           <div>
//             <Label>Course Title</Label>
//             <Input
//               type="text"
//               placeholder="Ex. FullStack Developer Complete Course"
//               name="courseTitle"
//               className="mt-1"
//               value={input.courseTitle}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <Label>Course SubTitle</Label>
//             <Input
//               type="text"
//               placeholder="Become FullStack Developer From Zero To Hero"
//               name="courseSubTitle"
//               className="mt-1"
//               value={input.courseSubTitle}
//               onChange={handleChangeSubtitle}
//             />
//           </div>
//           <div>
//             <Label>Description</Label>
//             <RichTextEditor
//               initialValue={course?.courseDescription} // Add this prop
//               input={input}
//               setInput={setInput}
//             />
//           </div>
//           {/* --- MODIFIED FOR RESPONSIVENESS --- */}
//           <div className="flex flex-col gap-5 md:flex-row md:items-center">
//             <div className="flex-1">
//               <Label className="mb-3">Category</Label>
//               <Selector getSelectedCategory={getSelectedCategory} />
//             </div>
//             <div className="flex-1">
//               <Label className="mb-3">Course Level</Label>
//               <CourseLevel getcourseLevel={getcourseLevel} />
//             </div>
//             <div className="flex-1">
//               <Label className="mb-3">Price in INR</Label>
//               <input
//                 type="number"
//                 name="coursePrice"
//                 value={input.coursePrice}
//                 onChange={handleChange}
//                 placeholder="Ex. 499"
//                 className="w-full px-4 py-2 border rounded-md outline-none"
//               />
//             </div>
//           </div>
//           <div>
//             <Label className="mb-3 ">Course Thumbnail</Label>
//             <input
//               className="w-full px-4 py-2 border rounded-md outline-none md:w-fit"
//               accept="image/*"
//               type="file"
//               onChange={getThumbnail}
//             />
//             {previewThumbnail && (
//               <img
//                 src={previewThumbnail}
//                 alt="Course Thumbnail"
//                 // --- MODIFIED FOR RESPONSIVENESS ---
//                 className="object-cover w-full h-48 mt-3 rounded-md md:w-96"
//               />
//             )}
//           </div>
//           <div>
//             <Button
//               variant="outline"
//               onClick={() => navigate("/admin/courses")}
//             >
//               Cancel
//             </Button>
//             <Button
//               disabled={isLoading}
//               className="ml-3"
//               onClick={updateCourseHandler}
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                   Please wait
//                 </>
//               ) : (
//                 "Save "
//               )}
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default CourseTab;

import RichTextEditor from "../../../components/RichTextEditor/RichTextEditor.jsx";
import { Button } from "../../../components/ui/button.jsx";
import { Selector } from "../../../components/Selectors/Selector.jsx";
import { CourseLevel } from "../../../components/Selectors/CourseLevel.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card.jsx";
import { Input } from "../../../components/ui/input.jsx";
import { Label } from "../../../components/ui/label.jsx";
import React, { useState, useEffect } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useToggelPublishUnpublishMutation,
  useDeleteCourseMutation,
} from "../../../features/api/courseApi.js";
import { toast } from "sonner";
import { Switch } from "../../../components/ui/switch.jsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "../../../components/ui/dialog.jsx";

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
  const { data: courseByIdData, isLoading: courseByIdLoading } =
    useGetCourseByIdQuery(courseId);
  const [toggelPublishUnpublish] = useToggelPublishUnpublishMutation();
  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const course = courseByIdData?.course;
  useEffect(() => {
    console.log("Current input state:", input);
  }, [input]);

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
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleChangeSubtitle = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const getSelectedCategory = (value) => {
    setInput({ ...input, Coursecategory: value });
  };

  const getcourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  // update handler
  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("courseSubTitle", input.courseSubTitle);
    formData.append("courseDescription", input.courseDescription);
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

  if (courseByIdLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-16 h-16 animate-spin" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Course not found.</p>
      </div>
    );
  }

  return (
    <Card className="border-none shadow-none md:border md:shadow-sm">
      {/* Header Responsive Fix: Stack vertically on mobile, row on desktop */}
      <CardHeader className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <CardTitle className="text-xl sm:text-2xl">
            Basic Course Information
          </CardTitle>
          <CardDescription>
            Make changes to your courses here. click save when you're done.
          </CardDescription>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Publish/Unpublish Switch with label */}
          <div className="flex items-center gap-3">
            <Switch
              checked={!!course.isPublished && course.lectures.length > 0}
              disabled={course.lectures.length === 0}
              onCheckedChange={(checked) =>
                publishUnpublishHandler(checked ? "true" : "false")
              }
              className={`data-[state=unchecked]:bg-gray-400 data-[state=checked]:bg-green-500`}
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {course.isPublished ? "Published" : "Unpublished"}
            </span>
          </div>

          {/* Remove Icon Button with circle background */}
          <div>
            <button
              onClick={() => setOpenDeleteDialog(true)}
              disabled={isDeleting}
              className="flex items-center justify-center w-10 h-10 text-red-600 transition-colors bg-red-100 rounded-full hover:bg-red-200 disabled:opacity-50 dark:bg-red-900/20 dark:hover:bg-red-900/40"
            >
              <Trash2 className="w-5 h-5" />
            </button>

            <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Course</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this course? This action
                    will remove all lectures and cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:gap-0">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    onClick={async () => {
                      try {
                        const res = await deleteCourse(courseId).unwrap();
                        toast.success(res.message || "Course deleted");
                        setOpenDeleteDialog(false);
                        navigate("/admin/courses");
                      } catch (err) {
                        toast.error(
                          err?.data?.message || "Failed to delete course"
                        );
                      }
                    }}
                    disabled={isDeleting}
                    variant="destructive"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {/* Grid Layout for Title/Subtitle */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Course Title</Label>
              <Input
                type="text"
                placeholder="Ex. FullStack Developer Complete Course"
                name="courseTitle"
                value={input.courseTitle}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label>Course SubTitle</Label>
              <Input
                type="text"
                placeholder="Become FullStack Developer From Zero To Hero"
                name="courseSubTitle"
                value={input.courseSubTitle}
                onChange={handleChangeSubtitle}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <RichTextEditor
              initialValue={course?.courseDescription}
              input={input}
              setInput={setInput}
            />
          </div>

          {/* Grid Layout for Dropdowns & Price - 1 col mobile, 3 col desktop */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2 [&>button]:w-full">
              {/* [&>button]:w-full forces the SelectTrigger inside Selector to be full width */}
              <Label>Category</Label>
              <div className="w-full">
                <Selector getSelectedCategory={getSelectedCategory} />
              </div>
            </div>

            <div className="space-y-2 [&>button]:w-full">
              <Label>Course Level</Label>
              <div className="w-full">
                <CourseLevel getcourseLevel={getcourseLevel} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Price in INR</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={handleChange}
                placeholder="Ex. 499"
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Course Thumbnail</Label>
            <div className="flex flex-col gap-4">
              <Input
                accept="image/*"
                type="file"
                onChange={getThumbnail}
                className="w-full sm:w-auto"
              />
              {previewThumbnail && (
                <div className="relative w-full overflow-hidden rounded-md md:w-96 aspect-video bg-muted">
                  <img
                    src={previewThumbnail}
                    alt="Course Thumbnail"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/courses")}
            >
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={updateCourseHandler}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
