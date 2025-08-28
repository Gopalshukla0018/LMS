import React from "react";
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

const Navbar = () => {
  const user = false;
  return (
    
    
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 boorder-b-gray-200 top-0 fixed right-0 left-0 duration-300  z-10 ">
      {/* Desktop */}
      <div className="justify-between hidden max-auto max-w-7xl md:flex ">
        <div className="flex gap-4 mt-3">
          <School size={"30"} />
          <h1 className="hidden text-2xl font-extrabold md:block">
            E-Learning
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
                  <DropdownMenuItem>My Learning</DropdownMenuItem>
                  <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2 item-center">
              <Button variant="outline">login</Button>
              <Button>signup</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
      {/* Mobile device */}
      <div className="flex items-center justify-between px-4 md:hidden ">
         <h1 className="text-2xl font-extrabold">E Learning</h1>
         <MobileNavbar />
      </div>
     
    </div>
  );
};
export default Navbar;
