// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { motion } from "framer-motion";

// const HeroSection = () => {
//   return (
//     <section className="relative px-10 py-20 pb-8 overflow-hidden text-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/30 dark:bg-black/40"></div>

//       <div className="relative max-w-3xl mx-auto text-white">
//         {/* Heading */}
//      <motion.h1
//   className="mb-6 text-5xl font-extrabold leading-tight sm:text-6xl"
//   initial={{ opacity: 0, y: -30 }}
//   whileInView={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.5, ease: "easeOut" }}
//   viewport={{ once: true, amount: 0.6 }} // ye line important hai
// >
//   Unlock Your Learning Journey
// </motion.h1>

//         {/* Subtext */}
//         <motion.p
//           className="mb-8 text-lg text-gray-200 dark:text-gray-400"
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.45, delay: 0.15 }}
//         >
//           Explore top-rated courses, master new skills, and level up your career
//           with expert instructors.
//         </motion.p>

//         {/* Search Form */}
//         <motion.form
//           action=""
//           className="flex w-full max-w-xl mx-auto overflow-hidden transition bg-white rounded-full shadow-lg dark:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500"
//           initial={{ opacity: 0, scale: 0.92 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ type: "spring", stiffness: 250, damping: 18, delay: 0.25 }}
//         >
//           <Input
//             type="text"
//             placeholder="Search for courses..."
//             className="flex-grow px-6 py-3 text-gray-800 border-none rounded-l-full focus-visible:ring-0 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
//           />
//           <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//             <Button
//               type="submit"
//               className="px-6 py-3 text-white bg-blue-600 rounded-r-full hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-700"
//             >
//               Search
//             </Button>
//           </motion.div>
//         </motion.form>

//         {/* Explore Button */}
//         <motion.div
//           className="mt-6"
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.45, delay: 0.35 }}
//         >
//           <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
//             <Button className="text-blue-600 transition bg-white rounded-full dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
//               Explore Courses
//             </Button>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;




import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const keywords = ["Web Development", "AI Tools", "Cloud Skills", "UI/UX", "Data Science", "Cyber Security"];

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center px-6 py-24 overflow-hidden text-white bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700">
      
      {/* Floating Blobs Background */}
      <motion.div
        className="absolute bg-purple-500 rounded-full w-96 h-96 mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ x: [0, 80, -60, 0], y: [0, -50, 70, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bg-blue-500 rounded-full w-96 h-96 mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ x: [0, -70, 60, 0], y: [0, 50, -80, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

       <div className="relative z-10 grid max-w-6xl gap-12 lg:grid-cols-2">
      
         {/* Left Content */}
         <div className="flex flex-col items-start text-left">
           <motion.h1
             className="mb-6 text-5xl font-extrabold leading-tight sm:text-6xl"
             initial={{ opacity: 0, y: -40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.7 }}
           >
             Master Skills, <br />  
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
               Build Your Future
             </span>
           </motion.h1>

           <motion.p
             className="mb-8 text-lg text-gray-200"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.3, duration: 0.7 }}
           >
             Learn from industry experts, sharpen your skills, and unlock career opportunities with our curated courses.
           </motion.p>
           <div className="flex gap-4">
             <Button className="px-6 py-3 text-white bg-gradient-to-r from-pink-500 to-yellow-500 hover:opacity-90">
               Get Started
             </Button>
             <Button variant="outline" className="px-6 py-3 text-indigo-700 border-white hover:bg-white hover:text-indigo-700">
               Explore Courses
             </Button>
           </div>
         </div>
        {/* Right Side: Rotating Keywords */}
         <div className="flex items-center justify-center">
           <motion.div
             className="relative flex items-center justify-center border-4 rounded-full w-80 h-80 border-white/20"
             animate={{ rotate: 360 }}
             transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
           >
             {keywords.map((word, index) => {
               const angle = (index / keywords.length) * 2 * Math.PI;
               return (
                 <motion.div
                   key={word}
                   className="absolute px-3 py-2 text-sm font-medium rounded-full shadow-lg bg-white/10 backdrop-blur-md"
                   style={{
                     top: `${45 + 40 * Math.sin(angle)}%`,
                     left: `${45 + 40 * Math.cos(angle)}%`,
                   }}
                   // Keep text upright
                   animate={{ rotate: -360 }}
                   transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                   whileHover={{ scale: 1.2 }}
                 >
                   {word}
                 </motion.div>
               );
             })}
           </motion.div>
         </div>
       </div>
     </section>
   );
 };

 export default HeroSection;



