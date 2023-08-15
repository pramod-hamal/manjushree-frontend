import {
  baseUrl,
  endpoints,
} from "@/constants/endpointsleanq_support_coordinator";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: baseUrl, headers: {} });

export const contactApi = createApi({
  baseQuery,
  reducerPath: "contactApi",
  endpoints: (build) => ({
    // Individual
    /**
     * Get Individual Contact List
     * @param {any} {query:(
     * @returns {any}
     */
    individualContactList: build.query<any, string>({
      query: () => endpoints.contact.individual.all,
    }),
    /**
     * Add Individual Contact
     * @param {any} {query:(contactData
     * @returns {any}
     */
    addIndividualContact: build.mutation<any, any>({
      query: (contactData) => ({
        url: endpoints.contact.individual.add,
        method: "POST",
        body: contactData,
      }),
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
  useIndividualContactListQuery,
  useAddIndividualContactMutation,
  useUpdateIndividualContactMutation,
  // Organizational
  useOrganizationalContactListQuery,
  useAddOrganizationalContactMutation,
  useUpdateOrganizationalContactMutation,
} = contactApi;
