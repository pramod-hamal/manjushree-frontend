import { protectedBaseQuery } from "@/store/baseQuery/protected.baseQueryleanq_support_coordinator";
import { createApi } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  baseQuery: protectedBaseQuery,
  reducerPath: "",
  endpoints: (build) => ({}),
});

export const {} = usersApi;
