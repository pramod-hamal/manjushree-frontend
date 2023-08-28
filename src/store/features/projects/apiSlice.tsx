import { endpoints } from "@/constants/endpointsleanq_support_coordinator";
import { protectedBaseQuery } from "@/store/baseQuery/protected.baseQueryleanq_support_coordinator";
import { createApi } from "@reduxjs/toolkit/query/react";

export const projectsApi = createApi({
  baseQuery: protectedBaseQuery,
  reducerPath: "projectsApi",
  endpoints: (build) => ({
    projectList: build.query<any, string>({
      query: () => endpoints.projects.all,
    }),
    addProject: build.mutation<any, any>({
      query: (projectData) => ({
        url: endpoints.projects.add,
        method: "POST",
        body: projectData,
      }),
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
