import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/storeleanq_support_coordinator";
import { GetClassDTO, GetUserByIDDTO } from "./interface/user.interface";
import { classApi } from "./apiSlice";
import { APIBaseResponse } from "../../../core/interface/api.response";

export interface ClassState {
  classDetail: GetClassDTO | null;
}

const initialState: ClassState = {
  classDetail: null,
};

const classSlice = createSlice({
  name: "classSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      classApi.endpoints.getById.matchFulfilled,
      (state, action) => {
        const response: any = action.payload;
        if (response.statusCode === 200) {
          state.classDetail = response.data;
        }
      }
    );
  },
});
 
export const {} = classSlice.actions;
export const classReducer = classSlice.reducer;
export const classState = (state: RootState) => state.users;
