import { endpoints } from "@/constants/endpointsleanq_support_coordinator";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

import { Dropdown } from "@/core/interface/dropdown.interfaceleanq_support_coordinator";

import { protectedBaseQuery } from "@/store/baseQuery/protected.baseQueryleanq_support_coordinator";
import { APIBaseResponse } from "@/core/interface/api.responseleanq_support_coordinator";

export const dropdownApi = createApi({
  baseQuery: protectedBaseQuery,
  reducerPath: "dropdownApi",
  endpoints: (build) => ({
    // all contacts dropdown
    contact: build.query<APIBaseResponse<Dropdown[]>, any>({
      query: () => endpoints.dropdowns.contact,
    }),
    // organization contacts dropdown
    organizationContact: build.query<APIBaseResponse<Dropdown[]>, any>({
      query: () => endpoints.dropdowns.organizationalContact,
    }),
    // service coordinators dropdown
    serviceCoordinators: build.query<APIBaseResponse<Dropdown[]>, any>({
      query: () => endpoints.dropdowns.serviceCoordinators,
    }),
    // all participants dropdown
    participants: build.query<APIBaseResponse<Dropdown[]>, any>({
      query: () => endpoints.dropdowns.participants,
    }),
    // all plan services dropdown
    planServices: build.query<APIBaseResponse<Dropdown[]>, any>({
      query: () => endpoints.dropdowns.planServices,
    }),
    // all plan cervices as per participant
    participantPlanService: build.query<APIBaseResponse<Dropdown[]>, { participant: number | string }>({
      query: (args) => {
        const { participant } = args
        return {
          url: endpoints.dropdowns.planServiceByParticipant,
          params: { participant }
        }
      }
    }),
    // support categories dropdown
    supportCategories: build.query<APIBaseResponse<Dropdown[]>, any>({
      query: () => endpoints.dropdowns.supportCategory
    }),
    // support Group dropdown as per support category
    supportGroup: build.query<APIBaseResponse<Dropdown[]>, any>({
      query: (id: string | number) => endpoints.dropdowns.supportGroup + id
    }),
  })
})

export const {
  useOrganizationContactQuery,
  useContactQuery,
  usePlanServicesQuery,
  useServiceCoordinatorsQuery,
  useParticipantsQuery,
  useParticipantPlanServiceQuery,
  useSupportCategoriesQuery,
  useLazySupportGroupQuery
} = dropdownApi;