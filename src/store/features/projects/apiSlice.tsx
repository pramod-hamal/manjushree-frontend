import {
  baseUrl,
  endpoints,
} from "@/constants/endpointsleanq_support_coordinator";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: baseUrl, headers: {} });

export const projectsApi = createApi({
  baseQuery,
  reducerPath: "projectsApi",
  endpoints: (build) => ({
    /**
     * Get items list
     * @param {any} {query:(
     * @returns {any}
     */
    projectList: build.query<any, string>({
      query: () => endpoints.projects.all,
    }),
    /**
     * Add New Project
     * @param {any} {query:(projectData
     * @returns {any}
     */
    addProject: build.mutation<any, any>({
      query: (projectData) => ({
        url: endpoints.projects.add,
        method: "POST",
        body: projectData,
      }),
    }),
    /**
     * Update Project
     * @param {any} {query:(toUpdateProjectData
     * @returns {any}
     */
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
