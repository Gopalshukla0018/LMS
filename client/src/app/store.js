import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import rootReducer from "./rootReducer";
import { authApi } from "../features/api/authApi";
import { courseApi } from "@/features/api/courseApi";

import paymentApi from "@/features/api/paymentApi";
import { courseProgressApi } from "@/features/api/courseProgressApi";
import { adminApi } from "@/features/api/adminApi";
import { superAdminApi } from "@/features/api/superAdminApi";
export const store = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(
      authApi.middleware,
      courseApi.middleware,
      paymentApi.middleware,
      courseProgressApi.middleware,
      adminApi.middleware,
      superAdminApi.middleware
    ),
});

const initializeApp = async () => {
  await store.dispatch(
    authApi.endpoints.loardUser.initiate({}, { forceRefetch: true })
  );
};

initializeApp();
