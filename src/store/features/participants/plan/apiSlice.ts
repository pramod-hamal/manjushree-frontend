import { createApi } from "@reduxjs/toolkit/query/react";

import { protectedBaseQuery } from "@/store/baseQuery/protected.baseQueryleanq_support_coordinator";

import { endpoints } from "@/constants/endpointsleanq_support_coordinator";

import { APIBaseResponse } from "../../../../core/interface/api.response";
import { PlanInterface, PlanResponse } from "./interface/plan.interface";

export const participantPlanApi =createApi({
  baseQuery:protectedBaseQuery,
  reducerPath:"participantPlanApi",
  tagTypes:["Participant","Plan","PlanDocuments","PlanServices","ChargeItems"],
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
    }),
    getAllDocuments:build.query<any,{plan:number|string}>({
      query:(args)=>{
        const {plan} = args
        return {
          url:endpoints.participants.plan.document.getAll,
          params:{plan}
        }
      },
      providesTags:["PlanDocuments"],
    }),
    addPlanDocument:build.mutation<any,any>({
      query:(documentData)=>({
        url:endpoints.participants.plan.document.create,
        body:documentData,
        method:"POST"
      }),
      invalidatesTags:["PlanDocuments"]
    }),
    getPlanServices: build.query<any, { limit: number; page: number }>({
   query: (args) => {
        const { limit, page } = args;
        return {
          url: endpoints.participants.plan.services.getAll,
          params: { limit, page },
        };
      },
      providesTags: ["PlanServices"]
    }),
    addPlanService:build.mutation<any,any>({
      query:(planServiceData)=>({
        url:endpoints.participants.plan.services.add,
        body: planServiceData,
        method:"POST"
      }),
      invalidatesTags: ["PlanServices"]
    }),
    getChargeItems: build.query<any, any>({
      query: () => {
        return {
          url: endpoints.chargeItems.all,
        };
      },
      providesTags: ["ChargeItems"]
    })
  })
})

export const {
  useParticipantPlanQuery,useCreatePlanMutation,
  useGetAllDocumentsQuery,useAddPlanDocumentMutation,
  useGetPlanServicesQuery,useGetChargeItemsQuery,
  useAddPlanServiceMutation
} = participantPlanApi;