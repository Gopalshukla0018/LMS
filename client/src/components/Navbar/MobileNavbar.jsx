// import React from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
//   SheetFooter,
// } from "@/components/ui/sheet";
// import { Menu } from "lucide-react";
// import { Separator } from "@/components/ui/separator";
// import DarkMode from "@/pages/DarkMode";
// import { useSelector } from "react-redux";
// import { useNavigate, Link } from "react-router-dom";
// import { useLogoutUserMutation } from "@/features/api/authApi";
// import { toast } from "sonner";

// const MobileNavbar = () => {
//   const { user } = useSelector((state) => state.auth);
//   const [logoutUser] = useLogoutUserMutation();
//   const navigate = useNavigate();

//   const logoutHandler = async () => {
//     try {
//       const res = await logoutUser().unwrap();
//       toast.success(res.message || "Logged out successfully");
//       navigate("/login");
//     } catch (err) {
//       toast.error(err?.data?.message || "Logout failed");
//     }
//   };

//   return (
//     <div className="flex items-center gap-3">
//       {/* Dark mode toggle - always outside sidebar */}
//       <DarkMode />

//       {/* Sidebar menu */}
//       <Sheet>
//         <SheetTrigger asChild>
//           <Button
//             size="icon"
//             className="bg-gray-200 rounded-full hover:bg-gray-300"
//             variant="outline"
//           >
//             <Menu />
//           </Button>
//         </SheetTrigger>

//         <SheetContent className="flex flex-col">
//           <SheetHeader>
//             <SheetTitle>Skills mittra</SheetTitle>
//           </SheetHeader>

//           <Separator className="my-2" />

//           <nav className="flex flex-col space-y-4">
//             {user ? (
//               <>
//                 <SheetClose asChild>
//                   <Link to="/my-learning" className="text-base">
//                     My Learning
//                   </Link>
//                 </SheetClose>

//                 <SheetClose asChild>
//                   <Link to="/edit-profile" className="text-base">
//                     Edit Profile
//                   </Link>
//                 </SheetClose>

//                 <Button variant="ghost" onClick={logoutHandler}>
//                   Log out
//                 </Button>

//                 {user.role === "instructor" && (
//                   <SheetFooter>
//                     <SheetClose asChild>
//                       <Link to="/admin/dashboard">
//                         <Button>Dashboard</Button>
//                       </Link>
//                     </SheetClose>
//                   </SheetFooter>
//                 )}
//               </>
//             ) : (
//               <>
//                 <SheetClose asChild>
//                   <Link to="/login">
//                     <Button variant="outline">Login</Button>
//                   </Link>
//                 </SheetClose>
//                 <SheetClose asChild>
//                   <Link to="/signup">
//                     <Button>Sign Up</Button>
//                   </Link>
//                 </SheetClose>
//               </>
//             )}
//           </nav>
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// };

// export default MobileNavbar;

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import DarkMode from "@/pages/DarkMode";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";

const MobileNavbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await logoutUser().unwrap();
      toast.success(res.message || "Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="flex items-center justify-end gap-3 px-2 py-2 sm:px-4">
      {/* Dark mode toggle - always visible */}
      <DarkMode />

      {/* Sidebar Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="transition bg-gray-200 rounded-full dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            variant="outline"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>

        <SheetContent className="flex flex-col justify-between h-full p-6 bg-white dark:bg-gray-800">
          <div>
            <SheetHeader className="mb-4">
              <SheetTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Skills Mittra
              </SheetTitle>
            </SheetHeader>

            <Separator className="my-2" />

            <nav className="flex flex-col mt-4 space-y-4">
              {user ? (
                <>
                  <SheetClose asChild>
                    <Link
                      to="/my-learning"
                      className="text-base text-gray-800 transition dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      My Learning
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      to="/edit-profile"
                      className="text-base text-gray-800 transition dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      Edit Profile
                    </Link>
                  </SheetClose>

                  <Button
                    variant="ghost"
                    onClick={logoutHandler}
                    className="w-full text-left"
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <SheetClose asChild>
                    <Link to="/login">
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to={{ pathname: "/login", search: "?tab=signup" }}>
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </SheetClose>
                </>
              )}
            </nav>
          </div>

          {/* Instructor Dashboard */}
          {user?.role === "instructor" && (
            <SheetFooter className="mt-6">
              <SheetClose asChild>
                <>
                  <Link to="/admin/courses" className="w-full">
                    <Button className="w-full">Courses Management</Button>
                  </Link>
                  <Link to="/admin/dashboard" className="w-full">
                    <Button className="w-full">Dashboard</Button>
                  </Link>
                </>
              </SheetClose>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
