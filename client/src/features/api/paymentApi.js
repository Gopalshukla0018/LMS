import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8081/api/v1`,
    // prepareHeaders: (headers, { getState }) => {
    //   const token = getState().auth.token;
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    createPaymentOrder: builder.mutation({
      query: ({ courseId }) => ({  // Destructure here to handle { courseId } call
        url: `/payment/create-order`,
        method: "POST",
        body: { courseId },
      }),
    }),
    verifyPayment: builder.mutation({
      query: (data) => ({
        url: `/payment/verify-payment`,
        method: "POST",
        body: data, // { orderId, courseId }
      }),
    }),
    getCourseDetailWithPurchaseStatus: builder.query({
      query: (courseId) => ({
       url: `/payment/course/${courseId}`,
        method: "GET",
      
      }),
    }),
  }),
});

export const { useCreatePaymentOrderMutation, useVerifyPaymentMutation ,useGetCourseDetailWithPurchaseStatusQuery} =
  paymentApi;

export default paymentApi;