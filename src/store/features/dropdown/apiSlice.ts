import { endpoints } from "@/constants/endpointsleanq_support_coordinator";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { Dropdown } from "./dropdownSlice";
import { protectedBaseQuery } from "@/store/baseQuery/protected.baseQueryleanq_support_coordinator";

export const dropdownApi = createApi({
  baseQuery:protectedBaseQuery,
  reducerPath:"dropdownApi",
  endpoints:(build)=>({
    organizationContact:build.query<Dropdown[],any>({
      query:()=>endpoints.dropdowns.organizationalContact,
    })
  })
})

export const {useOrganizationContactQuery} = dropdownApi;