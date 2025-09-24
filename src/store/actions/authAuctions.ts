import axios, { AxiosError } from "axios";
import type { AppDispatch } from "../../store";
import {
  login,
  loginError,
  createUser,
  createUserError,
  logout,
  logOutError,
  revertMessageDetailsState
} from "../reducers/authReducer";
import type { LoginDetails, UserDetails } from "../../types/types";
import { delay } from "../../util/helpers";
import { deleteAllTodosAsync } from "./todoAuctions";

// Thunk for logging in
export const loginUser = (user: LoginDetails) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post('/auth/login', { username: user.username, password: user.password });
    dispatch(login({
      username: user.username,
      email: response.data.user.email
    }));
  } catch (error: unknown) {
    if(axios.isAxiosError(error)){
      dispatch(loginError(error.response?.data.error));
    } 
  }
}

// Thunk for creating a user
export const registerUser = (user: UserDetails) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post('/auth/register', { username: user.username, email: user.email, password: user.password });
    dispatch(createUser(response.data.message));
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      dispatch(createUserError(error.response?.data.error));
    }
  }
}
// Thunk for logging out
export const logoutUser = () => async (dispatch: AppDispatch) => {
  try {
    await deleteAllTodosAsync()(dispatch);
    dispatch(logout());
  } catch {
    dispatch(logOutError("Logout failed"));
  }
};

export const revertMessageDetailsStateAsync = () => async (dispatch: AppDispatch) => {
  await delay(2000);
  dispatch(revertMessageDetailsState());
};
