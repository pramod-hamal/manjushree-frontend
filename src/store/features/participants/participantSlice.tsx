import { RootState } from "@/store/storeleanq_support_coordinator";
import { createSlice } from "@reduxjs/toolkit";
import {
  APIBaseResponse,
  PaginationMetaDTO,
} from "../auth/interface/api.response";
import { participantsApi } from "./apiSlice";
import {
  ParticipanSliceState,
  Participant,
} from "./interface/participantState";

const initialState: ParticipanSliceState = {
  participants: [],
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

export const participantSlice = createSlice({
  name: "participant Slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      participantsApi.endpoints.allParticipants.matchFulfilled,
      (state, action) => {
        const response: APIBaseResponse<Participant[], PaginationMetaDTO> =
          action.payload;
        if (response.statusCode === 200) {
          state.participants = response.data;
          state.paginationMeta = response.meta ?? state.paginationMeta;
        }
      }
    );
  },
});

export const {} = participantSlice.actions;
export const participantReducer = participantSlice.reducer;
export const participantState = (state: RootState) => state.participant;
