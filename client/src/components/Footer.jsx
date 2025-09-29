import React from "react";

const Footer = () => {
  return (
    <footer className="py-8 text-gray-800 bg-gray-100 dark:bg-gray-900 dark:text-gray-200">
      <div className="flex flex-col items-center justify-between max-w-6xl gap-4 px-4 mx-auto md:flex-row">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold">SkillsMittra</h2>
          <p className="mt-1 text-sm">
            Empowering instructors and students with seamless learning.
          </p>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col gap-2 text-center sm:flex-row sm:gap-4">
          <a
            href="https://github.com/Gopalshukla0018/LMS"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
          <a
            href="mailto:gopalshukla0018@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Contact
          </a>
          <a
            href="https://www.linkedin.com/in/gopalshukla0018/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
        </div>

        {/* Right Section */}
        <div className="text-sm text-center md:text-right">
          &copy; {new Date().getFullYear()} SkillsMittra. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
