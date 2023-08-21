import { createSlice } from "@reduxjs/toolkit";
import { contactApi } from "./apiSlice";
import {
  APIBaseResponse,
  PaginationMetaDTO,
} from "../auth/interface/api.response";
import { RootState } from "@/store/storeleanq_support_coordinator";
import { ContactSliceState } from "./interface/contact.interface";

const contactSliceInitialState: ContactSliceState = {
  individialContactList: [],
  individialContactListPagination: {
    limit: 10,
    page_total: 0,
    total: 0,
    total_pages: 0,
    next: null,
    previous: null,
    page: 0,
  },
  organizationalContactList: [],
  organizationalContactListPagination: {
    limit: 10,
    page_total: 0,
    total: 0,
    total_pages: 0,
    next: null,
    previous: null,
    page: 0,
  },
};

export const contactSlice = createSlice({
  name: "contact",
  initialState: contactSliceInitialState,
  reducers: {},
  extraReducers: (builder) => {
    // Individual
    builder.addMatcher(
      contactApi.endpoints.individualContactList.matchFulfilled,
      (state, action) => {
        const response: APIBaseResponse<any, PaginationMetaDTO> =
          action.payload;
        if (response.statusCode === 200) {
          state.individialContactList = response.data;
          state.individialContactListPagination = response.data?.meta;
        }
      }
    );
    // Organizational
    builder.addMatcher(
      contactApi.endpoints.organizationalContactList.matchFulfilled,
      (state, action) => {
        const response: APIBaseResponse<any, PaginationMetaDTO> =
          action.payload;
        if (response.statusCode === 200) {
          state.organizationalContactList = response.data;
          state.organizationalContactListPagination = response.data?.meta;
        }
      }
    );
  },
});

export const contactReducer = contactSlice.reducer;
export const {} = contactSlice.actions;

export const contactState = (state: RootState) => state.contact;
