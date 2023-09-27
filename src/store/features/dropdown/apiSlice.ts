import { endpoints } from "@/constants/endpointsleanq_support_coordinator";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

import { Dropdown } from "@/core/interface/dropdown.interfaceleanq_support_coordinator";

import { protectedBaseQuery } from "@/store/baseQuery/protected.baseQueryleanq_support_coordinator";
import { APIBaseResponse } from "@/core/interface/api.responseleanq_support_coordinator";

export const dropdownApi = createApi({
  baseQuery: protectedBaseQuery,
  reducerPath: "dropdownApi",
  endpoints: (build) => ({
    contact: build.query<APIBaseResponse<Dropdown[]>, any>({
      query: () => endpoints.dropdowns.contact,
    }),
    organizationContact: build.query<APIBaseResponse<Dropdown[]>, any>({
      query: () => endpoints.dropdowns.organizationalContact,
    }),
    serviceCoordinators: build.query<APIBaseResponse<Dropdown[]>, any>({
      query: () => endpoints.dropdowns.serviceCoordinators,
    }),
    participants: build.query<APIBaseResponse<Dropdown[]>, any>({
      query: () => endpoints.dropdowns.participants,
    }),
    planServices: build.query<APIBaseResponse<Dropdown[]>, any>({
      query: () => endpoints.dropdowns.planServices,
    }),
    participantPlanService: build.query<APIBaseResponse<Dropdown[]>, { participant: number | string }>({
      query: (args) => {
        const { participant } = args
        return {
          url: endpoints.dropdowns.planServiceByParticipant,
          params: { participant }
        }
      }
    })
  })
})

export const {
  useOrganizationContactQuery,
  useContactQuery,
  usePlanServicesQuery,
  useServiceCoordinatorsQuery,
  useParticipantsQuery,
  useParticipantPlanServiceQuery
} = dropdownApi;