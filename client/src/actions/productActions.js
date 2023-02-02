import Axios from "axios";
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_EDIT_FAIL,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_ON_EDIT,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  ON_PRODUCT_SEARCH,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DECREASE_REQUEST,
  PRODUCT_DECREASE_SUCCESS,
  PRODUCT_DECREASE_FAIL,
} from "../constants/productConstants";
import { tokenConfig } from "../utils/authHeader";
import { apiUrl } from "../utils/config";
import { SET_MESSAGE } from "../constants/msgConstants";

const header = {
  "Content-Type": "application/json",
};

export const listProducts = () => async (dispatch, getState) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `${apiUrl}/products`,
      tokenConfig(getState)
    );
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const productDetails = (productId) => async (dispatch, getState) => {
  dispatch({
    type: PRODUCT_DETAILS_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `${apiUrl}/products/${productId}`,
      tokenConfig(getState)
    );
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

export const createProduct = (product) => async (dispatch, getState) => {
  dispatch({
    type: PRODUCT_CREATE_REQUEST,
    payload: product,
  });
  try {
    const { data } = await Axios.post(
      `${apiUrl}/products`,
      product,
      tokenConfig(getState)
    );
    if (data) {
      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: data,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: error.response.data?.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({
    type: PRODUCT_DELETE_REQUEST,
    payload: productId,
  });

  try {
    const { data } = await Axios.delete(
      `${apiUrl}/products/${productId}`,
      tokenConfig(getState)
    );
    if (data) {
      dispatch({
        type: PRODUCT_DELETE_SUCCESS,
        payload: { data, productId },
      });
      dispatch({
        type: SET_MESSAGE,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.message,
    });
  }
};
export const onEditProduct = (product) => async (dispatch, getState) => {
  dispatch({
    type: PRODUCT_ON_EDIT,
    payload: product,
  });
};

export const editProduct = (product) => async (dispatch, getState) => {
  const { _id, name, price, stock, category, desc } = product;
  dispatch({
    type: PRODUCT_EDIT_REQUEST,
  });

  try {
    const { data } = await Axios.put(
      `${apiUrl}/products/${_id}`,
      {
        _id: _id,
        name: name,
        price: price,
        stock: stock,
        category: category,
        desc: desc,
      },
      tokenConfig(getState)
    );
    if (data) {
      dispatch({
        type: PRODUCT_EDIT_SUCCESS,
        payload: data,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_EDIT_FAIL,
      payload: error.message,
    });
  }
};
export const onProductSearch = (searchText) => async (dispatch, getState) => {
  dispatch({
    type: ON_PRODUCT_SEARCH,
    payload: searchText,
  });
};

export const decreaseProduct = (products) => async (dispatch, getState) => {
  dispatch({
    type: PRODUCT_DECREASE_REQUEST,
  });
  let i;
  for (i = 0; i < products.length; i++) {
    const { _id, name, price, stock, category, desc, qty } = products[i];
    let updatedStock = stock - qty;
    try {
      const { data } = await Axios.put(
        `${apiUrl}/products/${_id}`,
        {
          _id: _id,
          name: name,
          price: price,
          stock: updatedStock,
          category: category,
          desc: desc,
        },
        header
      );
      dispatch({
        type: PRODUCT_DECREASE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DECREASE_FAIL,
        payload: error.message,
      });
    }
  }
};
