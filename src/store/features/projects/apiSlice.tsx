import { createApi } from "@reduxjs/toolkit/query/react";

import { protectedBaseQuery } from "@/store/baseQuery/protected.baseQueryleanq_support_coordinator";
import { endpoints } from "@/constants/endpointsleanq_support_coordinator";

export const projectsApi = createApi({
  baseQuery: protectedBaseQuery,
  reducerPath: "projectsApi",
  tagTypes: ["Project", "List", "Detail", "TaskList", "TaskDetail"],
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
    }),
    // Project Tasks
    getAllTaskByProjectId: build.query<any, any>({
      query: (id: string | number) => endpoints.projects.task.getByProjectId + id,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["TaskList"]
    }),
    addProjectTak: build.mutation<any, any>({
      query: (projectTaskData) => ({
        url: endpoints.projects.task.add,
        method: "POST",
        body: projectTaskData,
      }),
      invalidatesTags: ["TaskList"]
    }),
  })
});

export const {
  useProjectListQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  // get Project By Id
  useGetByIdQuery,
  useLazyGetByIdQuery,
  // all task by product Id
  useGetAllTaskByProjectIdQuery,
  useAddProjectTakMutation
} = projectsApi;
