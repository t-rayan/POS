import {
  ADD_ITEM_REQUEST,
  CART_ADD_ITEM,
  CART_DELETE_ITEM,
  CART_ITEM_RESET,
  CHANGE_PENDING_STATUS,
  DECREASE_ITEM_QTY,
  INCREASE_ITEM_QTY,
} from "../constants/cartConstants";

const initState = {
  cartItems: [],
  pending: false,
  loading: false,
};
export const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        const index = state.cartItems.findIndex(
          (i) => i.product === item.product
        );
        const newArray = [...state.cartItems];
        newArray[index].qty = newArray[index].qty + 1;
        newArray[index].finalPrice =
          newArray[index].qty * newArray[index].price;

        return {
          ...state,
          cartItems: newArray,
          loading: false,
        };
      } else {
        return {
          ...state,
          cartItems: [item, ...state.cartItems],
          loading: false,
        };
      }

    case INCREASE_ITEM_QTY:
      const index = state.cartItems.findIndex(
        (i) => i.product === action.payload
      );
      const newArray = [...state.cartItems];
      newArray[index].qty = newArray[index].qty + 1;
      newArray[index].finalPrice = newArray[index].qty * newArray[index].price;
      return {
        ...state,
        cartItems: newArray,
      };

    // decrease

    case DECREASE_ITEM_QTY:
      const cItem = state.cartItems.findIndex(
        (i) => i.product === action.payload
      );
      const newItem = [...state.cartItems];
      newItem[cItem].qty = newItem[cItem].qty - 1;
      newItem[cItem].finalPrice = newItem[cItem].qty * newItem[cItem].price;
      return {
        ...state,
        cartItems: newItem,
      };

    case CART_ITEM_RESET:
      return {
        ...state,
        cartItems: [],
        pending: false,
      };
    case CART_DELETE_ITEM:
      return {
        ...state,
        pending: false,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };

    case CHANGE_PENDING_STATUS:
      return {
        ...state,
        pending: !state.pending,
      };
    default:
      return state;
  }
};
