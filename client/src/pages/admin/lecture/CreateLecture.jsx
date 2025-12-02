// import { useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import {
//   useCreateLectureMutation,
//   useGetCourseLecturesQuery,
// } from "@/features/api/courseApi";
// import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";
// import Lecture from "./Lecture";

// const CreateLecture = () => {
//   const [lectureTitle, setLectureTitle] = useState("");



//   const navigate = useNavigate();
//   const params = useParams();
//   const courseId = params.courseId;
//   console.log("course id for debug is ", courseId);

//   // fetch from api
//   const [createLecture, { data, isLoading, isSuccess, error }] =
//     useCreateLectureMutation();
//   const {
//     data: lectureData,
//     isLoading: lectureLoading,
//     isError: lectureError,
//   } = useGetCourseLecturesQuery(courseId);
//   // console.log("for debug data is :-", lectureData);

//   const createLectureHandler = async () => {
//     const courseId = params.courseId;

//     await createLecture({ lectureTitle, courseId });
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success(data?.message || "Lecture Created");

//       // navigate(`/admin/courses/${courseId}/lecture`);
//     }

//     if (error) {
//       toast.error(error?.data?.message || "Failed to create lecture");
//     }
//   }, [isSuccess, error]);
//   return (
//     <div className="w-full min-h-screen px-6 py-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
//       {/* Full Page Header */}
//       <div className="mb-10 text-center">
//         <h1 className="mb-2 text-4xl font-extrabold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
//           Add New Lecture
//         </h1>
//         <p className="text-base text-gray-600 dark:text-gray-400">
//           Fill in the course details and save to continue
//         </p>
//       </div>

//       {/* Full Width Form */}
//       <div className="grid w-full gap-8 p-8 shadow-xl bg-white/80 backdrop-blur-lg rounded-2xl dark:bg-gray-900/70">
//         {/* Title Input */}
//         <div className="relative">
//           <input
//             type="text"
//             value={lectureTitle}
//             onChange={(e) => setLectureTitle(e.target.value)}
//             placeholder=" "
//             className="w-full px-4 pt-5 pb-2 text-base bg-transparent border border-gray-300 peer rounded-xl dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
//           />
//           <Label className="absolute left-3 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-blue-600 dark:peer-focus:text-blue-400">
//             Course Title
//           </Label>
//         </div>
        
        
    
//         {/* Actions */}
//         <div className="flex justify-end gap-4">
//           <Button
//             variant="outline"
//             onClick={() => navigate(`/admin/courses/${courseId}`)}
//             className="px-6 py-3 text-base font-medium transition-all bg-white border border-gray-200 shadow-md rounded-xl hover:shadow-lg dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
//           >
//             Back to course
//           </Button>
//           <Button
//             disabled={isLoading}
//             onClick={createLectureHandler}
//             className="px-6 py-3 text-base font-semibold text-white transition-all shadow-lg rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//           >
//             {isLoading ? (
//               <>
//                 <Loader2 className="w-5 h-5 animate-spin" />
//                 Please wait
//               </>
//             ) : (
//               "Create lecture"
//             )}
//           </Button>
//         </div>

//         <div className="mt-10">
//           {lectureLoading ? (
//             <p>Loading lectures...</p>
//           ) : lectureError ? (
//             <p>Failed to load lectures.</p>
//           ) : !lectureData?.lectures || lectureData?.lectures.length === 0 ? (
//             <p>No lectures available.</p>
//           ) : (
//             lectureData.lectures.map((lecture, index) => (
//               <div className="mt-4" key={lecture._id}>
//                 <Lecture lecture={lecture} index={index} courseId={courseId} />
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateLecture;


import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetCourseLecturesQuery,
} from "@/features/api/courseApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;

  // fetch from api
  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();
    
  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch,
  } = useGetCourseLecturesQuery(courseId);

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Lecture Created");
      setLectureTitle(""); // Clear input after success
      refetch(); // Refresh list manually if needed
    }

    if (error) {
      toast.error(error?.data?.message || "Failed to create lecture");
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 w-full min-h-screen px-4 py-8 md:px-8 md:py-12 bg-gray-50 dark:bg-background">
      {/* Full Page Header */}
      <div className="mb-10 text-center">
        <h1 className="mb-2 text-3xl font-extrabold text-transparent md:text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
          Add New Lecture
        </h1>
        <p className="text-sm text-gray-600 md:text-base dark:text-gray-400">
          Fill in the lecture details to build your course curriculum.
        </p>
      </div>

      {/* Full Width Form Container */}
      <div className="w-full max-w-4xl p-6 mx-auto shadow-xl bg-white/80 backdrop-blur-lg rounded-2xl dark:bg-card dark:border dark:border-gray-800">
        {/* Title Input */}
        <div className="relative mb-6">
          <input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder=" "
            className="w-full px-4 pt-5 pb-2 text-base bg-transparent border border-gray-300 peer rounded-xl dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 placeholder-shown:border-gray-300"
          />
          <Label className="absolute left-4 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600 dark:peer-focus:text-blue-400 pointer-events-none">
            Lecture Title
          </Label>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/courses/${courseId}`)}
            className="px-6 py-2 text-sm font-medium transition-all bg-white border border-gray-200 shadow-sm rounded-xl hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            Back to Course
          </Button>
          <Button
            disabled={isLoading || !lectureTitle.trim()}
            onClick={createLectureHandler}
            className="px-6 py-2 text-sm font-semibold text-white transition-all shadow-md rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Lecture"
            )}
          </Button>
        </div>

        {/* Lectures List */}
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
            Course Content
          </h2>
          
          {lectureLoading ? (
            <div className="flex flex-col gap-2">
               {/* Simple Skeleton */}
               {[1,2,3].map(i => <div key={i} className="w-full h-16 bg-gray-200 rounded-xl animate-pulse dark:bg-gray-800"></div>)}
            </div>
          ) : lectureError ? (
             <div className="p-4 text-center text-red-500 bg-red-50 rounded-xl dark:bg-red-900/20">
              Failed to load lectures.
            </div>
          ) : !lectureData?.lectures || lectureData?.lectures.length === 0 ? (
            <div className="p-8 text-center border-2 border-gray-200 border-dashed rounded-xl dark:border-gray-700">
               <p className="text-gray-500 dark:text-gray-400">No lectures created yet. Add your first lecture above.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {lectureData.lectures.map((lecture, index) => (
                <Lecture
                  key={lecture._id}
                  lecture={lecture}
                  index={index}
                  courseId={courseId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;