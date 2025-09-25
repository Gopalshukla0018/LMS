import { Course } from "../../model/course.model.js";
import { User } from "../../model/user.model.js";
import { PurchasedCourse } from "../../model/purchaseCourse.model.js";
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


    const isEnrolled = await PurchasedCourse.findOne({ userId, courseId });
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

    res.status(200).json(paymentResponse);
  } catch (error) {
    console.error("Error creating order:", error); 
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { orderId, courseId } = req.body;
    const userId = req.user._id;

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

     
      await PurchasedCourse.create({
        userId,
        courseId,
        amount: course.coursePrice,
        order_id: orderId,
        payment_status: "success",
      });

      // Update the user's enrolled courses list
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
    console.error("Error verifying payment:", error); 
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};