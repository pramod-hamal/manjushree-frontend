import { LoginFormDTO } from "@/app/auth/login/interface/loginFormDTOleanq_support_coordinator";
import {
  endpoints,
} from "@/constants/endpointsleanq_support_coordinator";
import { protectedBaseQuery } from "@/store/baseQuery/protected.baseQueryleanq_support_coordinator";
import { createApi } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  baseQuery: protectedBaseQuery,
  reducerPath: "authApi",
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    signIn: build.mutation<any, any>({
      query: (loginData: LoginFormDTO) => ({
        url: endpoints.auth.signIn,
        method: "POST",
        body: loginData,
        headers:{}
      }),
      invalidatesTags: ["Auth"]
    }),
    getMe: build.query<any, any>({
      query: () => endpoints.auth.geMe
      , providesTags: ["Auth"]
    })
  }),
});

export const { useSignInMutation,useGetMeQuery } = authApi;
