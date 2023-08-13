import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
// import { decodeJwt } from "@/utils/jwtdecode";

const decodeJwt = (payload: any) => {
  return {};
};

interface session {
  token: string | null;
  session: any;
}

// Create the sessionSlice
const sessionSlices = createSlice({
  name: "Session",
  initialState: {
    session: null,
    token: null,
    authHeader: null,
  } as session,
  reducers: {
    clearSession(state) {
      state.token = null;
      localStorage.clear();
    },
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("fakeStoreToken", action.payload);
      const decodedData = decodeJwt(action.payload);
      if (decodedData) {
        state.session = decodedData;
      }
    },
    checkSession(state) {
      const token = localStorage.getItem("fakeStoreToken");
      state.token = token;
      if (token) {
        const decodedData = decodeJwt(token);
        if (decodedData) {
          state.session = decodedData;
        }
      }
    },
    logout(state) {
      clearSession();
      localStorage.clear();
    },
  },
});

export const { clearSession, setToken, checkSession, logout } =
  sessionSlices.actions;
export const sessionReducer = sessionSlices.reducer;

export const presistSessionData = (state: RootState) => state.session;

export default sessionSlices.reducer;
