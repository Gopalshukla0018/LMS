import React from "react";
import { Button } from "./ui/button";
// 🔽 Change the import source for the mutation hooks
import {
  useCreatePaymentOrderMutation,
  useVerifyPaymentMutation,
} from "@/features/api/paymentApi"; // Changed from courseApi
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// ... (The rest of the component code remains exactly the same!)
const EnrollCourseBtn = ({ courseId }) => {
  const [createPaymentOrder, { isLoading: isCreatingOrder }] =
    useCreatePaymentOrderMutation();
  const [verifyPayment, { isLoading: isVerifying }] = useVerifyPaymentMutation();
  const navigate = useNavigate();

  const handleEnroll = async () => {
    // No changes here!
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

      const cashfree = new window.cashfree.Cashfree(payment_session_id);

      cashfree.checkout({
        paymentMethod: "card",
        onSuccess: async (data) => {
          if (data.order && data.order.status === "PAID") {
            toast.info("Payment received. Verifying your enrollment...");
            
            try {
              await verifyPayment({
                orderId: data.order.orderId,
                courseId,
              }).unwrap();
              toast.success("Enrollment successful! Redirecting...");
              navigate("/my-learning");
            } catch (verificationError) {
              toast.error(
                verificationError.data?.message ||
                  "Enrollment verification failed."
              );
            }
          }
        },
        onFailure: (data) => {
          toast.error(
            data.order.errorText || "Payment failed. Please try again."
          );
        },
      });
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