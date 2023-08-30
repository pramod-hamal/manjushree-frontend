import { baseUrl } from "@/constants/endpointsleanq_support_coordinator";
import { prepareAuthHeader } from "@/core/lib/getHeadersleanq_support_coordinator";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

 export const protectedBaseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: prepareAuthHeader,
});
