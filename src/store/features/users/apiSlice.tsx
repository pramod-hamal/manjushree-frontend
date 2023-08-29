import { createApi } from "@reduxjs/toolkit/query/react";
import { protectedBaseQuery } from "@/store/baseQuery/protected.baseQueryleanq_support_coordinator";
import { endpoints } from "@/constants/endpointsleanq_support_coordinator";
import { APIBaseResponse } from "../auth/interface/api.response";
import {
  CreateUserDTO,
  CreateUserResponse,
  GetUserByIDDTO,
  UserList,
} from "./interface/user.interface";
import { UserContactResponse } from "./interface/user.contact.interface";

export const usersApi = createApi({
  baseQuery: protectedBaseQuery,
  reducerPath: "usersApi",
  tagTypes: ["Users", "List", "Detail", "Contactlist"],
  endpoints: (build) => ({
    getAll: build.query<APIBaseResponse<UserList>, any>({
      query: () => endpoints.users.getAll,
      providesTags: ["List"],
    }),
    add: build.mutation<APIBaseResponse<CreateUserResponse>, any>({
      query: (userData: CreateUserDTO) => ({
        url: endpoints.users.add,
        body: userData,
        method: "POST",
      }),
      invalidatesTags: ["List"],
    }),
    getById: build.query<APIBaseResponse<GetUserByIDDTO>, any>({
      query: (id: string | number) => endpoints.users.getById(id),
      providesTags: ["Detail"],
    }),
    update: build.mutation<any, any>({
      query: (toUpdateUserData) => ({
        url: endpoints.users.add,
        body: toUpdateUserData,
        method: "POST",
      }),
      invalidatesTags: ["List", "Detail"],
    }),
    allContacts: build.query<APIBaseResponse<UserContactResponse>, any>({
      query: (id: string | number) => endpoints.users.contact.getAll(id),
      providesTags: ["Contactlist"],
    }),
  }),
});

export const {
  useGetAllQuery,
  useAddMutation,
  useGetByIdQuery,
  useUpdateMutation,
  useAllContactsQuery,
} = usersApi;
