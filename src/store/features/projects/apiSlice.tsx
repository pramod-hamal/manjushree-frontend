import { createApi } from "@reduxjs/toolkit/query/react";

import { protectedBaseQuery } from "@/store/baseQuery/protected.baseQueryleanq_support_coordinator";
import { endpoints } from "@/constants/endpointsleanq_support_coordinator";

export const projectsApi = createApi({
  baseQuery: protectedBaseQuery,
  reducerPath: "projectsApi",
  tagTypes: ["Project", "List", "Detail"],
  endpoints: (build) => ({
    projectList: build.query<any, { limit: number; page: number, searchText: string }>({
      query: (args) => {
        const { limit, page, searchText } = args;
        return { url: endpoints.projects.getAll, params: { limit, page, searchText }, };
      },
      providesTags: ["List"],
    }),
    getById: build.query<any, any>({
      query: (id: string | number) => endpoints.projects.getById + id,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["Detail"]
    }),
    addProject: build.mutation<any, any>({
      query: (projectData) => ({ url: endpoints.projects.add, method: "POST", body: projectData, }),
      invalidatesTags: ["List"]
    }),
    updateProject: build.mutation<any, any>({
      query: (toUpdateProjectData) => ({ url: endpoints.projects.update, method: "POST", body: toUpdateProjectData, }),
      invalidatesTags: ["List"]
    })
  })
});

export const {
  useProjectListQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useGetByIdQuery
} = projectsApi;
