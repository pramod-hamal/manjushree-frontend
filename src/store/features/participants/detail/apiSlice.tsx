import {
  baseUrl,
  endpoints,
} from "@/constants/endpointsleanq_support_coordinator";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers, api) => {
    const token: string | null = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", "Bearer " + token);
    }
    return;
  },
});

export const participantDetailApi = createApi({
  baseQuery,
  reducerPath: "participantDetailApi",
  endpoints: (build) => ({
    /**
     * Get participant detail by id
     * @param {any} {query:(id
     * @returns {any}
     */
    getUserById: build.query<any, any>({
      query: (id) => endpoints.participants.getById(id),
    }),
    deleteReference: build.mutation<any, any>({
      query: (id) => ({
        url: endpoints.participants.deleteReference(id),
        method: "DELETE",
      }),
    }),
    updateProfile: build.mutation<any, any>({
      query: (updateData) => ({
        url: endpoints.participants.update(updateData.id),
        method: "PUT",
        body: updateData,
      }),
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useDeleteReferenceMutation,
  useUpdateProfileMutation,
} = participantDetailApi;
