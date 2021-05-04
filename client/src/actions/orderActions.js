import Axios from "axios";
import moment from "moment";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
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

export const listOrders = () => async (dispatch) => {
  dispatch({
    type: ORDER_LIST_REQUEST,
  });

  try {
    const { data } = await Axios.get("/api/orders");
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const orderDetails = (orderId) => async (dispatch) => {
  dispatch({
    type: ORDER_DETAILS_REQUEST,
  });

  try {
    const { data } = await Axios.get(`/api/orders/${orderId}`);
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

export const createOrder = (orderItems, totalPrice, discount) => async (
  dispatch
) => {
  dispatch({
    type: ORDER_CREATE_REQUEST,
  });
  let d = new Date();
  const order = {
    orderItems: orderItems,
    totalPrice: totalPrice,
    discount: discount,
    totalProducts: orderItems?.length,
    orderDate: d,
  };
  try {
    const { data } = await Axios.post("/api/orders", order);
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.message,
    });
  }
};

export const deleteOrder = (orderId) => async (dispatch) => {
  dispatch({
    type: ORDER_DELETE_REQUEST,
  });

  try {
    const { data } = await Axios.delete(`/api/orders/${orderId}`);
    dispatch({
      type: ORDER_DELETE_SUCCESS,
      payload: { data, orderId },
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELETE_FAIL,
      payload: error.message,
    });
  }
};
