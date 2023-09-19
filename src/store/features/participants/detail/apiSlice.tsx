import { endpoints } from "@/constants/endpointsleanq_support_coordinator";
import { createApi } from "@reduxjs/toolkit/query/react";
import { protectedBaseQuery } from "@/store/baseQuery/protected.baseQueryleanq_support_coordinator";

export const participantDetailApi = createApi({
  baseQuery: protectedBaseQuery,
  reducerPath: "participantDetailApi",
  tagTypes: ["Participant", "Detail"],
  endpoints: (build) => ({
    getUserById: build.query<any, any>({
      query: (id) => endpoints.participants.getById(id),
      keepUnusedDataFor: 0,
      providesTags: ["Detail"],
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
      invalidatesTags: ["Detail"],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useDeleteReferenceMutation,
  useUpdateProfileMutation,
} = participantDetailApi;
