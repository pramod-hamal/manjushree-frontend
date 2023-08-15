import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AppState {
    layoutState: LayoutState
}

export interface LayoutState {
    minimized: boolean;
}

const initialState: AppState = {
    layoutState: { minimized: false }
}

const appSlice = createSlice({
    initialState,
    name: "app",
    reducers: {
        toogleDrawer(state, action) {
            state.layoutState.minimized = action.payload;
        }
    }
})

export const { toogleDrawer } = appSlice.actions;

export const appReducer = appSlice.reducer;
export const appState = (state: RootState) => state.app;