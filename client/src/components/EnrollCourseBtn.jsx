import React from "react";
import { Button } from "./ui/button";
import {
  useCreatePaymentOrderMutation,
  useGetCourseDetailWithPurchaseStatusQuery,
  useVerifyPaymentMutation,
} from "@/features/api/paymentApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

const EnrollCourseBtn = ({ courseId }) => {
  const { data: courseData, isLoading: isFetchingStatus } =
    useGetCourseDetailWithPurchaseStatusQuery(courseId, { skip: !courseId });
  const [createPaymentOrder, { isLoading: isCreatingOrder }] =
    useCreatePaymentOrderMutation();
  const [verifyPayment, { isLoading: isVerifying }] =
    useVerifyPaymentMutation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const isPurchased = courseData?.purchased;

  const handleEnroll = async () => {
    // if (!user) {
    //   toast("Please login to enroll in this course.");
    //   navigate("/login");
    //   return;
    // }
  
    if (isPurchased) {
      navigate(`/my-learning/${courseId}`); // Fixed navigation path
      return;
    }
    if (!courseId) {
      toast.error("Course ID not found.");
      return;
    }

    try {
      const orderData = await createPaymentOrder({ courseId }).unwrap();
      const { payment_session_id, order_id } = orderData;

      if (!payment_session_id) {
        toast.error("Could not initiate the payment session.");
        return;
      }

      // Ensure Cashfree SDK is loaded
      if (!window.Cashfree) {
        toast.error("Cashfree SDK not loaded. Please try again.");
        console.error("Cashfree SDK not available");
        return;
      }
      const cashfree = new window.Cashfree({ mode: "sandbox" }); // Use window.Cashfree

      // Trigger popup checkout
      await cashfree.checkout({
        paymentSessionId: payment_session_id,
        redirectTarget: "_modal",
      });

      toast.info("Verifying your enrollment...");
      const verificationData = await verifyPayment({
        orderId: order_id,
        courseId,
      }).unwrap();

      if (verificationData.success) {
        toast.success("Enrollment successful! Redirecting...");
        navigate(`/my-learning/${courseId}`);
      } else {
        toast.error("Payment not confirmed. Please try again.");
      }
    } catch (error) {
      toast.error(
        error.data?.message || "An error occurred during enrollment."
      );
      console.error("Enrollment error:", error);
    }
  };

  if (isFetchingStatus) {
    return (
      <Button disabled className="bg-gray-500 hover:bg-gray-600">
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        Loading...
      </Button>
    );
  }

  return (
    <Button
      onClick={handleEnroll}
      disabled={isCreatingOrder || isVerifying}
      variant={isPurchased ? "secondary" : "default"}
      className={
        isPurchased
          ? "bg-green-600 hover:bg-green-700"
          : "bg-blue-600 hover:bg-blue-700"
      }
    >
      {isCreatingOrder ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Initiating...
        </>
      ) : isVerifying ? (
        "Verifying..."
      ) : isPurchased ? (
        "Continue Course"
      ) : (
        "Enroll Now"
      )}
    </Button>
  );
};

export default EnrollCourseBtn;
