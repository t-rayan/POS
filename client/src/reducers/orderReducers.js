import {
  CLEAR_ORDER_ERRORS,
  CLEAR_ORDER_MESSAGE,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
} from "../constants/orderConstants";

const initState = {
  orders: [],
  order: null,
  loading: false,
  success: false,
  error: null,
  isConfirmed: false,
};

export const orderReducer = (state = initState, action) => {
  switch (action.type) {
    // ACTIONS TO LIST ALL THE ORDERS

    case ORDER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case ORDER_LIST_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    // ACTION TO CREATE A NEW ORDER
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        editable: null,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isConfirmed: true,
        orders: [...state.orders, action.payload.newOrder],
      };
    case ORDER_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ORDER_CREATE_RESET:
      return {
        ...state,
        loading: false,
        isConfirmed: false,
      };

    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ORDER_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.filter(
          (order) => order._id !== action.payload.orderId
        ),
      };
    case ORDER_DELETE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ORDER_ERRORS:
      return {
        ...state,
        error: [],
      };

    default:
      return state;
  }
};
