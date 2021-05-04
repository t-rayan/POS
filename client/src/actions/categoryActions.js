import Axios from "axios";
import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_EDIT_FAIL,
  CATEGORY_EDIT_REQUEST,
  CATEGORY_EDIT_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_ON_EDIT,
} from "../constants/categoryConstants";

export const listCategory = () => async (dispatch) => {
  dispatch({
    type: CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get("/api/categories");
    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errMsg = error.response?.data.message;

    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: errMsg,
    });
  }
};

export const categoryDetails = (categoryId) => async (dispatch) => {
  dispatch({
    type: CATEGORY_DETAILS_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/categories/${categoryId}`);
    dispatch({
      type: CATEGORY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errMsg = error.response?.data.message;

    dispatch({
      type: CATEGORY_DETAILS_FAIL,
      payload: errMsg,
    });
  }
};

export const createCategory = (category) => async (dispatch) => {
  dispatch({
    type: CATEGORY_CREATE_REQUEST,
    payload: category,
  });
  try {
    const { data } = await Axios.post("/api/categories", category);
    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errMsg = error.response?.data.message;
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload: errMsg,
    });
  }
};

export const deleteCategory = (categoryId) => async (dispatch) => {
  dispatch({
    type: CATEGORY_DELETE_REQUEST,
    payload: categoryId,
  });
  try {
    const { data } = await Axios.delete(`/api/categories/${categoryId}`);
    dispatch({
      type: CATEGORY_DELETE_SUCCESS,
      payload: { categoryId, data },
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DELETE_FAIL,
      payload: error.message,
    });
  }
};

export const onEditCategory = (category) => async (dispatch, getState) => {
  dispatch({
    type: CATEGORY_ON_EDIT,
    payload: category,
  });
};

export const editCategory = (categoryId, category) => async (
  dispatch,
  getState
) => {
  console.log(category);
  dispatch({
    type: CATEGORY_EDIT_REQUEST,
  });

  try {
    const { data } = await Axios.put(`api/categories/${categoryId}`, category);
    dispatch({
      type: CATEGORY_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_EDIT_FAIL,
      payload: error.message,
    });
  }
};
