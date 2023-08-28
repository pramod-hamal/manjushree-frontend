import { endpoints } from "@/constants/endpointsleanq_support_coordinator";
import { protectedBaseQuery } from "@/store/baseQuery/protected.baseQueryleanq_support_coordinator";
import { createApi } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  baseQuery: protectedBaseQuery,
  reducerPath: "usersApi",
  tagTypes: ["Users", "List"],
  endpoints: (build) => ({
    getAll: build.query<any, any>({
      query: () => endpoints.users.getAll,
      providesTags: ["List"],
    }),
  }),
});

export const { useGetAllQuery } = usersApi;
