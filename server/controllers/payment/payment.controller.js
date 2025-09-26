import { Course } from "../../model/course.model.js";
import { User } from "../../model/user.model.js";
import { Purchase } from "../../model/purchaseCourse.model.js";
import {
  createCashfreeOrder,
  verifyCashfreePayment,
} from "../../services/payment/cashfree.js";

export const createOrder = async (req, res) => {
  try {
    const { courseId } = req.body;

    const userId = req.id;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (!course.coursePrice || course.coursePrice <= 0) {
      return res
        .status(400)
        .json({ message: "This course cannot be purchased." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isEnrolled = await Purchase.findOne({ userId, courseId });
    if (isEnrolled) {
      return res
        .status(400)
        .json({ message: "You are already enrolled in this course" });
    }

    const orderId = `order_${Date.now()}`;
    const orderDetails = {
      amount: course.coursePrice,
      currency: "INR",
      user,
      orderId,
    };

    const paymentResponse = await createCashfreeOrder(orderDetails);
    return res.status(200).json(paymentResponse);
  } catch (error) {
    console.error("Error in createOrder:", error);
    return res.status(500).json({
      message: "An unexpected error occurred while creating the order.",
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { orderId, courseId } = req.body;
    const userId = req.id;

    if (!orderId || !courseId) {
      return res
        .status(400)
        .json({ message: "Order ID and Course ID are required" });
    }

    const isPaymentVerified = await verifyCashfreePayment(orderId);

    if (isPaymentVerified) {
      const isEnrolled = await PurchasedCourse.findOne({ userId, courseId });
      if (isEnrolled) {
        return res
          .status(200)
          .json({ success: true, message: "Already enrolled." });
      }

      const course = await Course.findById(courseId);
      if (!course) {
        return res
          .status(404)
          .json({ success: false, message: "Course not found after payment." });
      }

      await PurchasedCourse.create({
        userId,
        courseId,
        amount: course.coursePrice,
        order_id: orderId,
        payment_status: "success",
      });

      await User.findByIdAndUpdate(userId, {
        $push: { enrolledCourses: courseId },
      });

      return res.status(200).json({
        success: true,
        message: "Payment successful and you are enrolled!",
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Payment verification failed." });
    }
  } catch (error) {
    console.error("Error in verifyPayment:", error);
    return res.status(500).json({
      message: "An unexpected error occurred during verification.",
    });
  }
};
