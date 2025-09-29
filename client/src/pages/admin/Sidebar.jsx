import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet, NavLink } from "react-router-dom"; 

const Sidebar = () => {
 
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 ${
      isActive ? "bg-gray-200 dark:bg-gray-800 text-black dark:text-white font-semibold" : ""
    }`;

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950">
      {/* Sidebar */}
      <div className="hidden lg:block w-[250px] space-y-8 border-r border-gray-200 bg-gray-50 p-4 sticky top-0 h-screen dark:bg-gray-900 dark:border-gray-800">
        <div className="mt-16 space-y-2">
       
          <NavLink to="/admin/dashboard" className={navLinkClass}>
            <ChartNoAxesColumn size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/admin/courses" className={navLinkClass}>
            <SquareLibrary size={20} />
            <span>Course</span>
          </NavLink>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 mt-12">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;