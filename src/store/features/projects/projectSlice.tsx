import { RootState } from "@/store/storeleanq_support_coordinator";
import { createSlice } from "@reduxjs/toolkit";

export interface ProjectState {
  selectedProject?: any | null;
  showTaskDrawer: boolean;
  showProjectDetailDrawer: boolean;
  selectedTask?: any | null;
}

const initialState: ProjectState = {
  selectedProject: null,
  showTaskDrawer: false,
  showProjectDetailDrawer: false,
};

const projectSlice = createSlice({
  name: "ProjectSlice",
  initialState,
  reducers: {
    // select project
    selectProject(state, action) {
      const selectedData = action.payload;
      state.selectedProject = selectedData;
    },
    // clear selected project
    clearSelected(state) {
      state.selectedProject = null;
    },
    // toogle task drawer (open | close)
    toogleTaskDrawer(state, action) {
      state.showTaskDrawer = action.payload;
    },
    // toogle project drawer (open | close)
    toogleProjectDrawer(state, action) {
      state.showProjectDetailDrawer = action.payload;
    },
  },
});

export const {
  selectProject,
  clearSelected,
  toogleTaskDrawer,
  toogleProjectDrawer,
} = projectSlice.actions;

export const projectReducer = projectSlice.reducer;

export const projectData = (state: RootState) => state.projects;
