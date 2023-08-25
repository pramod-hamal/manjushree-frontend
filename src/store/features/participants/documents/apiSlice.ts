import { baseUrl, endpoints } from "@/constants/endpointsleanq_support_coordinator";
import { prepareAuthHeader } from "@/lib/getHeadersleanq_support_coordinator";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl, 
  prepareHeaders: prepareAuthHeader
});

export const participantDocumentApi = createApi({
  baseQuery,
  reducerPath:"participantDocumentApi",
  tagTypes:["Participant","Document"],
  endpoints:(build)=>({
    getAllDocuments:build.query<any,any>({
      query:(id:number|string)=> endpoints.participants.documents.getAll(id),
      providesTags:["Document"]
    }),
    addNewDocument:build.mutation<any,any>({
      query:(documentFormData)=>({
        url:endpoints.participants.documents.add,
        body:documentFormData,
        method: "POST",
      }),
      invalidatesTags: ["Document"],
    }),
    deleteDocument:build.mutation<any,any>({
      query:(id)=>({
        url:endpoints.participants.documents.delete(id),
        method:"DELETE",
      }),
      invalidatesTags:["Document"]
    })
  })
})

export const {useGetAllDocumentsQuery,useAddNewDocumentMutation,useDeleteDocumentMutation} = participantDocumentApi;