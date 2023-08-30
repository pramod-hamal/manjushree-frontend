import { createSlice } from "@reduxjs/toolkit";
import {
  APIBaseResponse,
} from "../../../../core/interface/api.response";
import { RootState } from "@/store/storeleanq_support_coordinator";
import { participantDocumentApi } from "./apiSlice";
import { PaginationMetaDTO } from "@/core/interface/pagination.metaleanq_support_coordinator";

export interface ParticipantDocumentSlice {
  documentList: [];
  showModal: boolean;
  paginationMeta: PaginationMetaDTO;
}

const participantHealthInitialState: ParticipantDocumentSlice = {
  documentList: [],
  showModal: false,
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

export const participantDocumentSlice = createSlice({
  name: "participantDocument",
  initialState: participantHealthInitialState,
  reducers: {
    toogleModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Individual
    builder.addMatcher(
      participantDocumentApi.endpoints.getAllDocuments.matchFulfilled,
      (state, action) => {
        const response: APIBaseResponse<any> = action.payload;
        if (response.statusCode === 200) {
          state.documentList = response.data;
          state.paginationMeta = response.data?.meta;
        }
      }
    );
  },
});

export const participantDocumentReducer = participantDocumentSlice.reducer;
export const { toogleModal } = participantDocumentSlice.actions;
export const participantDocumentState = (state: RootState) =>
  state.participantDocument;
