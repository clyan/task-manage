import { RootState } from "store/index";
import { createSlice } from "@reduxjs/toolkit";

interface State {
  projectModalOpen: boolean;
}

const initialState: State = {
  projectModalOpen: false,
};

export const projectListSlice = createSlice({
  name: "projectListSlice",
  initialState,
  reducers: {
    openProjectModal(state) {
      // 内部immer处理了，不可变性，所以可以直接赋值
      state.projectModalOpen = true;
    },
    closeProjectModal(state) {
      state.projectModalOpen = false;
    },
  },
});

export const projectListActions = projectListSlice.actions;

export const selectProjectModalOpen = (state: RootState) =>
  state.projectList.projectModalOpen;
