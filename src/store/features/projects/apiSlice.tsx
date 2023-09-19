import { endpoints } from "@/constants/endpointsleanq_support_coordinator";
import { protectedBaseQuery } from "@/store/baseQuery/protected.baseQueryleanq_support_coordinator";
import { createApi } from "@reduxjs/toolkit/query/react";

export const projectsApi = createApi({
  baseQuery: protectedBaseQuery,
  reducerPath: "projectsApi",
  tagTypes: ["Project", "List"],
  endpoints: (build) => ({
    projectList: build.query<any, { limit: number; page: number,searchText:string }>({
      query: (args) => {
        const { limit, page,searchText } = args;
        return {
          url: endpoints.projects.getAll,
          params: { limit, page ,searchText},
        };
      },
      providesTags: ["List"],
    }),
    addProject: build.mutation<any, any>({
      query: (projectData) => ({
        url: endpoints.projects.add,
        method: "POST",
        body: projectData,
      }),
      invalidatesTags: ["List"],
    }),
    updateProject: build.mutation<any, any>({
      query: (toUpdateProjectData) => ({
        url: endpoints.projects.update,
        method: "POST",
        body: toUpdateProjectData,
      }),
    }),
  }),
});

export const {
  useProjectListQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
} = projectsApi;
