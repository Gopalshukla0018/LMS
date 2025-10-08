import React from "react";
import { motion } from "framer-motion";

const skeletonVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const HeroSkeleton = () => {
  return (
    <section className="relative px-10 py-20 overflow-hidden text-gray-900 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-gray-100">
      {/* Overlay */}
      {/* lighter overlay in light mode, stronger dark overlay in dark mode so placeholders read as dark */}
      <div className="absolute inset-0 bg-black/20 dark:bg-black/60"></div>

      <div className="relative flex flex-col max-w-3xl gap-6 mx-auto">
        {[
          "h-14 w-full rounded-lg",
          "h-6 w-5/6 rounded",
          "h-12 w-full rounded-full",
          "h-12 w-32 rounded-full",
        ].map((cls, i) => (
          <motion.div
            key={i}
            className={`${cls} bg-gray-300 dark:bg-gray-700 dark:opacity-80 animate-pulse`}
            custom={i}
            variants={skeletonVariants}
            initial="hidden"
            animate="visible"
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSkeleton;
