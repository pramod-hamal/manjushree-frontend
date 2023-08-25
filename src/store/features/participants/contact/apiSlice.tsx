import {
  baseUrl,
  endpoints,
} from "@/constants/endpointsleanq_support_coordinator";
import { prepareHeader } from "@/lib/getHeadersleanq_support_coordinator";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: prepareHeader,
});

export const participantDetailContactApi = createApi({
  baseQuery,
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
