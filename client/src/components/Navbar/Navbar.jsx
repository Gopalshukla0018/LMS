import React, { useEffect } from "react";
import { Button } from "../ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DarkMode from "@/pages/DarkMode";

import MobileNavbar from "./MobileNavbar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  // DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

import SearchBar from "./SearchBar";
import { GraduationCap } from "lucide-react";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "User logout Successully");
      navigate("/");
    }
  }, [isSuccess]);

  return (
    <div className="fixed top-0 left-0 right-0 z-10 h-16 duration-300 bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-b-gray-200 ">
      {/* Desktop */}

      <div className="justify-between hidden max-auto max-w-7xl md:flex ">
        <div className="flex gap-4 mt-3">
          <Link to="/">
            {/* <BookOpenTextIcon size={"30"} /> */}
            <GraduationCap size={"30"} />
          </Link>

          <h1 className="hidden text-2xl font-extrabold md:block">
            SkillsMittra
          </h1>
          <SearchBar />
        </div>
        {/* user icons and dark mode icons */}
        <div className="flex gap-6 mt-4 tems-center ">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt="user avatar"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    {" "}
                    <Link to="./my-learning">My Learning</Link>{" "}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {" "}
                    <Link to="/edit-profile"> Edit Profile</Link>{" "}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                {(user?.role === "instructor" ||
                  user?.role === "superadmin") && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2 item-center">
              <Link to="login">
                <Button variant="outline">login</Button>
              </Link>
              <Link to={{ pathname: "/login", search: "?tab=signup" }}>
                <Button>signup</Button>
              </Link>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
      {/* Mobile device */}
      <div className="flex items-center justify-between px-4 mt-2 md:hidden">
        <Link to={`/`}>
          <h1 className="text-2xl font-extrabold"> SkillsMittra</h1>
        </Link>

        <MobileNavbar />
      </div>
    </div>
  );
};
export default Navbar;
