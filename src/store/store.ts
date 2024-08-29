import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { useDispatch } from "react-redux";
import sidebarSlice from "./sidebarSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
