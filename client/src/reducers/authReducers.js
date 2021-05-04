import {
  AUTH_LOGIN_FAIL,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOG_OUT,
  USER_LOADED,
  USER_LOADING,
} from "../constants/authConstants";

const initState = {
  isLoggedIn: false,
  error: false,
  loading: false,
  token: localStorage.getItem("token"),
  userInfo: null,
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        userInfo: action.payload,
      };
    case AUTH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AUTH_LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        error: false,
        token: localStorage.getItem("token", action.payload.token),
        userInfo: action.payload.user,
      };
    case AUTH_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        isLoggedIn: false,
        userInfo: null,
      };
    case AUTH_LOG_OUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        userInfo: null,
      };

    default:
      return state;
  }
};
