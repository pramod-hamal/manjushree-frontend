import { createSlice } from "@reduxjs/toolkit";
import { contactApi } from "./apiSlice";
import { APIBaseResponse } from "../auth/interface/api.response";
import { RootState } from "@/store/storeleanq_support_coordinator";

export interface ContactSliceState {
  individialContactList: [];
}

const contactSliceInitialState: ContactSliceState = {
  individialContactList: [],
};

export const contactSlice = createSlice({
  name: "contact",
  initialState: contactSliceInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      contactApi.endpoints.individualContactList.matchFulfilled,
      (state, action) => {
        const response: APIBaseResponse<any, null> = action.payload;
        if (response.statusCode === 200) {
          state.individialContactList = response.data;
        }
      }
    );
  },
});

export const contactReducer = contactSlice.reducer;
export const {} = contactSlice.actions;

export const contactState = (state: RootState) => state.contact;
