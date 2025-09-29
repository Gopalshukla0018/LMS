import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ADMIN_API = "http://localhost:8081/api/v1/admin";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: ADMIN_API,
    credentials: "include",
  }), 
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => "dashboard",
      providesTags: ["AdminDashboard"],
    }),
  }),
});

export const { useGetDashboardDataQuery } = adminApi;