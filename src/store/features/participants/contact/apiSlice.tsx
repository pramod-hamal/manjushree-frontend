import { endpoints } from "@/constants/endpointsleanq_support_coordinator";
import { protectedBaseQuery } from "@/store/baseQuery/protected.baseQueryleanq_support_coordinator";
import { createApi } from "@reduxjs/toolkit/query/react";

export const participantDetailContactApi = createApi({
  baseQuery: protectedBaseQuery,
  reducerPath: "participantDetailContactApi",
  tagTypes: ["Participant", "Contact"],
  endpoints: (build) => ({
    getAll: build.query<any, any>({
      query: (id: number | string) => endpoints.participants.contact.getAll(id),
      providesTags: ["Contact"],
    }),
    add: build.mutation<any, any>({
      query: (contactData) => ({
        url: endpoints.participants.contact.add,
        body: contactData,
        method: "POST",
      }),
      invalidatesTags: ["Contact"],
    }),
    deleteContact: build.mutation<any, any>({
      query: (id) => ({
        url: endpoints.participants.contact.delete(id),
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const { useGetAllQuery, useAddMutation, useDeleteContactMutation } =
  participantDetailContactApi;
