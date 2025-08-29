import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HeroSection = () => {
  return (
    <section className=  "relative px-10 py-20 pb-8 text-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 dark:bg-black/40"></div>

      <div className="relative max-w-3xl mx-auto text-white">
        <h1 className="mb-6 text-5xl font-extrabold leading-tight sm:text-6xl">
          Unlock Your Learning Journey
        </h1>
        <p className="mb-8 text-lg text-gray-200 dark:text-gray-400">
          Explore top-rated courses, master new skills, and level up your career
          with expert instructors.
        </p>

        {/* <div className="flex justify-center gap-4">
          
          <button className="px-6 py-3 font-medium text-white transition border border-white/70 rounded-xl hover:bg-white/10">
            Browse Courses
          </button>
        </div> */}
        {/* Search Form */}
        <form
          action=""
          className="flex w-full max-w-xl mx-auto overflow-hidden transition bg-white rounded-full shadow-lg dark:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500"
        >
          <Input
            type="text"
            placeholder="Search for courses..."
            className="flex-grow px-6 py-3 text-gray-800 border-none rounded-l-full focus-visible:ring-0 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
          />
          <Button
            type="submit"
            className="px-6 py-3 text-white bg-blue-600 rounded-r-full hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-700"
          >
            Search
          </Button>
        </form>
     <Button
  className="mt-4 text-blue-600 transition bg-white rounded-full dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
>
  Explore Courses
</Button>

      </div>
    </section>
  );
};

export default HeroSection;
