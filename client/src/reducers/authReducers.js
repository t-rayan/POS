import {
  AUTH_LOGIN_FAIL,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOG_OUT,
  CLEAR_AUTH_ERRORS,
  CLEAR_AUTH_MESSAGES,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  USER_LOADED,
  USER_LOADING,
} from "../constants/authConstants";

const initState = {
  isLoggedIn: false,
  error: null,
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
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        error: false,
        token: localStorage.getItem("token", action.payload.token),
      };
    case AUTH_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isLoggedIn: false,
        userInfo: null,
        message: null,
      };
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case AUTH_LOG_OUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        userInfo: null,
      };
    case CLEAR_AUTH_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_AUTH_MESSAGES:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};
