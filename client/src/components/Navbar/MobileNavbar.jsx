import React from "react";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";

import DarkMode from "@/pages/DarkMode";

const MobileNavbar = () => {
  const role = "instructor";
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="bg-gray-200 rounded-full hover:bg-grey-200"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row justify-between mt-2">
          <SheetTitle>E Learning</SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4">
          <span>My Learning</span>
          <span>Edit Profile</span>
          <span>Log out</span>
        </nav>
        {role === "instructor" && (
          <SheetFooter>
            <Button type="submit">Dashboard</Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
export default MobileNavbar;
