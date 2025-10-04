// server/controllers/admin/superAdmin.controller.js

import { User } from "../model/user.model.js";
import { Course } from "../model/course.model.js"; 
import{  Purchase}  from "../model/purchaseCourse.model.js"; 

export const getSuperAdminDashboardStats = async (req, res) => {
    try {
        // A. Users Stats
        const totalUsers = await User.countDocuments({});
        const totalStudents = await User.countDocuments({ role: "student" });
        const totalInstructors = await User.countDocuments({ role: "instructor" });
        
        // B. Course and Approval Stats (Assuming Course model has a 'status' field)
        const totalCourses = await Course.countDocuments({});
        const unPublishedCourse = await Course.countDocuments({ isPublished: "false" }); 

        // C. Revenue Stats (Using PurchaseCourse model)
        const totalRevenueResult = await Purchase.aggregate([
            
            { $match: { payment_status: "success" } },
          
            { $group: { _id: null, totalRevenue: { $sum: "$amount" } } }
        ]);
        
        const totalRevenue = totalRevenueResult[0]?.totalRevenue || 0;

    
        return res.status(200).json({
            success: true,
            message: "Dashboard statistics fetched successfully.",
            stats: {
                totalUsers,
                totalStudents,
                totalInstructors,
                totalCourses,
                unPublishedCourse,
                totalRevenue,
            },
        });
        
    } catch (error) {
        console.error(`Error in getSuperAdminDashboardStats: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard statistics.",
            error: error.message
        });
    }
};