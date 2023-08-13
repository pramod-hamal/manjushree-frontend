"use client";

import { configureStore } from "@reduxjs/toolkit";

export const stores = configureStore({
    // Root Reducers
    reducer: {
    },
    // Initializing create api middlewares
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware({})
    .concat()
});

// create types for state and dispatch
export type RootState = ReturnType<typeof stores.getState>
// Store Dispatch Type
export type AppDispatch = typeof stores.dispatch
