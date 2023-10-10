import { baseUrl } from "@/constants/endpointsleanq_support_coordinator";
import { prepareAuthHeader } from '@/core/lib/prepareAuthHeaderleanq_support_coordinator';
import { deleteCookie } from 'cookies-next';

import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export const apiQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: prepareAuthHeader,
});

export const protectedBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await apiQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    deleteCookie("token")
    location.replace("/auth/login")
  }
  return result
}