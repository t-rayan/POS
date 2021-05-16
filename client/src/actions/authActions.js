import {
  AUTH_LOGIN_FAIL,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  USER_LOADING,
  USER_LOADED,
  AUTH_LOG_OUT,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_SUCCESS,
} from "../constants/authConstants";
import Axios from "axios";

export const loadUser = () => async (dispatch, getState) => {
  dispatch({
    type: USER_LOADING,
  });

  try {
    const { data } = await Axios.get("/api/auth/user", tokenConfig(getState));
    dispatch({
      type: USER_LOADED,
      payload: data,
    });
  } catch (error) {
    const errMsg = error.response?.data.message;

    dispatch({
      type: AUTH_LOGIN_FAIL,
      payload: errMsg,
    });
  }
};

export const authLogin = (email, password) => async (dispatch) => {
  dispatch({
    type: AUTH_LOGIN_REQUEST,
    payload: { email, password },
  });

  try {
    const { data } = await Axios.post("/api/auth/login", { email, password });
    dispatch({
      type: AUTH_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errMsg = error.response?.data.message;
    dispatch({
      type: AUTH_LOGIN_FAIL,
      payload: errMsg,
    });
  }
};
export const authRegister = () => async (dispatch) => {
  // dispatch({
  //   type: AUTH_LOGIN_REQUEST,
  // });
  // try {
  //   const { data } = await Axios.get("/api/categories");
  //   dispatch({
  //     type: AUTH_LOGIN_SUCCESS,
  //     payload: data,
  //   });
  // } catch (error) {
  //   const errMsg = error.response?.data.message;
  //   dispatch({
  //     type: AUTH_LOGIN_FAIL,
  //     payload: errMsg,
  //   });
  // }
};

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch, getState) => {
    dispatch({
      type: UPDATE_PASSWORD_REQUEST,
    });

    try {
      const { data } = await Axios.put(
        "/api/auth/update",
        { oldPassword, newPassword },
        tokenConfig(getState)
      );
      console.log(data);
      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: data?.message,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response?.data.message,
      });
    }
  };

export const authLogout = () => (dispatch) => {
  dispatch({
    type: AUTH_LOG_OUT,
  });
};

export const tokenConfig = (getState) => {
  // get token from localstorage
  const { token } = getState().authState;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  if (token) {
    config.headers["x-access-token"] = token;
  }

  return config;
};
