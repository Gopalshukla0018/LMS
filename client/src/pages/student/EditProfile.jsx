import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const EditProfile = () => {
  return (
    <div className="max-w-4xl px-4 mx-auto my-24">
      <h1 className="text-2xl font-bold text-center md:text-left">PROFILE</h1>
      <div className="flex flex-col items-center gap-8 my-5 md:flex-row md:items-start">
        <div className="flex flex-col items-center">
          <Avatar className="w-24 h-24 mb-4 md:h-32 md:w-32">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="Instructor avatar"
              className="object-cover w-full h-full rounded-full"
            />
            <AvatarFallback>GS</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Name:
              <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
                Gopal Shukla
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Email:
              <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
                gopalshukla0018@gmail.com
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Role:
              <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
                Instructure
              </span>
            </h1>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
