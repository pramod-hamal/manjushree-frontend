import { RootState } from "@/store/storeleanq_support_coordinator";
import { createSlice } from "@reduxjs/toolkit";
import { participantDetailContactApi } from "./apiSlice";
import {
  APIBaseResponse,
  PaginationMetaDTO,
} from "../../auth/interface/api.response";

export interface ContactDetailSlice {
  showModal: boolean;
  contactList: [];
  paginationMeta: PaginationMetaDTO;
}

const initialState: ContactDetailSlice = {
  showModal: false,
  contactList: [],
  paginationMeta: {
    limit: 10,
    page_total: 0,
    total: 0,
    total_pages: 0,
    next: null,
    previous: null,
    page: 0,
  },
};

export const contactDetailSlice = createSlice({
  initialState,
  name: "contactDetail",
  reducers: {
    toogleModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      participantDetailContactApi.endpoints.getAll.matchFulfilled,
      (state, action) => {
        const response: APIBaseResponse<any> = action.payload;
        if (response.statusCode === 200) {
          state.contactList = response.data;
          state.paginationMeta = response.meta ?? state.paginationMeta;
        }
      }
    );
  },
});

export const contactDetailReducer = contactDetailSlice.reducer;

export const { toogleModal } = contactDetailSlice.actions;

export const contactDetailState = (state: RootState) => state.contactDetail;
