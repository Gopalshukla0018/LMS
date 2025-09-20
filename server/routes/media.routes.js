import express from "express";
import upload from "../utils/multer.js";
import { uploadMedia } from "../utils/cloudinary";

const router = express.Router();

router.router("upload-video").post(upload.single("file"), async (req, res) => {
  try {
    const result = await uploadMedia(req.file.path);
    res.status(200).json({
      message: "File u0p0loaded successfully",
      data: result,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
        message:"Error Uploading file"
    })
  }
});

export default router;
