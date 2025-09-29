import { Course } from "../../model/course.model.js";
import { Purchase } from "../../model/purchaseCourse.model.js";



export const getAdminDashboardData = async (req, res) => {
  try {
    // STEP 1: Get the ID of the currently logged-in admin .
    const adminId = req.id;

    // STEP 2: Find all courses that were created by this specific admin.
    const adminCourses = await Course.find({ creator: adminId }).select("_id");

    if (!adminCourses.length) {
      return res.status(200).json({
        success: true,
        message: "You have not created any courses yet.",
        data: { totalRevenue: 0, totalStudents: 0, sales: [] },
      });
    }

    // STEP 3: Create a list (an array) of just the course IDs.
    const courseIds = adminCourses.map((course) => course._id);

    // STEP 4: Find all the sales records that belong to this admin's courses.
   
    const sales = await Purchase.find({ course: { $in: courseIds } }) 
      
      
      .populate({ path: "course", select: "courseTitle coursePrice" })
      
      .populate({ path: "user", select: "name email" })
      .sort({ createdAt: -1 });

    // STEP 5: Calculate the total revenue and the number of unique students.
    let totalRevenue = 0;
    const studentSet = new Set(); 

    sales.forEach((sale) => {
      if (sale.course) { 
        totalRevenue += sale.course.coursePrice;
      }
      // Add the student's ID from the populated user data.
      // FIX: Changed 'sale.userId' to 'sale.user'
      if (sale.user) {
        studentSet.add(sale.user.toString());
      }
    });

    // STEP 6: Send all the calculated data back to the frontend.
    return res.status(200).json({
      success: true,
      data: {
        totalRevenue,
        totalStudents: studentSet.size,
        sales,
      },
    });
  } catch (error) {
    console.log("Error in getAdminDashboardData controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};