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

export const contactApi = createApi({
  baseQuery,
  keepUnusedDataFor: 30,
  reducerPath: "contactApi",
  tagTypes: ["Individual", "Organizational", "Detail"],
  endpoints: (build) => ({
    addIndividualContact: build.mutation<any, any>({
      query: (contactData) => ({
        url: endpoints.contact.individual.add,
        method: "POST",
        body: contactData,
      }),
      invalidatesTags: ["Individual"],
    }),
    individualContactList: build.query<any, string>({
      query: () => endpoints.contact.individual.all,
      providesTags: ["Individual"],
      keepUnusedDataFor: 5,
    }),
    updateIndividualContact: build.mutation<any, any>({
      query: (toUpdateContactData: any) => ({
        url: endpoints.contact.individual.update(toUpdateContactData.id),
        method: "POST",
        body: toUpdateContactData,
      }),
      invalidatesTags: ["Individual", "Detail"],
    }),
    organizationalContactList: build.query<any, string>({
      query: () => endpoints.contact.organizational.all,
      providesTags: ["Organizational"],
      keepUnusedDataFor: 5,
    }),
    getContactbyId: build.query<any, any>({
      query: (id: string | number) => endpoints.contact.getById(id),
      providesTags: ["Detail"],
      keepUnusedDataFor: 5,
    }),
    addOrganizationalContact: build.mutation<any, any>({
      query: (contactData) => ({
        url: endpoints.contact.organizational.add,
        method: "POST",
        body: contactData,
      }),
      invalidatesTags: ["Organizational"],
    }),
    updateOrganizationalContact: build.mutation<any, any>({
      query: (toUpdateContactData: any) => ({
        url: endpoints.contact.organizational.update(toUpdateContactData.id),
        method: "PUT",
        body: toUpdateContactData,
      }),
      invalidatesTags: ["Organizational", "Detail"],
    }),
  }),
});

export const {
  // Individual
  useGetContactbyIdQuery,
  useIndividualContactListQuery,
  useAddIndividualContactMutation,
  useUpdateIndividualContactMutation,
  // Organizational
  useOrganizationalContactListQuery,
  useAddOrganizationalContactMutation,
  useUpdateOrganizationalContactMutation,
} = contactApi;
