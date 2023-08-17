import {
  baseUrl,
  endpoints,
} from "@/constants/endpointsleanq_support_coordinator";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: baseUrl, headers: {} });

export const participantsApi = createApi({
  baseQuery,
  reducerPath: "participantsApi",
  endpoints: (build) => ({
    /**
     * Get All Participants
     * @param {any} {query:(
     * @returns {any}
     */
    allParticipants: build.query<any, string>({
      query: ({ limit }: any) => endpoints.participants.all(limit),
    }),
    /**
     * Add new Participant
     * @param {any} {query:(participantData
     * @returns {any}
     */
    addParticipant: build.mutation<any, any>({
      query: (participantData) => ({
        url: endpoints.participants.add,
        method: "POST",
        body: participantData,
      }),
    }),
    /**
     * Update Participant
     * @param {any} {query:(toUpdateParticipantData
     * @returns {any}
     */
    updateParticipant: build.mutation<any, any>({
      query: (toUpdateParticipantData) => ({
        url: endpoints.participants.update,
        method: "POST",
        body: toUpdateParticipantData,
      }),
    }),
  }),
});

export const {
  useAllParticipantsQuery,
  useAddParticipantMutation,
  useUpdateParticipantMutation,
} = participantsApi;
