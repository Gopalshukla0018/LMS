import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input"; // Input component ko import karein (shadcn)
import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "@/features/api/courseApi";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

const MEDIA_API = "http://localhost:8081/api/v1/media";

const LectureTab = () => {
  const [lectureTitle, setLectureTitle] = useState(""); // Variable name 'Title' ko 'title' kiya (standard practice)
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);

  const params = useParams();
  const { courseId, lectureId } = params;
  // use navigate--
  const navigate = useNavigate();

  // RTK Query Hooks ----
  const [editLecture, { data, isLoading, error, isSuccess }] =
    useEditLectureMutation();
   
  const [
    removeLecture,
    {
      data: removeLectureData,
      isLoading: removeLectureIsLoading,
      isSuccess: removeLectureIsSuccess,
      error: removeLectureError,
    },
  ] = useRemoveLectureMutation();

  const { data: getLectureByIdData } = useGetLectureByIdQuery(lectureId);
  const lecture = getLectureByIdData?.lecture;

  // useEffect for getLectureByIdData
  useEffect(() => {
    if (lecture) {
      console.log(lecture);
      setLectureTitle(lecture.lectureTitle);
      setIsFree(lecture.isPreview);
      setUploadVideoInfo(lecture.videoInfo);
    }
  }, [lecture]);

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      setUploadProgress(0); // Reset progress on new upload

      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
          withCredentials: true,
        });

        if (res.data.success) {
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.publicId,
          });
          setBtnDisable(false);
          toast.success(res.data.message || "Video uploaded successfully!");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Video upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  //  Handler function to edit the lecture

  const editLectureHandler = async () => {
    await editLecture({
      lectureTitle,
      videoInfo: uploadVideoInfo,
      isPreviewFree: isFree,
      courseId,
      lectureId,
    });
    console.log(
      "success",
      lectureTitle,
      uploadVideoInfo,
      isFree,
      courseId,
      lectureId
    );
  };

  // Handler function for remove lecture
  const removeLectureHandler = async () => {
    removeLecture(lectureId);
  };

  // useeffect for edit lecture---
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }
    if (error) toast.error(error.data.message);
  }, [isSuccess, error]);

  // useEffect for remove lecture---

  useEffect(() => {
    if (removeLectureIsSuccess && removeLectureData) {
      toast.success(removeLectureData.message);
      navigate(`/admin/courses/${courseId}/lecture`);
    }
    if (removeLectureError && removeLectureData)
      toast.error(error.removeLectureError.message);
  }, [removeLectureError, removeLectureIsSuccess, removeLectureData]);

  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make changes and click save when done
          </CardDescription>
        </div>
        <Button
          variant="destructive"
          disabled={removeLectureIsLoading}
          onClick={removeLectureHandler}
        >
          {removeLectureIsLoading ? (
            <>
              <Loader2 className="h-4 mr-2 animate-spin" /> Please Wait
            </>
          ) : (
            " Remove Lecture"
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>

          <Input
            id="title"
            type="text"
            placeholder="Ex. Introduction to..."
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
          />
        </div>

        <div className="my-5 space-y-2">
          <Label>
            Video <span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            onChange={fileChangeHandler}
            accept="video/*"
            className="w-full"
          />
        </div>

        {/* Progress Bar */}
        {mediaProgress && (
          <div className="my-4 space-y-1">
            <Progress value={uploadProgress} />
            <p className="text-sm text-center text-muted-foreground">
              Uploading: {uploadProgress}%
            </p>
          </div>
        )}

        <div className="flex items-center my-5 space-x-2">
          <Switch id="is-free" checked={isFree} onCheckedChange={setIsFree} />
          <Label htmlFor="is-free">Make this lecture free for preview</Label>
        </div>

        <div className="mt-6">
          <Button onClick={editLectureHandler} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2,h-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Update Lecture"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
