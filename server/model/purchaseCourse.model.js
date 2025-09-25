import mongoose from "mongoose";

const purchasedCourseSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },
    payment_status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    order_id: {
      type: String,
      required: true,
    },

    payment_id: {
      type: String,
    },
  },
  { timestamps: true }
);

export const PurchasedCourse = mongoose.model(
  "PurchasedCourse",
  purchasedCourseSchema
);
