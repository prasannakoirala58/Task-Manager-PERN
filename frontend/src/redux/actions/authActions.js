import api from "../../api";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  SAVE_PROFILE,
} from "./actionTypes";
import { toast } from "react-toastify";

// LOGIN
export const postLoginData = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    // backend: POST /api/login
    const { data } = await api.post("/login", { email, password });

    // data = { status, msg, token, user }
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        user: data.user,
        token: data.token,
        msg: data.msg,
      },
    });

    localStorage.setItem("token", data.token);
    toast.success(data.msg || "Login successful");
  } catch (error) {
    const msg =
      error.response?.data?.msg ||
      error.response?.data?.errors?.[0]?.msg ||
      error.message;

    dispatch({
      type: LOGIN_FAILURE,
      payload: { msg },
    });

    toast.error(msg);
  }
};

// REGISTER (auto-login after signup)
export const postRegisterData = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    // backend: POST /api/register
    const { data } = await api.post("/register", { name, email, password });

    // treat successful register as a login
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        user: data.user,
        token: data.token,
        msg: data.msg,
      },
    });

    localStorage.setItem("token", data.token);
    toast.success(data.msg || "Account created successfully");
  } catch (error) {
    const msg =
      error.response?.data?.msg ||
      error.response?.data?.errors?.[0]?.msg ||
      error.message;

    dispatch({
      type: LOGIN_FAILURE,
      payload: { msg },
    });

    toast.error(msg);
  }
};

// LOAD PROFILE FROM TOKEN (used on refresh, if you keep /api/profile)
export const saveProfile = (token) => async (dispatch) => {
  try {
    const { data } = await api.get("/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({
      type: SAVE_PROFILE,
      payload: { user: data.user, token },
    });
  } catch (error) {
    // silently fail – user will just be treated as logged out
    // console.error(error);
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
  document.location.href = "/";
};
