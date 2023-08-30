import { endpoints } from "@/constants/endpointsleanq_support_coordinator";
import { protectedBaseQuery } from "@/store/baseQuery/protected.baseQueryleanq_support_coordinator";
import { createApi } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  baseQuery: protectedBaseQuery,
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
    individualContactList: build.query<any, { limit: number; page: number }>({
      query: (args) => {
        const { limit, page } = args;
        return {
          url: endpoints.contact.individual.all,
          params: { limit, page },
        }
      },
      providesTags: ["Individual"],
    }),
    organizationalContactList: build.query<any, { limit: number; page: number }>({
      query: (args) => {
        const { limit, page } = args;
        return {
          url: endpoints.contact.organizational.all,
          params: { limit, page },
        }
      },
      providesTags: ["Organizational"],
    }),
    updateIndividualContact: build.mutation<any, any>({
      query: (toUpdateContactData: any) => ({
        url: endpoints.contact.individual.update(toUpdateContactData.id),
        method: "POST",
        body: toUpdateContactData,
      }),
      invalidatesTags: ["Individual", "Detail"],
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
