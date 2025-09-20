import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";

const LectureTab = () => {
  const [Title, setTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const[isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgres] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = (useState = true);
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make changes and click save when done
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-red-500">Remove Lecture</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <input type="text" placeholder="Ex.introduction" />
        </div>

        <div className="my-5">
          <Label>
            Video <span className="text-red-500">*</span>{" "}
          </Label>
          <input
            type="file"
            placeholder="Ex.introduction"
            accept="video/*"
            className="p-2 my-2 border rounded-lg w-fit"
          />
        </div>
        <div className="flex items-center my-5 space-x-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Is This Video Free </Label>
        </div>
        <div>
          <Button>Update Lecture</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
