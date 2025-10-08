import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowRight } from "lucide-react";
import HeroAbout from "@/components/HeroAbout";

const keywords = [
  "Web Development",
  "AI Tools",
  "Cloud Skills",
  "UI/UX",
  "Data Science",
  "Cyber Security",
];

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  const handleGetStartedClick = () => {
    if (user) {
      navigate("/my-learning");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center px-6 py-24 overflow-hidden bg-background text-foreground">
      <motion.div
        className="absolute rounded-full opacity-50 w-96 h-96 bg-purple-500/20 mix-blend-multiply filter blur-3xl"
        animate={{ x: [0, 80, -60, 0], y: [0, -50, 70, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full opacity-50 w-96 h-96 bg-blue-500/20 mix-blend-multiply filter blur-3xl"
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
            className="mb-8 text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Learn from industry experts, sharpen your skills, and unlock career
            opportunities with our curated courses.
          </motion.p>

          <div className="flex gap-4">
            <Button
              onClick={handleGetStartedClick}
              className="flex items-center gap-2 px-6 py-3 text-white transition-opacity bg-gradient-to-r from-pink-500 to-yellow-500 hover:opacity-90"
            >
              {user ? "Go to My Learning" : "Get Started"}
              <ArrowRight size={18} />
            </Button>

            <Button
              onClick={() => navigate(`/course/search?query`)}
              variant="outline"
              className="px-6 py-3"
            >
              Explore Courses
            </Button>
          </div>
        </div>

        {/* Right Side: Rotating Keywords */}
        <div className="flex items-center justify-center">
          <motion.div
            className="relative flex items-center justify-center border-4 rounded-full w-80 h-80 border-border"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {keywords.map((word, index) => {
              const angle = (index / keywords.length) * 2 * Math.PI;
              return (
                <motion.div
                  key={word}
                  className="absolute px-3 py-2 text-sm font-medium rounded-full shadow-lg bg-card text-card-foreground backdrop-blur-md"
                  style={{
                    top: `calc(50% - 1rem + ${40 * Math.sin(angle)}%)`,
                    left: `calc(50% - 2.5rem + ${40 * Math.cos(angle)}%)`,
                  }}
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                >
                  {word}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* separate about component below hero */}
      <HeroAbout />
    </section>
  );
};

export default HeroSection;
