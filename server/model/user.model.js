const userSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: "true",
    },
    email: {
      type: "string",
    },
    password: { type: "string", required: "true" },
    role: {
      type: "string",
      enum: ["student", "instructor"],
      default: "student",
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Tpes.objectId,
        ref: "Course",
      },
    ],
    photoUrl: {
      type: "string",
      default: "",
    },
  },
  { timestamps: true }
);
export const User = mongoose.model("User", userSchema);