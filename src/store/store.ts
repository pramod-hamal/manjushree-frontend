"use client";

import { configureStore } from "@reduxjs/toolkit";

import { projectReducer } from "./features/projects/projectSlice";

import { projectsApi } from "./features/projects/apiSlice";
import { contactApi } from "./features/contact/apiSlice";
import { participantsApi } from "./features/participants/apiSlice";
import { usersApi } from "./features/users/apiSlice";
import { appReducer } from "./features/appSlice";
import { authApi } from "./features/auth/apiSlice";
import { authSlice } from "./features/auth/authSlice";
import { participantReducer } from "./features/participants/participantSlice";
import { participantDetailReducer } from "./features/participants/detail/participantDetailSlice";
import { participantDetailApi } from "./features/participants/detail/apiSlice";

export const stores = configureStore({
    // Root Reducers
    reducer: {
        //appstate
        app: appReducer,
        // auth
        auth:authSlice.reducer,
        [authApi.reducerPath]:authApi.reducer,
        // projects
        projects: projectReducer,
        [projectsApi.reducerPath]: projectsApi.reducer,
        // contact
        [contactApi.reducerPath]: contactApi.reducer,
        // participant
        participant:participantReducer,
        participantDetail:participantDetailReducer,
        [participantsApi.reducerPath]: participantsApi.reducer,
        [participantDetailApi.reducerPath]:participantDetailApi.reducer,
        // Users
        [usersApi.reducerPath]: usersApi.reducer
    },
    // Initializing create api middlewares
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({})
        .concat(
            authApi.middleware,
            projectsApi.middleware,
            contactApi.middleware,
            participantsApi.middleware,
            participantDetailApi.middleware,
            usersApi.middleware,
        )
});

// create types for state and dispatch
export type RootState = ReturnType<typeof stores.getState>
// Store Dispatch Type
export type AppDispatch = typeof stores.dispatch
