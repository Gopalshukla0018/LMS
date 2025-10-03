import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const SUPERADMIN_API = `${import.meta.env.VITE_BACKEND_URL}/api/v1/superadmin`;

export const superAdminApi = createApi({
  reducerPath: "superAdminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: SUPERADMIN_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getSuperAdminDashboardData: builder.query({
      query: () => ({
        url: "/superadmin-dashboard",
        method: "GET",
      }),
    }),
  }),
});
export const { useGetSuperAdminDashboardDataQuery } = superAdminApi;
