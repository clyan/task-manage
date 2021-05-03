import { authSlice } from "./auth.slice";
import { configureStore } from "@reduxjs/toolkit";
import { projectListSlice } from "screens/project-list/project-list.slice";

export const rootReducer = {
  projectList: projectListSlice.reducer,
  auth: authSlice.reducer,
};
export const store = configureStore({
  reducer: rootReducer,
});
export type AppDispatch = typeof store.dispatch;

// ReturnType ts内置utility, 返回函数的返回类型， getState返回的是整个State的类型。
export type RootState = ReturnType<typeof store.getState>;
