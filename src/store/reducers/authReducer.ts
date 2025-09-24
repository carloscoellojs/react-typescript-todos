import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  AuthenticatedUserDetails,
  AuthState
} from "../../types/types";

const initialState: AuthState = {
  isAuthenticated: false,
  authenticatedUserDetails: { username: "", email: "" },
  message: { error: "", success: "" }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthenticatedUserDetails>) {
      state.isAuthenticated = true;
      state.authenticatedUserDetails = action.payload;
      state.message.success = "Login successful";
      state.message.error = "";
    },
    loginError(state, action: PayloadAction<string>) {
      state.message.error = action.payload;
      state.message.success = "";
    },
    logout(state) {
      state.isAuthenticated = false;
      state.authenticatedUserDetails = { username: "", email: "" };
      state.message.success = "";
      state.message.error = "";
    },
    logOutError(state, action: PayloadAction<string>) {
      state.message.error = action.payload;
      state.message.success = "";
    },
    createUser(state, action: PayloadAction<string>) {
      state.message.success = action.payload;
    },
    createUserError(state, action: PayloadAction<string>) {
      state.message.error = action.payload;
      state.message.success = "";
    },
    revertMessageDetailsState(state) {
      state.message.success = "";
      state.message.error = "";
    }
  }
});

export const {
  login,
  logout,
  createUser,
  loginError,
  createUserError,
  logOutError,
  revertMessageDetailsState
} = authSlice.actions;
export default authSlice.reducer;
