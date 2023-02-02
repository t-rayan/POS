import Axios from "axios";
import {
  ADD_ITEM_REQUEST,
  CART_ADD_ITEM,
  CART_DELETE_ITEM,
  CART_ITEM_RESET,
  DECREASE_ITEM_QTY,
  INCREASE_ITEM_QTY,
} from "../constants/cartConstants";
import { tokenConfig } from "../utils/authHeader";
import { apiUrl } from "../utils/config";
export const addToCart = (productId, qty) => async (dispatch, getState) => {
  dispatch({
    type: ADD_ITEM_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `${apiUrl}/products/${productId}`,
      tokenConfig(getState)
    );
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        name: data.name,
        price: data.price,
        product: data._id,
        qty,
        finalPrice: data.price * qty,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cartState.cartItems)
    );
  } catch (error) {
    console.log(error.response);
  }
};

export const clearCart = () => async (dispatch, getState) => {
  dispatch({
    type: CART_ITEM_RESET,
  });
  localStorage.removeItem("cartItems");
};
export const deleteCartItem = (itemId) => async (dispatch, getState) => {
  dispatch({
    type: CART_DELETE_ITEM,
    payload: itemId,
  });
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartState.cartItems)
  );
};

export const updateQty = (itemId) => async (dispatch, getState) => {
  dispatch({
    type: INCREASE_ITEM_QTY,
    payload: itemId,
  });
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartState.cartItems)
  );
};

export const decreaseQty = (itemId) => async (dispatch, getState) => {
  dispatch({
    type: DECREASE_ITEM_QTY,
    payload: itemId,
  });
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartState.cartItems)
  );
};
