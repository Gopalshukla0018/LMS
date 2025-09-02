import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import rootReducer from "./rootReducer";
import { authApi } from "../features/api/authApi";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(authApi.middleware),
});

const initializeApp=async()=>{
  await store.dispatch(authApi.endpoints.loardUser.initiate({},{forceRefetch:true}))
}

initializeApp();
