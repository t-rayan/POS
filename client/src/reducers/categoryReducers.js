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
  CATEGORY_EDIT_RESET,
  CATEGORY_EDIT_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_ON_EDIT,
  CLEAR_CATEGORY_ERRORS,
  CLEAR_CATEGORY_MESSAGE,
} from "../constants/categoryConstants";

const initState = {
  categories: [],
  category: "",
  loading: false,
  success: false,
  error: null,
  editable: null,
};

export const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    //action to list all categories
    case CATEGORY_LIST_REQUEST:
      return {
        loading: true,
        editable: null,
      };
    case CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        editable: null,
        categories: action.payload,
      };
    case CATEGORY_LIST_FAIL:
      return {
        loading: false,
        editable: null,
        error: action.payload,
      };

    // actions to create a new category
    case CATEGORY_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        editable: null,
      };
    case CATEGORY_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        editable: null,
        error: null,
        success: true,
        categories: [action.payload.newCategory, ...state.categories],
      };
    case CATEGORY_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    // actions to delete a category
    case CATEGORY_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CATEGORY_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        categories: state.categories.filter(
          (category) => category._id !== action.payload.categoryId
        ),
      };
    case CATEGORY_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // ACTIONS to edit categories
    case CATEGORY_ON_EDIT:
      return {
        ...state,
        editable: action.payload,
      };
    case CATEGORY_EDIT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CATEGORY_EDIT_SUCCESS:
      const { updatedCategory } = action.payload;
      return {
        ...state,
        editable: null,
        loading: false,
        categories: state.categories.map((category) =>
          category._id === updatedCategory._id ? updatedCategory : category
        ),
      };
    case CATEGORY_EDIT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CATEGORY_EDIT_RESET:
      return {
        ...state,
        loading: false,
        editable: null,
      };

    case CLEAR_CATEGORY_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CATEGORY_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CATEGORY_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        category: action.payload,
        error: null,
      };
    case CATEGORY_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.data?.message,
      };

    default:
      return state;
  }
};
