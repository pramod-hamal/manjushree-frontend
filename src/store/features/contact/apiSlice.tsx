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
    }),
    updateIndividualContact: build.mutation<any, any>({
      query: (toUpdateContactData: any) => ({
        url: endpoints.contact.individual.update(toUpdateContactData.id),
        method: "POST",
        body: toUpdateContactData,
      }),
      invalidatesTags: ["Individual"],
    }),
    organizationalContactList: build.query<any, string>({
      query: () => endpoints.contact.organizational.all,
      providesTags: ["Organizational"],
    }),
    getContactbyId: build.query<any, any>({
      query: (id: string | number) => endpoints.contact.getById(id),
      providesTags: ["Detail"],
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
      invalidatesTags: ["Organizational"],
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
