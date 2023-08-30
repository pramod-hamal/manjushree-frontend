import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/storeleanq_support_coordinator";
import { GetUserByIDDTO } from "./interface/user.interface";
import { usersApi } from "./apiSlice";
import { APIBaseResponse } from "../../../core/interface/api.response";

export interface UserSliceState {
  userDetail: GetUserByIDDTO | null;
}

const initialState: UserSliceState = {
  userDetail: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      usersApi.endpoints.getById.matchFulfilled,
      (state, action) => {
        const response: APIBaseResponse<GetUserByIDDTO> = action.payload;
        if (response.statusCode === 200) {
          state.userDetail = response.data;
        }
      }
    );
  },
});

export const {} = userSlice.actions;
export const userReducer = userSlice.reducer;
export const userState = (state: RootState) => state.users;
