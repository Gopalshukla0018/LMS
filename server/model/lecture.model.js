import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    lectureTitle: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
    },
    publicId: {
      type: String,
    },
    isPreview: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const lecture = mongoose.model("Lecture", lectureSchema);
