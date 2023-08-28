import { createApi } from "@reduxjs/toolkit/query/react";

import { protectedBaseQuery } from "@/store/baseQuery/protected.baseQueryleanq_support_coordinator";

import { endpoints } from "@/constants/endpointsleanq_support_coordinator";

import { APIBaseResponse } from "../../auth/interface/api.response";
import { PlanInterface, PlanResponse } from "./interface/plan.response";

export const participantPlanApi =createApi({
  baseQuery:protectedBaseQuery,
  reducerPath:"participantPlanApi",
  endpoints:(build)=>({
    participantPlan: build.query<APIBaseResponse<PlanResponse, null>, any>({
      query: (id: string | number) => endpoints.participants.plan.getPlan(id),
    }),
    createPlan:build.mutation<APIBaseResponse<any,null>,any>({
      query:(planData:PlanInterface)=>({
        url:"",
        body:planData,
        method:"POST"
      })
    })
  })
})

export const {useParticipantPlanQuery,useCreatePlanMutation} = participantPlanApi