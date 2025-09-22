import { Course } from "../model/course.model.js";
import { deleteMediafromCloudinary, uploadMedia } from "../utils/cloudinary.js";
import { lecture as LectureModel } from "../model/lecture.model.js";
import { isValidObjectId } from "mongoose";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({
        message: "Course title and category are required.",
      });
    }
    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });
    return res.status(201).json({
      course,
      messeg: "course created.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
    });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(404).json({
        courses: [],
        message: "No courses found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
};

// export const editCourse = async (req, res) => {
//   try {
//     const courseId = req.params.id;

//     const {
//       courseTitle,
//       courseSubTitle,
//       Coursecategory,
//       courseLevel,
//       coursePrice,
//     } = req.body;
//     const courseThumbnail = req.file;

//     let course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({
//         message: "Course not found",
//         success: false,
//       });
//     }
//     let Thumbnail;
//     if (courseThumbnail) {
//       if (course.courseThumbnail) {
//         const publicID = course.courseThumbnail.split("/").pop().split(".")[0];
//         await deleteMediafromCloudinary(publicID); // delete old thumbnail
//       }
//       Thumbnail = await uploadMedia(courseThumbnail.path); // upload thumbnail on cloudinary
//     }

//     const updateData = {
//       courseTitle,
//       courseSubTitle,
//       Coursecategory,
//       courseLevel,
//       coursePrice,
//       courseThumbnail: courseThumbnail?.secure_url,
//     };
//     course = await Course.findByIdAndUpdate(courseId, updateData);

//     return res.status(200).json({
//       success: true,
//       message: "Course updated successfully",
//       course,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch courses",
//     });
//   }
// };
export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    // FIX: courseThumbnail ko req.body se hi destructure karein
    const {
      courseTitle,
      courseSubTitle,
      Coursecategory,
      courseLevel,
      coursePrice,
      courseThumbnail, // <-- Yahan add karein
    } = req.body;

    // 'req.file' wali line hata dein

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
        success: false,
      });
    }
    
    // Yahan Cloudinary wala logic nahi hai, so hum usse skip karenge jaisa aapke original code mein tha
    // Agar aapko Cloudinary add karna hai, to aapke teacher ka logic follow karein

    const updateData = {
      courseTitle,
      courseSubTitle,
      category: Coursecategory, // Model ke hisaab se 'category'
      courseLevel,
      coursePrice,
      // Thumbnail ko direct body se lein
      courseThumbnail: courseThumbnail || course.courseThumbnail,
    };

    const updatedCourse = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update course", // "fetch" ki jagah "update"
    });
  }
};
export const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch course",
    });
  }
};

export const createLecture = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { lectureTitle } = req.body;

    if (!lectureTitle) {
      return res.status(400).json({
        message: "Lecture title is required",
        success: false,
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
        success: false,
      });
    }

    const newLecture = await LectureModel.create({
      lectureTitle,
      course: courseId,
    });

    course.lectures.push(newLecture._id);
    await course.save();

    return res.status(201).json({
      success: true,
      message: "Lecture created successfully",
      lecture: newLecture,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create lecture",
    });
  }
};

export const getLectures = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    return res.status(200).json({
      success: true,
      lectures: course.lectures,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get lectures",
    });
  }
};

export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;
    const { courseId, lectureId } = req.params;
    const lecture = await LectureModel.findById(lectureId);

    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    // Title update logic
    if (lectureTitle) {
      lecture.lectureTitle = lectureTitle;
    }

    // Video update logic
    if (videoInfo) {
      lecture.videoUrl = videoInfo.videoUrl;
      lecture.publicId = videoInfo.publicId;
    }

    if (typeof isPreviewFree === "boolean") {
      lecture.isPreview = isPreviewFree;
    }

    await lecture.save();

    // check the course still has the lecture id if it was not already added
    const course = await Course.findById(courseId);
    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await lecture.save();
    }
    return res.status(200).json({
      message: "Lecture updated successfully",
      success: true,
    });

    if (!title || video) {
      return res.status(404).json({
        message: "Both Fields arer required",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "lecture edit failed",
    });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await LectureModel.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found",
      });
    }
    // delete the lecture from cloudinary
    if (lecture.publicId) {
      await deleteMediafromCloudinary(lecture.publicId);
    }
    // remove 6the lecture reference from the related course
    await Course.updateOne(
      { lectures: lectureId },
      { $pull: { lectures: lectureId } } // remove the lectures id from the lecture array
    );
    return res.status(200).json({
      message: "Lecture remove successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to remove lecture",
    });
  }
};

export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;

    const lecture = await LectureModel.findById(lectureId);
    if (!lectureId) {
      return res.status(404).json({
        message: "Lecture not found",
      });
    }
    return res.status(200).json({
      lecture,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failled to get lecture by id",
    });
  }
};

export const toggelPublishUnpublish = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { publish } = req.query;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "course not found ",
      });
    }
    course.isPublished = publish === "true";
    await course.save();

    const statusMessage = course.isPublished ? "Published" : "Unpublished";
    return res.status(200).json({
      message: `course is: ${statusMessage}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failled to update Course status",
    });
  }
};
