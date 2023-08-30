import { protectedBaseQuery } from "@/store/baseQuery/protected.baseQueryleanq_support_coordinator";
import { createApi } from "@reduxjs/toolkit/dist/query";

const planDocumentApiSlice = createApi({
  baseQuery:protectedBaseQuery,
  reducerPath:"planDocumentApi",
  endpoints:(build)=>({})
});