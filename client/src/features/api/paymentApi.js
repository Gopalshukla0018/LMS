import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createPaymentOrder: builder.mutation({
      query: (courseId) => ({
        // Use the new payment route
        url: `/payment/create-order`,
        method: "POST",
        body: { courseId },
      }),
    }),
    verifyPayment: builder.mutation({
      query: (data) => ({
        // Use the new payment route
        url: `/payment/verify-payment`,
        method: "POST",
        body: data, // { orderId, courseId }
      }),
    }),
  }),
});

export const {
  useCreatePaymentOrderMutation,
  useVerifyPaymentMutation,
} = paymentApi;

export default paymentApi;