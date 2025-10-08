import { Course } from "../model/course.model.js";
import { deleteMediafromCloudinary, uploadMedia } from "../utils/cloudinary.js";
import { lecture as LectureModel } from "../model/lecture.model.js";

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

export const searchCourse = async (req, res) => {
  try {
    const { query = "", categories = [], sortByPrice = "" } = req.query;
    // create search query
    const searchCriteria = {
      isPublished: true,
      $or: [
        { courseTitle: { $regex: query, $options: "i" } },
        { courseSubTitle: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    };

    // if categories selected
    if (categories.length > 0) {
      searchCriteria.category = { $in: categories };
    }
    // define sorting order
    const sortOptions = {};
    if (sortByPrice === "low") {
      sortOptions.coursePrice = 1; // sort by price in accending order
    } else if (sortByPrice === "high") {
      sortOptions.coursePrice = -1;
    }
    let courses = await Course.find(searchCriteria)
      .populate({ path: "creator", select: "name photoUrl" })
      .sort(sortOptions);

    return res.status(200).json({
      success: true,
      courses: courses || [],
    });
  } catch (error) {
    console.log("error in search course controller", error);
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

export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const {
      courseTitle,
      courseSubTitle,
      Coursecategory,
      courseDescription,
      courseLevel,
      coursePrice,
    } = req.body;

    const courseThumbnail = req.file;

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
        success: false,
      });
    }

    let Thumbnail; // Is variable mein Cloudinary ka result aayega
    if (courseThumbnail) {
      if (course.courseThumbnail) {
        const publicID = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediafromCloudinary(publicID); // Puraana thumbnail delete
      }
      Thumbnail = await uploadMedia(courseThumbnail.path); // Naya thumbnail upload
    }

    // Database mein save karne ke liye data
    const updateData = {
      courseTitle,
      courseSubTitle,
      category: Coursecategory, // Model ke hisaab se 'category'
      courseDescription,
      courseLevel,
      coursePrice,
    };

    // FIX: Agar nayi image upload hui hai, to uska URL 'Thumbnail' se uthayein
    if (Thumbnail) {
      updateData.courseThumbnail = Thumbnail.secure_url;
    }

    const updatedCourse = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true, // Taki response mein updated data aaye
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
      message: "Failed to update course",
    });
  }
};
export const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId)
      .populate("lectures")
      .populate("creator", "name ");
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
// get al lecture --
export const getAllPublishedCourse = async (re_, res) => {
  try {
    const course = await Course.find({ isPublished: true }).populate({
      path: "creator",
      select: "name photoUrl ",
    });

    if (!course) {
      return res.status(404).json({
        message: "course not found",
      });
    }
    return res.status(200).json({
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "failed to get published courses",
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

// Delete a course and its lectures (and related media)
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Delete course thumbnail from cloudinary if present
    if (course.courseThumbnail) {
      try {
        const publicID = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediafromCloudinary(publicID);
      } catch (err) {
        console.log("Failed to delete course thumbnail:", err);
      }
    }

    // Delete all lectures and their media
    if (course.lectures && course.lectures.length > 0) {
      for (const lectureId of course.lectures) {
        try {
          const lecture = await LectureModel.findByIdAndDelete(lectureId);
          if (lecture && lecture.publicId) {
            await deleteMediafromCloudinary(lecture.publicId);
          }
        } catch (err) {
          console.log(`Failed to delete lecture ${lectureId}:`, err);
        }
      }
    }

    // Finally delete the course document
    await Course.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete course" });
  }
};
