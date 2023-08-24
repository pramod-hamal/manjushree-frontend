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
import { contactReducer } from "./features/contact/contactSlice";
import { participantHealthApi } from "./features/participants/health/apiSlice";
import { participantHealthReducer } from "./features/participants/health/participantHealthSlice";
import { contactDetailReducer } from "./features/participants/contact/contactDetailSlice";
import { participantDetailContactApi } from "./features/participants/contact/apiSlice";
import { participantDocumentApi } from "./features/participants/documents/apiSlice";
import { participantDocumentReducer } from "./features/participants/documents/participantDocumentSlice";
import { dropdownSlice } from "./features/dropdown/dropdownSlice";
import { dropdownApi } from "./features/dropdown/apiSlice";

export const stores = configureStore({
    // Root Reducers
    reducer: {
        //appstate
        app: appReducer,
        // dropdown
        dropdown:dropdownSlice.reducer,
        [dropdownApi.reducerPath]:dropdownApi.reducer,
        // auth
        auth:authSlice.reducer,
        [authApi.reducerPath]:authApi.reducer,
        // projects
        projects: projectReducer,
        [projectsApi.reducerPath]: projectsApi.reducer,
        // contact
        [contactApi.reducerPath]: contactApi.reducer,
        contact:contactReducer,
        // participant
        participant:participantReducer,
        participantDetail:participantDetailReducer,
        participantHealth:participantHealthReducer,
        participantDocument:participantDocumentReducer,
        contactDetail:contactDetailReducer,
        [participantsApi.reducerPath]: participantsApi.reducer,
        [participantDetailApi.reducerPath]:participantDetailApi.reducer,
        [participantHealthApi.reducerPath]:participantHealthApi.reducer,
        [participantDocumentApi.reducerPath]:participantDocumentApi.reducer,
        [participantDetailContactApi.reducerPath]:participantDetailContactApi.reducer,
        // Users
        [usersApi.reducerPath]: usersApi.reducer
    },
    // Initializing create api middlewares
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({})
        .concat(
            authApi.middleware,
            dropdownApi.middleware,
            projectsApi.middleware,
            contactApi.middleware,
            participantsApi.middleware,
            participantDetailApi.middleware,
            participantHealthApi.middleware,
            participantDocumentApi.middleware,
            participantDetailContactApi.middleware,
            usersApi.middleware,
        )
});

// create types for state and dispatch
export type RootState = ReturnType<typeof stores.getState>
// Store Dispatch Type
export type AppDispatch = typeof stores.dispatch
