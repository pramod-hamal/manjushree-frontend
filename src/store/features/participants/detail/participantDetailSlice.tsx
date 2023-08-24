import { RootState } from "@/store/storeleanq_support_coordinator";
import { createSlice } from "@reduxjs/toolkit";
import { participantDetailApi } from "./apiSlice";
import { APIBaseResponse } from "../../auth/interface/api.response";
import { ReferenceNo } from "../interface/addPrticipantDTO";

export interface ParticipantDetailSlice {
  participantDetail: ParticipantDetail | null;
  disabled: boolean;
}

export interface ParticipantDetail {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  preferredLanguage: string;
  pronouns: string;
  primaryCoordinator?: null;
  ndisNumber: number;
  referenceNo?: ReferenceNo[];
}

const initialState: ParticipantDetailSlice = {
  participantDetail: null,
  disabled: true,
};

export const participantDetailSlice = createSlice({
  name: "participant Slice",
  initialState,
  reducers: {
    toogleEdit(state, action) {
      state.disabled = action.payload;
    },
    setParticipant(state, action) {
      state.participantDetail = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      participantDetailApi.endpoints.getUserById.matchFulfilled,
      (state, action) => {
        const response: APIBaseResponse<ParticipantDetail, null> =
          action.payload;
        if (response.statusCode === 200) {
          state.participantDetail = response.data;
        }
      }
    );
  },
});

export const participantDetailReducer = participantDetailSlice.reducer;

export const { toogleEdit,setParticipant } = participantDetailSlice.actions;

export const participantDetailState = (state: RootState) =>
  state.participantDetail;
