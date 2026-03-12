import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthUser {
  id: string;
  email: string;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  initialized: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  initialized: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    authSuccess: (state, action: PayloadAction<AuthUser>) => {
      state.loading = false;
      state.initialized = true;
      state.user = action.payload;
      state.error = null;
    },
    authFail: (state, action: PayloadAction<string | null | undefined>) => {
      state.loading = false;
      state.initialized = true;
      state.user = null;
      state.error = action.payload ?? "Authentication failed";
    },
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.initialized = true;
      state.user = null;
      state.error = null;
    },
  },
});

export const {
  authStart,
  authSuccess,
  authFail,
  setAuthError,
  clearAuthError,
  logoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;
