// Service code is correct.

import { Cashfree } from "cashfree-pg";
import dotenv from "dotenv";
dotenv.config();

const cf = new Cashfree(
  Cashfree.SANDBOX,
  process.env.CASHFREE_CLIENT_ID,
  process.env.CASHFREE_CLIENT_SECRET
);

const createCashfreeOrder = async (orderDetails) => {
  const { amount, currency, user, orderId } = orderDetails;

  const request = {
    order_id: orderId,
   
    order_amount: amount,
    order_currency: currency,
    customer_details: {
      customer_id: user._id.toString(),
      customer_email: user.email,
      customer_phone: user.phone || "9999999999",
      customer_name: user.name,
    },
    order_meta: {
    return_url: `http://localhost:5173/payment-return?order_id={order_id}`,  // Update to production URL
    },
  };

  try {
    const response = await cf.PGCreateOrder(request);
    return response.data;
  } catch (error) {
    console.error("Cashfree order creation failed:", error.response?.data?.message || error.message || error);
    throw new Error("Failed to create a payment order with Cashfree.");
  }
};

const verifyCashfreePayment = async (orderId) => {
  try {
    const response = await cf.PGFetchOrder(orderId);
    return response.data && response.data.order_status === "PAID";
  } catch (error) {
    console.error("Cashfree payment verification failed:", error.response?.data?.message || error.message || error);
    throw new Error("Failed to verify payment with Cashfree.");
  }
};

export { createCashfreeOrder, verifyCashfreePayment };