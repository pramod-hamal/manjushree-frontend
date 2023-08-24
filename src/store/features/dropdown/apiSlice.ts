import { baseUrl, endpoints } from "@/constants/endpointsleanq_support_coordinator";
import { prepareHeader } from "@/lib/getHeadersleanq_support_coordinator";
import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Dropdown } from "./dropdownSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: prepareHeader,
});

export const dropdownApi = createApi({
  baseQuery,
  reducerPath:"dropdownApi",
  endpoints:(build)=>({
    organizationContact:build.query<Dropdown[],any>({
      query:()=>endpoints.dropdowns.organizationalContact
    })
  })
})

export const {useOrganizationContactQuery} = dropdownApi;