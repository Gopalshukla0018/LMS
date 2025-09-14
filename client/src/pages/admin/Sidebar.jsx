// import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
// import React from "react";
// import { Link, Outlet } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="flex min-h-screen">
//       <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300  bg-[#f0f0f0] p-5 sticky top-0 h-screen dark:border-gray-700 ">
//         +
//         <div className="flex-1 p-6">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    // STEP 1: Ek parent container banayein jo poori screen ko cover kare aur flex ho.
    <div className="flex min-h-screen">

  <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r  border-gray-300 bg-[#f0f0f0] p-5 sticky top-0 h-screen dark:border-gray-700">
    <div className="space-y-4 mt-19">
           <Link to="/admin/Dashboard" className="flex items-center gap-2">
             <ChartNoAxesColumn size={22} />
             <h1>Dashboard</h1>
           </Link>
           <Link to="/admin/courses" className="flex items-center gap-2">
             <SquareLibrary size={22} />
             <h1>Course</h1>
           </Link>
         </div>
  </div>

      <div className="flex-1 p-2 bg-white md:p-10">
       
        <Outlet />
      </div>

    </div>
  );
};

export default Sidebar;
