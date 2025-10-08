import React from "react";
import { useLoardUserQuery } from "@/features/api/authApi";
import NavbarSkeleton from "../Navbar/NavbarSkeleton ";

import CoursesSkeleton from "@/pages/student/Courses/CoursesSkeleton";

import { motion } from "framer-motion";

const fadeVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const CustomLoader = ({ children }) => {
  const { isLoading } = useLoardUserQuery(); // RTK Query hook

  if (isLoading) {
    return (
      <motion.div
        className="min-h-screen space-y-8 text-gray-900 transition-colors duration-200 bg-white dark:bg-gray-900 dark:text-gray-100"
        initial="hidden"
        animate="visible"
        variants={fadeVariants}
      >
        {/* Navbar */}
        <motion.div variants={fadeVariants}>
          <NavbarSkeleton />
        </motion.div>

        {/* Hero */}

        {/* Courses Section */}
        <section className="relative py-16 bg-gray-50 dark:bg-gray-900">
          <div className="relative p-6 mx-auto max-w-7xl">
            <motion.h2
              className="mb-12 text-3xl font-extrabold text-center text-gray-900 dark:text-gray-100 sm:text-4xl"
              variants={fadeVariants}
            >
              Loading Courses...
            </motion.h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 ">
              {Array.from({ length: 12 }).map((_, idx) => (
                <motion.div key={idx} variants={fadeVariants}>
                  <CoursesSkeleton />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </motion.div>
    );
  }

  return children;
};

export default CustomLoader;

