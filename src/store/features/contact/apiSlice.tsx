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
  tagTypes: ["Individual", "Organizational"],
  endpoints: (build) => ({
    /**
     * Add  Contact
     * @param {any} {query:(contactData
     * @returns {any}
     */
    addIndividualContact: build.mutation<any, any>({
      query: (contactData) => ({
        url: endpoints.contact.individual.add,
        method: "POST",
        body: contactData,
      }),
      invalidatesTags: ["Individual"],
    }),
    // Individual
    /**
     * Get Individual Contact List
     * @param {any} {query:(
     * @returns {any}
     */
    individualContactList: build.query<any, string>({
      query: () => endpoints.contact.individual.all,
      providesTags: ["Individual"],
    }),
    /**
     * Update Individual Contact
     * @param {any} {query:(toUpdateContactData
     * @returns {any}
     */
    updateIndividualContact: build.mutation<any, any>({
      query: (toUpdateContactData) => ({
        url: endpoints.contact.individual.add,
        method: "POST",
        body: toUpdateContactData,
      }),
      invalidatesTags: ["Individual"],
    }),
    // Organizational
    /**
     * Get Organizational Contact List
     * @param {any} {query:(
     * @returns {any}
     */
    organizationalContactList: build.query<any, string>({
      query: () => endpoints.contact.individual.all,
    }),
    getContactbyId: build.query<any, any>({
      query: (id: string | number) => endpoints.contact.getById(id),
      providesTags: ["Individual"],
    }),
    /**
     * Add Organizational Contact list
     * @param {any} {query:(contactData
     * @returns {any}
     */
    addOrganizationalContact: build.mutation<any, any>({
      query: (contactData) => ({
        url: endpoints.contact.individual.add,
        method: "POST",
        body: contactData,
      }),
    }),
    /**
     * Update Organizational Contact List
     * @param {any} {query:(toUpdateContactData
     * @returns {any}
     */
    updateOrganizationalContact: build.mutation<any, any>({
      query: (toUpdateContactData) => ({
        url: endpoints.contact.individual.add,
        method: "POST",
        body: toUpdateContactData,
      }),
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
