import { baseUrl } from "@/constants/endpointsleanq_support_coordinator";
import { prepareAuthHeader } from "@/lib/getHeadersleanq_support_coordinator";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: prepareAuthHeader,
});

export const usersApi = createApi({
  baseQuery,
  reducerPath: "",
  endpoints: (build) => ({}),
});

export const {} = usersApi;
