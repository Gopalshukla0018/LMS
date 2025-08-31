// // import React from "react";
// // import CoursesSkeleton from "./Courses/CoursesSkeleton";
// // import Course from "./Courses/Course";
// // const courses = [1, 2, 3, 4, 5, 6, , 7];
// // const Courses = () => {
// //   const isLoading = false;
// //   return (
// //     <div className="bg-gray-50">
// //       <div className="p-6 mx-auto max-w-7xl">
// //         <h2 className="mb-10 text-3xl font-bold text-center "> Our Courses</h2>
// //         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
// //           {isLoading
// //             ? Array.from({ length: 8 }).map((_, index) => (
// //                 <CoursesSkeleton key={index} />
// //               ))
// //             : (courses.map((course, index) =>  <Course key={index}/>))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Courses;

import React from "react";
import CoursesSkeleton from "./Courses/CoursesSkeleton";
import Course from "./Courses/Course";
import { motion } from "framer-motion";

const courses = [1, 2, 3, 4, 5, 6, 7];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // faster stagger
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" }, // fast animation
  },
};

const Courses = () => {
  const isLoading = false;

  return (
    <section className="relative py-16 bg-gray-50 dark:bg-gray-900">
      {/* Decorative background glow */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-indigo-50/40 to-transparent dark:from-indigo-900/15" />

      <div className="relative p-6 mx-auto max-w-7xl">
        {/* Heading */}
        <motion.h2
          className="mb-12 text-3xl font-extrabold text-center text-gray-900 dark:text-white sm:text-4xl"
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Our Courses
        </motion.h2>

        {/* Course Grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }} // faster trigger
        >
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CoursesSkeleton key={index} />
              ))
            : courses.map((course, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ scale: 1.02, y: -3 }} // lighter hover
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                >
                  <Course />
                </motion.div>
              ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Courses;


