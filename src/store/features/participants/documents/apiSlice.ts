import { baseUrl, endpoints } from "@/constants/endpointsleanq_support_coordinator";
import { prepareHeader } from "@/lib/getHeadersleanq_support_coordinator";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: prepareHeader,
});

export const participantDocumentApi = createApi({
  baseQuery,
  reducerPath:"participantDocumentApi",
  tagTypes:["Participant","Document"],
  endpoints:(build)=>({
    getAllDocuments:build.query<any,any>({
      query:(id:number|string)=> endpoints.participants.documents.getAll(id),
      providesTags:["Document"]
    })
  })
})

export const {useGetAllDocumentsQuery} = participantDocumentApi;