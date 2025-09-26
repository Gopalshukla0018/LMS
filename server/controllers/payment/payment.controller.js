// Controller code with minor fixes if needed, but mostly correct.
// Noting the webhook rawBody handling.

import { Course } from "../../model/course.model.js";
import { User } from "../../model/user.model.js";
import { Purchase } from "../../model/purchaseCourse.model.js";
import { lecture as Lecture } from "../../model/lecture.model.js"; // Alias to match case
import {
  createCashfreeOrder,
  verifyCashfreePayment,
} from "../../services/payment/cashfree.js";
import crypto from 'crypto'; 

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

    // Only block if payment_status is success
    const isEnrolled = await Purchase.findOne({ user: userId, course: courseId, payment_status: "success" });
    if (isEnrolled) {
      return res
        .status(400)
        .json({ message: "You are already enrolled in this course" });
    }

    const orderId = `order_${Date.now()}`;

    // Create or update pending purchase record
    let purchase = await Purchase.findOne({ user: userId, course: courseId, payment_status: "pending" });
    if (purchase) {
      // Update existing pending purchase with new orderId
      purchase.order_id = orderId;
      purchase.amount = course.coursePrice;
      await purchase.save();
    } else {
      // Create new pending purchase
      purchase = await Purchase.create({
        user: userId,
                                       
        course: courseId,
        amount: course.coursePrice,
        order_id: orderId,
        payment_status: "pending",
      });
    }

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
      message: error.message || "An unexpected error occurred while creating the order.",
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
      const purchase = await Purchase.findOne({ order_id: orderId });
      if (!purchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }

      if (purchase.payment_status === 'success') {
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

      // Update purchase status
      purchase.payment_status = "success";
      await purchase.save();

      // Enroll user
      await User.findByIdAndUpdate(userId, {
        $addToSet: { enrolledCourses: courseId },
      });

      // Add user to course's enrolledStudents
      await Course.findByIdAndUpdate(courseId, {
        $addToSet: { enrolledStudents: userId },
      });

      // Make lectures visible
      if (course.lectures && course.lectures.length > 0) {
        await Lecture.updateMany(
          { _id: { $in: course.lectures } },
          { $set: { isPreview: true } } 
        );
      }

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

export const cashfreeWebhook = async (req, res) => {
  try {
    const timestamp = req.headers['x-webhook-timestamp'];
    const signature = req.headers['x-webhook-signature'];
    const rawBody = req.body.toString('utf8'); // Assuming body-parser.raw, req.body is Buffer

    if (!timestamp || !signature) {
      return res.status(400).send('Missing webhook headers');
    }

    // Verify signature
    const signedPayload = timestamp + '.' + rawBody;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.CASHFREE_WEBHOOK_SECRET) // Use a specific env for webhook secret
      .update(signedPayload)
      .digest('base64');

    if (expectedSignature !== signature) {
      return res.status(401).send('Invalid signature');
    }

    // Process payload
    const payload = JSON.parse(rawBody);
    const { data, type } = payload;
    if (type === 'PAYMENT_SUCCESS_WEBHOOK' && data.payment.payment_status === 'SUCCESS') {
      const orderId = data.order.order_id;
      const purchase = await Purchase.findOne({ order_id: orderId }).populate('course');
      if (!purchase || purchase.payment_status === 'success') {
        return res.status(200).send('OK'); // Idempotent handling
      }

      const course = purchase.course;
      const userId = purchase.user;

      purchase.payment_status = 'success';
      await purchase.save();

      await User.findByIdAndUpdate(userId, {
        $addToSet: { enrolledCourses: course._id },
      });

      await Course.findByIdAndUpdate(course._id, {
        $addToSet: { enrolledStudents: userId },
      });

      // Update lectures
      if (course.lectures && course.lectures.length > 0) {
        await Lecture.updateMany(
          { _id: { $in: course.lectures } },
          { $set: { isPreview: true } }
        );
      }
    }

    return res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).send('Error processing webhook');
  }
};

export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    const purchased = await Purchase.findOne({ user: userId, course: courseId, payment_status: 'success' });

    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    return res.status(200).json({
      course,
      purchased: !!purchased,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

export const getAllPurchasedCourse = async (req, res) => {
  try {
    const purchasedCourses = await Purchase.find({
      payment_status: "success",
    }).populate("course");

    return res.status(200).json({
      purchasedCourses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};