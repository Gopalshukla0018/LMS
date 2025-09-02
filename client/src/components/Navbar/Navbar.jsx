import React ,{useEffect} from "react";
import { Button } from "../ui/button";
import { School } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DarkMode from "@/pages/darkMode";
import MobileNavbar from "./MobileNavbar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";


const Navbar = () => {
  const user = 
  // false;
  true;
    const [logoutUser,{data,isSuccess}]= useLogoutUserMutation();
    const navigate=useNavigate();
    const logoutHandler = async()=>{
      await logoutUser();
    }
    
    useEffect(() => {
    if(isSuccess){
      toast.success(data.message || "User logout Successully")
      navigate("login");;
    }
    }, [isSuccess])
  return (
    <div className="h-16 dark:bg-[#3a1515] bg-white border-b dark:border-b-gray-800 boorder-b-gray-200 top-0 fixed right-0 left-0 duration-300  z-10 ">
      {/* Desktop */}
      <div className="justify-between hidden max-auto max-w-7xl md:flex ">
        <div className="flex gap-4 mt-3">
          <Link to="/">
            <School size={"30"} />
          </Link>

          <h1 className="hidden text-2xl font-extrabold md:block">
            StudyGuider
          </h1>
        </div>
        {/* user icons and dark mode icons */}
        <div className="flex gap-6 mt-4 tems-center ">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    {" "}
                    <Link to="my-learning">My Learning</Link>{" "}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {" "}
                    <Link to="edit-profile"> Edit Profile</Link>{" "}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>Log out</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2 item-center">
            <Link to="login" >
                          <Button variant="outline">login</Button>
            </Link>

              <Button>signup</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
      {/* Mobile device */}
      <div className="flex items-center justify-between px-4 md:hidden ">
        <h1 className="text-2xl font-extrabold">Career Setu</h1>
        <MobileNavbar />
      </div>
    </div>
  );
};
export default Navbar;
