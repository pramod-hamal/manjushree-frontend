import { createApi } from "@reduxjs/toolkit/query/react";
import { protectedBaseQuery } from "@/store/baseQuery/protected.baseQueryleanq_support_coordinator";
import { endpoints } from "@/constants/endpointsleanq_support_coordinator";

export const usersApi = createApi({
  baseQuery: protectedBaseQuery,
  reducerPath: "usersApi",
  tagTypes: ["Users", "List"],
  endpoints: (build) => ({
    getAll: build.query<any, any>({
      query: () => endpoints.users.getAll,
      providesTags: ["List"],
    }),
    add: build.mutation<any, any>({
      query: (userData) => ({
        url: endpoints.users.add,
        body: userData,
        method: "POST",
      }),
      invalidatesTags: ["List"],
    }),
  }),
});

export const { useGetAllQuery, useAddMutation } = usersApi;
