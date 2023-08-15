"use client";

import {  configureStore } from "@reduxjs/toolkit";

import { projectReducer } from "./features/projects/projectSlice";

import { projectsApi } from "./features/projects/apiSlice";
import { contactApi } from "./features/contact/apiSlice";
import { participantsApi } from "./features/participants/apiSlice";
import { usersApi } from "./features/users/apiSlice";

export const stores = configureStore({
    // Root Reducers
    reducer: {
        projects:projectReducer,
        [projectsApi.reducerPath]:projectsApi.reducer,
        [contactApi.reducerPath]:contactApi.reducer,
        [participantsApi.reducerPath]:participantsApi.reducer,
        [usersApi.reducerPath]:usersApi.reducer
    },
    // Initializing create api middlewares
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware({})
    .concat(
        projectsApi.middleware,
        contactApi.middleware,
        participantsApi.middleware,
        usersApi.middleware
    )
});

// create types for state and dispatch
export type RootState = ReturnType<typeof stores.getState>
// Store Dispatch Type
export type AppDispatch = typeof stores.dispatch
