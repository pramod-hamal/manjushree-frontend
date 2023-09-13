import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { authApi } from "./auth/apiSlice";
import { APIBaseResponse } from "@/core/interface/api.responseleanq_support_coordinator";

export interface AppState {
    layoutState: LayoutState,
    user:any|null
}

export interface LayoutState {
    minimized: boolean;
}

const initialState: AppState = {
    layoutState: { minimized: false },
    user:null
}

const appSlice = createSlice({
    initialState,
    name: "app",
    reducers: {
        toogleDrawer(state, action) {
            state.layoutState.minimized = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addMatcher(
            authApi.endpoints.getMe.matchFulfilled,
            (state, action) => {
              const response: APIBaseResponse<any> = action.payload;
              if (response.statusCode === 200) {
                state.user = response.data;
              }
            }
          );
    }
})

export const { toogleDrawer } = appSlice.actions;

export const appReducer = appSlice.reducer;
export const appState = (state: RootState) => state.app;