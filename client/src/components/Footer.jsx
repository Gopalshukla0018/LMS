import React from "react";

const Footer = () => {
  return (
    <footer className="py-8 bg-gray-100 ext-gray-800 dark:bg-gray-900 dark:text-gray-200">
      <div className="flex flex-col items-center justify-between max-w-6xl gap-4 px-4 mx-auto md:flex-row">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold">LMS Platform</h2>
          <p className="mt-1 text-sm">
            Empowering instructors and students with seamless learning.
          </p>
        </div>

        {/* Middle Section */}
        <div className="flex gap-4">
          <a
            href="https://github.com/Gopalshukla0018/LMS"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
        </div>

        {/* Right Section */}
        <div className="text-sm text-center md:text-right">
          &copy; {new Date().getFullYear()} LMS. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
