import EnrollCourseBtn from "@/components/EnrollCourseBtn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeInfo, Lock, PlayCircleIcon } from "lucide-react";
import React from "react";

const CourseDetail = () => {
  const purchasedCourse = false;
  return (
    <div className="mt-16 space-y-10">
      {/* Header */}
      <div className="bg-[#2D2F31] text-white">
        <div className="flex flex-col gap-2 px-4 py-8 mx-auto max-w-7xl md:px-8">
          <h1 className="text-2xl font-bold md:text-3xl">
            Master React from Scratch 🚀
          </h1>
          <p className="text-base md:text-lg">
            Build real-world applications with React, Hooks, and modern state
            management.
          </p>
          <p className="text-base md:text-lg">
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">
              Gopal Shukla
            </span>
          </p>
          <div className="flex items-center gap-2 mt-1 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated 2025-08-01</p>
          </div>
          <p className="mt-1 text-sm">Students enrolled: 1280+</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-10 px-4 mx-auto my-5 max-w-7xl md:px-8 lg:flex-row">
        {/* Left Section */}
        <div className="w-full space-y-6 lg:w-2/3">
          <h2 className="text-xl font-bold md:text-2xl">Description</h2>
          <p className="text-sm leading-relaxed">
            This course is designed for beginners as well as intermediate
            developers. You will start with the basics of React and gradually
            move on to advanced topics like context, custom hooks, Redux, and
            project deployment. By the end, you will have multiple projects
            added to your portfolio.
          </p>

          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>4 lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3, 4].map((_, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-sm cursor-pointer hover:text-primary"
                >
                  <span>
                    <Lock size={14} />
                  </span>
                  <p>Lecture {idx + 1} Title</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Section */}
        <div className="w-full space-y-5 lg:w-1/3">
          <Card>
            <CardContent className="flex flex-col p-4">
              <div className="flex items-center justify-center w-full mb-4 text-white bg-black aspect-video">
                ReactPlayer Video Placeholder
              </div>
              <h3 className="font-semibold">Lecture Title</h3>
              <Separator className="my-2" />
              <h3 className="text-lg font-semibold md:text-xl">
                Course Price: ₹999
              </h3>
            </CardContent>
            <CardFooter className="flex justify-center">
              {purchasedCourse ? (
                <Button>Continue Course</Button>
              ) : (
                <EnrollCourseBtn />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;

// for version -2-------------

// import EnrollCourseBtn from "@/components/EnrollCourseBtn";
// import { Button } from "@/components/ui/button";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Badge } from "@/components/ui/badge";
// import { Card } from "@/components/ui/card";
// import {
//   BookText,
//   CheckCircle2,
//   Clock,
//   Globe,
//   PlayCircleIcon,
//   Star,
//   Users,
//   Video,
//   Lock,
// } from "lucide-react";
// import { Separator } from "@/components/ui/separator";
// import React from "react";

// const CourseDetail = () => {
//   const purchasedCourse = false;

//   return (
//     <div className="text-gray-800 bg-gray-50 dark:bg-black dark:text-gray-200">
//       {/* ===== Header Section ===== */}
//       <header className="relative overflow-hidden text-white bg-gray-900">
//         <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 to-transparent"></div>
//         <img
//           src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop"
//           alt="React Code Background"
//           className="absolute inset-0 object-cover w-full h-full opacity-20"
//         />
//         <div className="container relative z-20 px-4 py-20 mx-auto sm:px-6 lg:px-8 md:py-24">
//           <div className="max-w-4xl">
//             <Badge variant="secondary" className="mb-4">
//               Best Seller
//             </Badge>
//             <h1 className="text-4xl font-black tracking-tighter md:text-5xl lg:text-6xl">
//               Master React from Scratch 
//             </h1>
//             <p className="max-w-2xl mt-4 text-lg text-gray-300 md:text-xl">
//               Build real-world applications with React, Hooks, and modern state
//               management.
//             </p>
//             <div className="flex items-center mt-6 gap-x-4">
//               <div className="flex items-center gap-1 text-yellow-400">
//                 <Star className="w-5 h-5 fill-current" />
//                 <span className="font-bold text-white">4.8</span>
//               </div>
//               <p className="text-gray-300">(1,280+ ratings)</p>
//             </div>
//             <p className="mt-4 text-sm text-gray-400">
//               Created By{" "}
//               <span className="font-medium text-blue-300 cursor-pointer hover:underline">
//                 Gopal Shukla
//               </span>
//             </p>
//           </div>
//         </div>
//       </header>

//       {/* ===== Main Content ===== */}
//       <main className="container px-4 py-12 mx-auto sm:px-6 lg:px-8">
//         <div className="flex flex-col gap-8 lg:flex-row-reverse lg:gap-12">
          
//           {/* Right Sticky Card */}
//           <div className="lg:w-1/3 lg:sticky lg:top-24 h-fit">
//             <Card className="overflow-hidden border shadow-2xl dark:bg-gray-900 dark:border-gray-700">
//                 <div className="relative flex items-center justify-center bg-gray-800 aspect-video group">
//                     <img src="https://i.ytimg.com/vi/SqcY0GlETPk/maxresdefault.jpg" alt="Course thumbnail" className="object-cover w-full h-full"/>
//                     <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/50 group-hover:opacity-100">
//                         <PlayCircleIcon className="w-20 h-20 text-white/80"/>
//                     </div>
//                 </div>
//               <div className="p-6 space-y-4">
//                 <h2 className="text-4xl font-bold text-gray-900 dark:text-white">₹999</h2>
//                 {purchasedCourse ? (
//                   <Button size="lg" className="w-full py-6 text-lg font-semibold">
//                     Go to Course
//                   </Button>
//                 ) : (
//                   <EnrollCourseBtn />
//                 )}
//                  <div className="text-center">
//                     <Button variant="ghost" size="sm" className="dark:text-gray-400">Apply Coupon</Button>
//                  </div>
//                  <Separator/>
//                  <h3 className="text-lg font-bold">This course includes:</h3>
//                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
//                     <li className="flex items-center gap-3"><Video className="w-4 h-4 text-blue-500"/> 5.5 hours on-demand video</li>
//                     <li className="flex items-center gap-3"><BookText className="w-4 h-4 text-blue-500"/> 12 articles & resources</li>
//                     <li className="flex items-center gap-3"><Globe className="w-4 h-4 text-blue-500"/> Full lifetime access</li>
//                     <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-blue-500"/> Certificate of completion</li>
//                  </ul>
//               </div>
//             </Card>
//           </div>

//           {/* Left Content */}
//           <div className="lg:w-2/3">
//             <div className="space-y-10">
//               <div className="p-8 bg-white border rounded-lg shadow-lg dark:border-gray-800 dark:bg-gray-900">
//                 <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">What you'll learn</h2>
//                  <ul className="grid grid-cols-1 gap-4 text-base text-gray-700 md:grid-cols-2 dark:text-gray-300">
//                     <li className="flex items-start gap-3"><CheckCircle2 className="flex-shrink-0 w-5 h-5 mt-1 text-green-500"/><span>Core React concepts from scratch</span></li>
//                     <li className="flex items-start gap-3"><CheckCircle2 className="flex-shrink-0 w-5 h-5 mt-1 text-green-500"/><span>Advanced state management with Redux</span></li>
//                     <li className="flex items-start gap-3"><CheckCircle2 className="flex-shrink-0 w-5 h-5 mt-1 text-green-500"/><span>Build and deploy real-world projects</span></li>
//                     <li className="flex items-start gap-3"><CheckCircle2 className="flex-shrink-0 w-5 h-5 mt-1 text-green-500"/><span>Master Hooks and Context API</span></li>
//                  </ul>
//               </div>

//               <div>
//                 <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Course Content</h2>
//                 <Accordion type="single" collapsible className="w-full border rounded-lg shadow-lg dark:border-gray-800" defaultValue="item-0">
//                     {/* Yahan aap lectures ke sections ko map kar sakte hain */}
//                     {['Introduction', 'Core Concepts', 'Advanced Topics', 'Project Building'].map((section, sectionIdx) => (
//                       <AccordionItem value={`item-${sectionIdx}`} key={sectionIdx} className="bg-white rounded-lg dark:bg-gray-900">
//                         <AccordionTrigger className="px-6 py-4 text-lg font-semibold hover:no-underline">
//                          {section}
//                         </AccordionTrigger>
//                         <AccordionContent>
//                            <ul className="border-t divide-y dark:divide-gray-800 dark:border-gray-800">
//                            {/* Yahan aap uss section ke lectures ko map karenge */}
//                            {[1, 2, 3].map((_, lectureIdx) => (
//                              <li key={lectureIdx} className="flex items-center justify-between p-4 pl-8 transition-colors cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50">
//                                <div className="flex items-center gap-4">
//                                    { sectionIdx === 0 ? <PlayCircleIcon className="w-5 h-5 text-blue-500"/> : <Lock className="w-5 h-5 text-gray-400" />}
//                                    <span className="font-medium text-gray-800 dark:text-gray-200">Lecture {lectureIdx + 1} Title</span>
//                                </div>
//                                <span className="text-sm text-gray-500 dark:text-gray-400">
//                                    {sectionIdx === 0 ? "Preview" : "15:30"}
//                                </span>
//                              </li>
//                            ))}
//                            </ul>
//                         </AccordionContent>
//                       </AccordionItem>
//                     ))}
//                 </Accordion>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default CourseDetail;

