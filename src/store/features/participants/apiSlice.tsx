import {
  baseUrl,
  endpoints,
} from "@/constants/endpointsleanq_support_coordinator";
import { getHeader } from "@/lib/getHeadersleanq_support_coordinator";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ParticipantAddDTO } from "./interface/addPrticipantDTO";

const baseQuery = fetchBaseQuery({ baseUrl: baseUrl, headers: getHeader() });

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
      query: () => endpoints.participants.all,
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
