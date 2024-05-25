import { RootState } from "@/store/storeleanq_support_coordinator";
import { createSlice } from "@reduxjs/toolkit";
import { paymentApi } from "./apiSlice";

export interface PaymentState {
  paymentDetail: any;
}

const initialState: PaymentState = {
  paymentDetail: null,
};

const paymentSlice = createSlice({
  name: "paymentSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      paymentApi.endpoints.getById.matchFulfilled,
      (state, action) => {
        const response: any = action.payload;
        if (response.statusCode === 200) {
          state.paymentDetail = response.data;
        }
      }
    );
  },
});

export const {} = paymentSlice.actions;
export const paymentReducer = paymentSlice.reducer;
export const paymentState = (state: RootState) => state.users;
