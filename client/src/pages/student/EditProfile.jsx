import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Course from "./Courses/Course";
import EditProfileSkeleton from "./EditProfileSkeleton";
import { motion } from "framer-motion";
import {
  useLoardUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const { data, isLoading ,refetch} = useLoardUserQuery();
  const user = data?.user;

  const [
    updateUser,
    { data: updateUserData, isLoading: updateUserIsLoading, isSuccess, isError , error },
  ] = useUpdateUserMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
    }
  };

  const updateUserHandler = async () => {
    console.log(name, profilePhoto);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message || "Profile Updated");
    }
    if (isError) {
      toast.error(error.message || "Failed to Update Profile");
    }
  }, [error, updateUserData, isSuccess]);

  if (isLoading || !user) {
    return <EditProfileSkeleton />;
  }

  return (
    <motion.div
      className="max-w-4xl px-4 mx-auto my-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold text-center md:text-left">PROFILE</h1>
      <div className="flex flex-col items-center gap-8 my-5 md:flex-row md:items-start">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center"
        >
          <Avatar className="w-24 h-24 mb-4 transition-all duration-300 shadow-lg md:h-32 md:w-32">
            <AvatarImage
              src={user?.photoUrl || "https://github.com/shadcn.png"}
              alt="Instructor avatar"
              className="object-cover w-full h-full rounded-full"
            />
            <AvatarFallback>DP</AvatarFallback>
          </Avatar>
        </motion.div>
        <div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Name:
              <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
                {user.name}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Email:
              <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
                {user.email}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Role:
              <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
                {user.role.toUpperCase()}
              </span>
            </h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-2 text-white transition-all duration-200 bg-indigo-600 shadow-md hover:bg-indigo-700">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-xl">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 gap-4 nitems-center">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="cold-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 gap-4 nitems-center">
                  <Label>Profile Photo</Label>
                  <Input
                    onChange={onChangeHandler}
                    type="file"
                    accept="image/*"
                    className="cold-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  disable={isLoading || updateUserIsLoading}
                  onClick={updateUserHandler}
                  className="text-white transition-all duration-200 bg-indigo-600 shadow-md hover:bg-indigo-700"
                >
                  {isLoading || updateUserIsLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please
                      wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h1>Courses you're enrolled in</h1>
        <div className="grid grid-cols-1 gap-4 my-5 sm:grid-cols-2 md:grid-cols-3">
          {user.enrolledCourses.length === 0 ? (
            <h1>You haven't enrolled yet</h1>
          ) : (
            user.enrolledCourses.map((course) => (
              <motion.div
                key={course.Id}
                whileHover={{ scale: 1.03 }}
                className="overflow-hidden shadow-md rounded-xl"
              >
                <Course course={course} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EditProfile;
