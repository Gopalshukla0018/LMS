import React from "react";
import { motion } from "framer-motion";

const skeletonVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

const NavbarSkeleton = () => {
  return (
    <div className="flex items-center justify-between w-full h-16 px-6 bg-white border-b dark:bg-gray-900 dark:border-gray-800">
      {/* Left Side: Logo + Text */}
      <div className="flex items-center gap-3">
        <motion.div
          className="w-8 h-8 bg-gray-300 rounded dark:bg-gray-700 animate-pulse"
          variants={skeletonVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        />
        <motion.div
          className="w-24 h-6 bg-gray-300 rounded dark:bg-gray-700 animate-pulse"
          variants={skeletonVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        />
      </div>

      {/* Right Side: Buttons / Avatar */}
      <div className="flex items-center gap-4">
        <motion.div
          className="w-16 h-8 bg-gray-300 rounded-md dark:bg-gray-700 animate-pulse"
          variants={skeletonVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        />
        <motion.div
          className="w-16 h-8 bg-gray-300 rounded-md dark:bg-gray-700 animate-pulse"
          variants={skeletonVariants}
          initial="hidden"
          animate="visible"
          custom={3}
        />
        <motion.div
          className="bg-gray-300 rounded-full w-9 h-9 dark:bg-gray-700 animate-pulse"
          variants={skeletonVariants}
          initial="hidden"
          animate="visible"
          custom={4}
        />
      </div>
    </div>
  );
};

export default NavbarSkeleton;
