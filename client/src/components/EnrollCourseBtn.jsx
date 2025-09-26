import React from "react";
import { Button } from "./ui/button";
import {
  useCreatePaymentOrderMutation,
  useVerifyPaymentMutation,
} from "@/features/api/paymentApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const EnrollCourseBtn = ({ courseId }) => {
  const [createPaymentOrder, { isLoading: isCreatingOrder }] =
    useCreatePaymentOrderMutation();
  const [verifyPayment, { isLoading: isVerifying }] = useVerifyPaymentMutation();
  const navigate = useNavigate();

  const handleEnroll = async () => {
    if (!courseId) {
      toast.error("Course ID not found.");
      return;
    }

    try {
      const orderData = await createPaymentOrder(courseId).unwrap();
      const { payment_session_id, order_id } = orderData;

      if (!payment_session_id) {
        toast.error("Could not initiate the payment session.");
        return;
      }

      // Current v3+ init (assumes script loaded globally)
      const cashfree = Cashfree({ mode: "sandbox" });  // Swap to "production" later

      // Trigger popup checkout
      await cashfree.checkout({
        paymentSessionId: payment_session_id,  // Note: key is paymentSessionId (camelCase)
        redirectTarget: "_modal"  // Opens as popup; use "_self" for redirect
      });

      // After modal closes, verify (user may have paid or cancelled)
      toast.info("Verifying your enrollment...");
      const verificationData = await verifyPayment({
        orderId: order_id,  // Use order_id from response
        courseId,
      }).unwrap();

      if (verificationData.success) {
        toast.success("Enrollment successful! Redirecting...");
        navigate("/my-learning");
      } else {
        toast.error("Payment not confirmed. Please try again.");
      }
    } catch (error) {
      toast.error(error.data?.message || "An error occurred during enrollment.");
      console.error("Enrollment error:", error);
    }
  };

  return (
    <Button onClick={handleEnroll} disabled={isCreatingOrder || isVerifying}>
      {isCreatingOrder
        ? "Initiating..."
        : isVerifying
        ? "Verifying..."
        : "Enroll Now"}
    </Button>
  );
};

export default EnrollCourseBtn;