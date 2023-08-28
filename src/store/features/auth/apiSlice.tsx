import { LoginFormDTO } from "@/app/auth/login/interface/loginFormDTOleanq_support_coordinator";
import {
  baseUrl,
  endpoints,
} from "@/constants/endpointsleanq_support_coordinator";
import { prepareSubDomainHeader } from "@/lib/getHeadersleanq_support_coordinator";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers: Headers) => {
    prepareSubDomainHeader(headers);
  },
});

export const authApi = createApi({
  baseQuery,
  reducerPath: "authApi",
  endpoints: (build) => ({
    signIn: build.mutation<any, any>({
      query: (loginData: LoginFormDTO) => ({
        url: endpoints.auth.signIn,
        method: "POST",
        body: loginData,
      }),
    }),
    getMe: build.query({
      query: () => ({
        url: endpoints.auth.geMe,
      }),
    }),
  }),
});

export const { useSignInMutation } = authApi;
