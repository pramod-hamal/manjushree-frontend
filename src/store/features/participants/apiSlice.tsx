import {
  baseUrl,
  endpoints,
} from "@/constants/endpointsleanq_support_coordinator";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ParticipantAddDTO } from "./interface/addPrticipantDTO";
import { ParticipantDetail } from "./detail/participantDetailSlice";
import { prepareAuthHeader } from "@/lib/getHeadersleanq_support_coordinator";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: prepareAuthHeader,
});

export const participantsApi = createApi({
  baseQuery,
  reducerPath: "participantsApi",
  tagTypes: ["Participant", "List"],
  endpoints: (build) => ({
    /**
     * Get All Participants
     * @param {any} {query:(
     * @returns {any}
     */
    allParticipants: build.query<any, string>({
      query: () => endpoints.participants.all,
      providesTags: ["List"],
    }),
    /**
     * Add new Participant
     * @param {any} {query:(participantData
     * @returns {any}
     */
    addParticipant: build.mutation<any, any>({
      query: (participantData: ParticipantAddDTO) => ({
        url: endpoints.participants.add,
        method: "POST",
        body: participantData,
      }),
      invalidatesTags: ["List"],
    }),
    /**
     * Update Participant
     * @param {any} {query:(toUpdateParticipantData
     * @returns {any}
     */
    updateParticipant: build.mutation<any, any>({
      query: (toUpdateParticipantData: ParticipantDetail) => ({
        url: endpoints.participants.update(toUpdateParticipantData.id!),
        method: "PUT",
        body: toUpdateParticipantData,
      }),
      invalidatesTags: ["List"],
    }),
  }),
});

export const {
  useAllParticipantsQuery,
  useAddParticipantMutation,
  useUpdateParticipantMutation,
} = participantsApi;
