import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./apiSlice";
import {
  APIBaseResponse,
  AuthMEResponseData,
  LoginResponseData,
} from "./interface/api.response";
import { RootState } from "@/store/storeleanq_support_coordinator";

export interface AuthState {
  user: AuthMEResponseData | null;
  token: string | null;
}

export const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials(state: AuthState, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearSession(state: AuthState) {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    // matches api slice endpoint and recieves its return payload
    builder.addMatcher(
      authApi.endpoints.signIn.matchFulfilled,
      (state, action) => {
        const response: APIBaseResponse<LoginResponseData> = action.payload;
        if (response.statusCode === 200) {
          state.token = response.data?.accessToken;
        }
      }
    );
  },
});

export const { setCredentials, clearSession } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const authState = (state: RootState) => state.auth;
