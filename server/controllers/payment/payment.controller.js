import { Course } from "../../model/course.model.js";
import  {User } from "../../model/user.model.js";
import  {PurchasedCourse}  from "../../model/purchaseCourse.model.js";

import {
  createCashfreeOrder,
  verifyCashfreePayment,
} from "../../services/payment/cashfree.js";


export const createOrder = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user._id;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const course = await Course.findById(courseId);
    const user = await User.findById(userId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const isEnrolled = await Purchase.findOne({ user: userId, course: courseId });
    if (isEnrolled) {
      return res
        .status(400)
        .json({ message: "You are already enrolled in this course" });
    }

    const orderId = `order_${Date.now()}`;

    // Prepare generic order details
    const orderDetails = {
      amount: course.price,
      currency: "INR",
      user,
      orderId,
    };

    // Call the specific payment provider's create order function
    const paymentResponse = await createCashfreeOrder(orderDetails);

    res.status(200).json(paymentResponse);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

/**
 * @description Verify payment and enroll user
 * @route POST /api/v1/payment/verify-payment
 * @access Private
 */
export const verifyPayment = async (req, res) => {
  try {
    const { orderId, courseId } = req.body;
    const userId = req.user._id;

    if (!orderId || !courseId) {
      return res
        .status(400)
        .json({ message: "Order ID and Course ID are required" });
    }

    // Call the specific payment provider's verification function
    const isPaymentVerified = await verifyCashfreePayment(orderId);

    if (isPaymentVerified) {
      const isEnrolled = await Purchase.findOne({ user: userId, course: courseId });
      if (isEnrolled) {
        return res
          .status(200)
          .json({ success: true, message: "Already enrolled." });
      }

      await Purchase.create({ user: userId, course: courseId });
      await User.findByIdAndUpdate(userId, {
        $push: { enrolledCourses: courseId },
      });

      res.status(200).json({
        success: true,
        message: "Payment successful and you are enrolled!",
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Payment verification failed." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};