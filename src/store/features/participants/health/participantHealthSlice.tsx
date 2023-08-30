import { createSlice } from "@reduxjs/toolkit";
import {
  APIBaseResponse,
} from "../../../../core/interface/api.response";
import { participantHealthApi } from "./apiSlice";
import { RootState } from "@/store/storeleanq_support_coordinator";
import { PaginationMetaDTO } from "@/core/interface/pagination.metaleanq_support_coordinator";

export interface PartticipantHealthSlice {
  healthList: [];
  showModal: boolean;
  paginationMeta: PaginationMetaDTO;
}

const participantHealthInitialState: PartticipantHealthSlice = {
  healthList: [],
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

export const participantHealthSlice = createSlice({
  name: "contact",
  initialState: participantHealthInitialState,
  reducers: {
    toogleModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Individual
    builder.addMatcher(
      participantHealthApi.endpoints.getParticipantHealthList.matchFulfilled,
      (state, action) => {
        const response: APIBaseResponse<any> = action.payload;
        if (response.statusCode === 200) {
          console.log(response.data);
          state.healthList = response.data;
          state.paginationMeta = response.data?.meta;
        }
      }
    );
  },
});

export const participantHealthReducer = participantHealthSlice.reducer;
export const { toogleModal } = participantHealthSlice.actions;
export const participantHealthState = (state: RootState) =>
  state.participantHealth;
