import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import rootReducer from "./rootReducer";
import { authApi } from "../features/api/authApi";
import { courseApi } from "@/features/api/courseApi";

import paymentApi from "@/features/api/paymentApi";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(authApi.middleware,courseApi.middleware, paymentApi.middleware),
});

const initializeApp=async()=>{
  await store.dispatch(authApi.endpoints.loardUser.initiate({},{forceRefetch:true}))
}

initializeApp();
