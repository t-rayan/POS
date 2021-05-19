import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import { categoryReducer } from "./reducers/categoryReducers";
import { productReducer } from "./reducers/productReducers";
import { orderReducer } from "./reducers/orderReducers";
import { authReducer } from "./reducers/authReducers";
import { msgReducer } from "./reducers/msgReducers";

// initial state
const initialState = {
  cartState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};
const reducer = combineReducers({
  authState: authReducer,
  productState: productReducer,
  categoryState: categoryReducer,
  cartState: cartReducer,
  orderState: orderReducer,
  messageState: msgReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
