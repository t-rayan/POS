import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_EDIT_FAIL,
  PRODUCT_EDIT_RESET,
  PRODUCT_ON_EDIT,
  ON_PRODUCT_SEARCH,
  CLEAR_PRODUCT_ERRORS,
  CLEAR_PRODUCT_MESSAGE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DECREASE_REQUEST,
  PRODUCT_DECREASE_SUCCESS,
} from "../constants/productConstants";

const initState = {
  products: [],
  product: null,
  loading: false,
  success: false,
  error: null,
  editable: null,
  searchedProduct: null,
};

export const productReducer = (state = initState, action) => {
  // actions to list all products
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // action to get product details
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };

    // actions to create a new product
    case PRODUCT_CREATE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        products: [...state.products, action.payload.newProduct],
      };
    case PRODUCT_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // actions to delete a product
    case PRODUCT_DELETE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products.filter(
          (product) => product._id !== action.payload.productId
        ),
      };
    case PRODUCT_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // product edit cases
    case PRODUCT_ON_EDIT:
      return {
        ...state,
        editable: action.payload,
      };
    case PRODUCT_EDIT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_EDIT_SUCCESS:
      const { updated } = action.payload;

      return {
        ...state,
        loading: false,
        editable: null,
        products: state.products.map((product) =>
          product._id === updated._id ? updated : product
        ),
      };
    case PRODUCT_EDIT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PRODUCT_EDIT_RESET:
      return {
        ...state,
        loading: false,
        editable: null,
      };

    case PRODUCT_DECREASE_REQUEST:
      return {
        ...state,
      };
    case PRODUCT_DECREASE_SUCCESS:
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      const newArray = [...state.products];
      newArray[index].stock = newArray[index].stock - 1;
      // newArray[index].finalPrice = newArray[index].qty * newArray[index].price;
      return {
        ...state,
        // product: newArray,
      };

    case ON_PRODUCT_SEARCH:
      const searchResult = state.products.filter(
        (product) => product.name === action.payload
      );
      return {
        ...state,
        products: searchResult,
      };

    case CLEAR_PRODUCT_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
