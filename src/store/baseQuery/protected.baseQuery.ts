import { deleteCookie } from 'cookies-next';
import { prepareAuthHeader } from '@/core/lib/prepareAuthHeaderleanq_support_coordinator';
import { baseUrl } from "@/constants/endpointsleanq_support_coordinator";

import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

export const apiQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: prepareAuthHeader,
});

export type protectedBaseQuery = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
>

export const protectedBaseQuery: protectedBaseQuery = async (args, api, extraOptions) => {
  let result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta> = await apiQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    deleteCookie("token")
    location.replace("/auth/login")
  }
  return result
}