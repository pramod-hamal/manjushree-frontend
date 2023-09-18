import { endpoints } from "@/constants/endpointsleanq_support_coordinator";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { ParticipantAddDTO } from "./interface/addPrticipantDTO";
import { ParticipantDetail } from "./detail/participantDetailSlice";
import { protectedBaseQuery } from "@/store/baseQuery/protected.baseQueryleanq_support_coordinator";

export const participantsApi = createApi({
  baseQuery: protectedBaseQuery,
  reducerPath: "participantsApi",
  tagTypes: ["Participant", "List"],
  endpoints: (build) => ({
    /**
     * Get All Participants
     * @param {any} {query:(
     * @returns {any}
     */
    allParticipants: build.query<any, { limit: number; page: number,searchText:string }>({
      query: (args) => {
        const { limit, page,searchText } = args;
        return {
          url: endpoints.participants.all,
          params: { limit, page ,searchText},
        };
      },
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
