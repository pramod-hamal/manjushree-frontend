import {
  baseUrl,
  endpoints,
} from "@/constants/endpointsleanq_support_coordinator";
import { prepareHeader } from "@/lib/getHeadersleanq_support_coordinator";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HealthConditionInitialState } from "./interface/health-condition.interface";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: prepareHeader,
});

export const participantHealthApi = createApi({
  baseQuery,
  reducerPath: "participantHealthApi",
  tagTypes: ["Participant", "Health"],
  endpoints: (build) => ({
    getParticipantHealthList: build.query<any, any>({
      query: (id) => endpoints.participants.health.getAll(id),
      providesTags: ["Health"],
    }),
    addHealthCondition: build.mutation<HealthConditionInitialState, any>({
      query: (healthCondition) => ({
        url: endpoints.participants.health.add,
        body: healthCondition,
        method: "POST",
      }),
      invalidatesTags: ["Health"],
    }),
  }),
});

export const {
  useGetParticipantHealthListQuery,
  useAddHealthConditionMutation,
} = participantHealthApi;
