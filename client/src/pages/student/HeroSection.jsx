// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// const HeroSection = () => {
//   return (
//     <section className=  "relative px-10 py-20 pb-8 text-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/30 dark:bg-black/40"></div>

//       <div className="relative max-w-3xl mx-auto text-white">
//         <h1 className="mb-6 text-5xl font-extrabold leading-tight sm:text-6xl">
//           Unlock Your Learning Journey
//         </h1>
//         <p className="mb-8 text-lg text-gray-200 dark:text-gray-400">
//           Explore top-rated courses, master new skills, and level up your career
//           with expert instructors.
//         </p>

       
//         <form
//           action=""
//           className="flex w-full max-w-xl mx-auto overflow-hidden transition bg-white rounded-full shadow-lg dark:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500"
//         >
//           <Input
//             type="text"
//             placeholder="Search for courses..."
//             className="flex-grow px-6 py-3 text-gray-800 border-none rounded-l-full focus-visible:ring-0 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
//           />
//           <Button
//             type="submit"
//             className="px-6 py-3 text-white bg-blue-600 rounded-r-full hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-700"
//           >
//             Search
//           </Button>
//         </form>
//      <Button
//   className="mt-4 text-blue-600 transition bg-white rounded-full dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
// >
//   Explore Courses
// </Button>

//       </div>
//     </section>
//   );
// };

// export default HeroSection;




import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative px-10 py-20 pb-8 overflow-hidden text-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 dark:bg-black/40"></div>

      <div className="relative max-w-3xl mx-auto text-white">
        {/* Heading */}
     <motion.h1
  className="mb-6 text-5xl font-extrabold leading-tight sm:text-6xl"
  initial={{ opacity: 0, y: -30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  viewport={{ once: true, amount: 0.6 }} // ye line important hai
>
  Unlock Your Learning Journey
</motion.h1>

        {/* Subtext */}
        <motion.p
          className="mb-8 text-lg text-gray-200 dark:text-gray-400"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          Explore top-rated courses, master new skills, and level up your career
          with expert instructors.
        </motion.p>

        {/* Search Form */}
        <motion.form
          action=""
          className="flex w-full max-w-xl mx-auto overflow-hidden transition bg-white rounded-full shadow-lg dark:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 250, damping: 18, delay: 0.25 }}
        >
          <Input
            type="text"
            placeholder="Search for courses..."
            className="flex-grow px-6 py-3 text-gray-800 border-none rounded-l-full focus-visible:ring-0 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              className="px-6 py-3 text-white bg-blue-600 rounded-r-full hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-700"
            >
              Search
            </Button>
          </motion.div>
        </motion.form>

        {/* Explore Button */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.35 }}
        >
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            <Button className="text-blue-600 transition bg-white rounded-full dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
              Explore Courses
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
