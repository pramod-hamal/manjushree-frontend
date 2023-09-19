import { createApi } from "@reduxjs/toolkit/query/react";
import { protectedBaseQuery } from "@/store/baseQuery/protected.baseQueryleanq_support_coordinator";
import { endpoints } from "@/constants/endpointsleanq_support_coordinator";
import { APIBaseResponse } from "../../../core/interface/api.response";
import {
  CreateUserDTO,
  CreateUserResponse,
  EditUserDTO,
  GetUserByIDDTO,
  UserList,
} from "./interface/user.interface";
import { UserContactResponse } from "./interface/user.contact.interface";

export const usersApi = createApi({
  baseQuery: protectedBaseQuery,
  reducerPath: "usersApi",
  tagTypes: ["Users", "List", "Detail", "Contactlist"],
  endpoints: (build) => ({
    getAll: build.query<
      APIBaseResponse<UserList>,
      { limit: number; page: number, searchText: string }
    >({
      query: (args) => {
        const { limit, page, searchText } = args;
        return {
          url: endpoints.users.getAll,
          params: { limit, page, searchText },
        };
      },
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
      query: (toUpdateUserData: EditUserDTO) => ({
        url: endpoints.users.update(toUpdateUserData.id),
        body: toUpdateUserData,
        method: "PUT",
      }),
      invalidatesTags: ["List",],
    }),
    allContacts: build.query<APIBaseResponse<UserContactResponse>, any>({
      query: (id: string | number) => endpoints.users.contact.getAll(id),
      providesTags: ["Contactlist"],
    }),
    addContact: build.mutation<APIBaseResponse<CreateUserResponse>, any>({
      query: (userData: CreateUserDTO) => ({
        url: endpoints.users.contact.add,
        body: userData,
        method: "POST",
      }),
      invalidatesTags: ["Contactlist"],
    }),
    deleteContact: build.mutation<any, any>({
      query: (id) => ({
        url: endpoints.users.contact.delete(id),
        method: "DELETE",
      }),
      invalidatesTags: ["Contactlist"],
    }),
  }),
});

export const {
  useGetAllQuery,
  useAddMutation,
  useGetByIdQuery,
  useUpdateMutation,
  useAllContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} = usersApi;
