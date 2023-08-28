import { createApi } from "@reduxjs/toolkit/query/react";

import { protectedBaseQuery } from "@/store/baseQuery/protected.baseQueryleanq_support_coordinator";

import { endpoints } from "@/constants/endpointsleanq_support_coordinator";

import { APIBaseResponse } from "../../auth/interface/api.response";
import { PlanInterface, PlanResponse } from "./interface/plan.interface";

export const participantPlanApi =createApi({
  baseQuery:protectedBaseQuery,
  reducerPath:"participantPlanApi",
  tagTypes:["Participant","Plan"],
  endpoints:(build)=>({
    participantPlan: build.query<APIBaseResponse<PlanResponse>, any>({
      query: (id: string | number) => endpoints.participants.plan.getPlan(id),
      providesTags:["Plan"],
    }),
    createPlan:build.mutation<APIBaseResponse<any>,any>({
      query:(planData:PlanInterface)=>({
        url:endpoints.participants.plan.create,
        body:planData,
        method:"POST"
      }),
      invalidatesTags:["Plan"]
    })
  })
})

export const {useParticipantPlanQuery,useCreatePlanMutation} = participantPlanApi;