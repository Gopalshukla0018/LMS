// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import React from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,

//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Loader2 } from "lucide-react";
// import Course from "./Courses/Course";
// import EditProfileSkeleton from "./EditProfileSkeleton";

// const EditProfile = () => {
//   const isLoading = false;
//   const enrollCourses = [1, 2];
  
  
//     if (isLoading) return <EditProfileSkeleton />;
//   return (
//     <div className="max-w-4xl px-4 mx-auto my-24">
//       <h1 className="text-2xl font-bold text-center md:text-left">PROFILE</h1>
//       <div className="flex flex-col items-center gap-8 my-5 md:flex-row md:items-start">
//         <div className="flex flex-col items-center">
//           <Avatar className="w-24 h-24 mb-4 md:h-32 md:w-32">
//             <AvatarImage
//               src="https://github.com/shadcn.png"
//               alt="Instructor avatar"
//               className="object-cover w-full h-full rounded-full"
//             />
//             <AvatarFallback>GS</AvatarFallback>
//           </Avatar>
//         </div>
//         <div>
//           <div className="mb-2">
//             <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
//               Name:
//               <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
//                 Gopal Shukla
//               </span>
//             </h1>
//           </div>
//           <div className="mb-2">
//             <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
//               Email:
//               <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
//                 gopalshukla0018@gmail.com
//               </span>
//             </h1>
//           </div>
//           <div className="mb-2">
//             <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
//               Role:
//               <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
//                 Instructure
//               </span>
//             </h1>
//           </div>

//           <Dialog>
//             <DialogTrigger asChild>
//               <Button size="sm" className="mt-2">
//                 Edit Profile
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Edit Profile</DialogTitle>
//                 <DialogDescription>
//                   Make changes to your profile here. Click save when you&apos;re
//                   done.
//                 </DialogDescription>
//               </DialogHeader>
//               <div className="grid gap-4 py-4">
//                 <div className="grid grid-cols-4 gap-4 nitems-center">
//                   <Label>Name</Label>
//                   <Input
//                     type="text"
//                     placeholder="Name"
//                     className="cold-span-3"
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 gap-4 nitems-center">
//                   <Label>Profile Photo</Label>
//                   <Input type="file" accept="image/*" className="cold-span-3" />
//                 </div>
//               </div>
//               <DialogFooter>
//                 <Button disable={isLoading}>
//                   {isLoading ? (
//                     <>
//                       <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please
//                       wait
//                     </>
//                   ) : (
//                     "Save Changes"
//                   )}
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//         {}
//       </div>
//       <div>
//         <h1>Courses you're enrolled in</h1>
//         <div className="grid grid-cols-1 gap-4 my-5 sm:grid-cols-2 md:grid-cols-3 ">
//           {enrollCourses.length === 0 ? (
//             <h1>You haven't enrolled yet </h1>
//           ) : (
//             enrollCourses.map((course, index) => <Course />)
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Course from "./Courses/Course";
import EditProfileSkeleton from "./EditProfileSkeleton";
import { motion } from "framer-motion";

const EditProfile = () => {
  const isLoading = false;
  const enrollCourses = [1, 2];

  if (isLoading) return <EditProfileSkeleton />;

  return (
    <motion.div
      className="max-w-4xl px-4 mx-auto my-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold text-center md:text-left">PROFILE</h1>
      <div className="flex flex-col items-center gap-8 my-5 md:flex-row md:items-start">
        <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center">
          <Avatar className="w-24 h-24 mb-4 transition-all duration-300 shadow-lg md:h-32 md:w-32">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="Instructor avatar"
              className="object-cover w-full h-full rounded-full"
            />
            <AvatarFallback>GS</AvatarFallback>
          </Avatar>
        </motion.div>
        <div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Name:
              <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
                Gopal Shukla
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Email:
              <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
                gopalshukla0018@gmail.com
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Role:
              <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
                Instructor
              </span>
            </h1>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-2 text-white transition-all duration-200 bg-indigo-600 shadow-md hover:bg-indigo-700">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-xl">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 gap-4 nitems-center">
                  <Label>Name</Label>
                  <Input type="text" placeholder="Name" className="cold-span-3" />
                </div>
                <div className="grid grid-cols-4 gap-4 nitems-center">
                  <Label>Profile Photo</Label>
                  <Input type="file" accept="image/*" className="cold-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button disable={isLoading} className="text-white transition-all duration-200 bg-indigo-600 shadow-md hover:bg-indigo-700">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div>
        <h1>Courses you're enrolled in</h1>
        <div className="grid grid-cols-1 gap-4 my-5 sm:grid-cols-2 md:grid-cols-3">
          {enrollCourses.length === 0 ? (
            <h1>You haven't enrolled yet</h1>
          ) : (
            enrollCourses.map((course, index) => (
              <motion.div key={index} whileHover={{ scale: 1.03 }} className="overflow-hidden shadow-md rounded-xl">
                <Course />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EditProfile;

