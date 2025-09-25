import { Cashfree } from "cashfree-pg";
import dotenv from "dotenv";

dotenv.config();

// Initialize Cashfree with your credentials from .env
Cashfree.XClientId = process.env.CASHFREE_CLIENT_ID;
Cashfree.XClientSecret = process.env.CASHFREE_CLIENT_SECRET;
Cashfree.XEnvironment = "sandbox";// Use SANDBOX for testing

/**
 * @description Creates a payment order with Cashfree
 * @param {object} orderDetails - Details of the order (amount, currency, user, etc.)
 * @returns {Promise<object>} - The payment session data from Cashfree
 */
const createCashfreeOrder = async (orderDetails) => {
  const { amount, currency, user, orderId } = orderDetails;

  const request = {
    order_amount: amount,
    order_currency: currency,
    order_id: orderId,
    customer_details: {
      customer_id: user._id.toString(),
      customer_email: user.email,
      customer_phone: user.phone || "9999999999", 
      customer_name: user.name,
    },
  };

  try {
    const response = await Cashfree.PG.Orders.CreateOrder(request);
    return response.data; // Return the payment session details
  } catch (error) {
    console.error("Cashfree order creation failed:", error);
    throw new Error("Failed to create a payment order with Cashfree.");
  }
};


const verifyCashfreePayment = async (orderId) => {
  try {
    const response = await Cashfree.PG.Orders.GetOrder(orderId);
    return response.data && response.data.order_status === "PAID";
  } catch (error) {
    console.error("Cashfree payment verification failed:", error);
    throw new Error("Failed to verify payment with Cashfree.");
  }
};


export { createCashfreeOrder, verifyCashfreePayment };