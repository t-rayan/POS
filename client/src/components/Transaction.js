import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";

import { FaMinus, FaCartPlus, FaCheckCircle } from "react-icons/fa";
import {
  clearCart,
  decreaseQty,
  deleteCartItem,
  updateQty,
} from "../actions/cartActions";
import { CHANGE_PENDING_STATUS } from "../constants/cartConstants";
import { createOrder } from "../actions/orderActions";
import { decreaseProduct } from "../actions/productActions";

import LoadingBox from "./LoadingBox";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { motion } from "framer-motion";
import { filteredArray, mergeById } from "../utils/mergeById";

const Transaction = () => {
  const dispatch = useDispatch();

  const [discount, setDiscount] = useState(0);
  const [receivedAmt, setReceivedAmt] = useState(0);
  const cartState = useSelector((state) => state.cartState);
  const { cartItems, pending } = cartState;
  const productState = useSelector((state) => state.productState);
  const { products } = productState;
  const orderState = useSelector((state) => state.orderState);
  const { loading, isConfirmed } = orderState;

  const subTotal = cartItems.reduce((a, b) => {
    return a + b.finalPrice;
  }, 0);

  const total = () => {
    let discountPrice = (subTotal * discount) / 100;
    let finalPrice = subTotal - discountPrice;
    return finalPrice;
  };
  const change = () => {
    if (receivedAmt === 0) {
      return 0;
    } else {
      return receivedAmt - total();
    }
  };
  const clearAllItems = (e) => {
    e.preventDefault();
    dispatch(clearCart());
  };

  const filteredProduct = filteredArray(products, cartItems);
  const productArray = mergeById(filteredProduct, cartItems);

  // function for creating order
  const createOrderHandler = (e) => {
    dispatch(createOrder(cartItems, total(), discount));
    dispatch(decreaseProduct(productArray));
    // clearAllItems(e);
  };

  // resetting order create
  const resetOrderHandler = () => {
    dispatch(clearCart());
    dispatch({ type: ORDER_CREATE_RESET });
  };

  const placeOrderUI = (
    <div>
      <div className="row">
        <p className="payment-item sub-total">Sub Total :</p>
        <span>
          {cartItems.length === 0 ? (
            <p className="payment-item subtotal-value">0</p>
          ) : (
            <p>{subTotal}</p>
          )}
        </span>
      </div>
      <div className="row">
        <p className=" payment-item discount">Discounts :</p>
        <span>
          <input
            type="number"
            placeholder="%"
            className="small-input"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </span>
      </div>
      <br />
      <hr />
      <div className="row mt-1">
        <p className="total">Total</p>
        <span className="total-value">{total()}</span>
      </div>
    </div>
  );

  const confirmOrderUI = (
    <div>
      <div className="row">
        <p className="payment-item">Total</p>
        <span>{total()}</span>
      </div>
      <div className="row">
        <p className="payment-item">Received</p>
        <span>
          <input
            type="number"
            name="receivedAmt"
            value={receivedAmt}
            placeholder="0"
            className="small-input"
            onChange={(e) => setReceivedAmt(e.target.value)}
          />
        </span>
      </div>
      <br />
      <hr />
      <div className="row mt-1">
        <p className="payment-item change">Change</p>
        <span>{change()}</span>
      </div>
    </div>
  );
  const orderSuccessUI = (
    <div className="row center-column order-complete-screen">
      <FaCheckCircle className="check-icon" />
      <p className="complete-text">Order Completed</p>
    </div>
  );
  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="text-center empty-cart">
          <FaCartPlus className="cart-plus" />
          <p className="text-muted">Cart is Empty</p>
        </div>
      ) : (
        <div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          className="transacton-screen"
        >
          <div className="heading row">
            <h3 className="uppercase"> {!isConfirmed && "Current Order"}</h3>
            {!isConfirmed && cartItems.length !== 0 && (
              <Button handleClick={clearAllItems} className="btn btn-clear-all">
                Clear All
              </Button>
            )}
          </div>
          <div className="cart-items">
            {!isConfirmed &&
              cartItems.map((item) => (
                <motion.div
                  key={item.name}
                  className="item"
                  initial={{ y: -200, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <p className="itemName">{item.name}</p>
                  <div className="qty-container">
                    <Button
                      className="btn-xxs"
                      handleClick={() => dispatch(decreaseQty(item.product))}
                      disabled={item.qty === 1 && true}
                    >
                      -
                    </Button>
                    <p className="qty-int">{item.qty}</p>
                    <Button
                      className="btn-xxs"
                      handleClick={() => dispatch(updateQty(item.product))}
                    >
                      +
                    </Button>
                  </div>
                  <p className="itemPrice">Rs. {item.finalPrice} </p>
                  <FaMinus
                    className="icon trash-icon"
                    onClick={() => dispatch(deleteCartItem(item.product))}
                  />
                </motion.div>
              ))}
          </div>
          <div className="payment-detail">
            {pending && !isConfirmed && confirmOrderUI}
            {!pending && !isConfirmed && placeOrderUI}
            {pending && isConfirmed && orderSuccessUI}
          </div>
          <div className="place-order">
            {!pending && !isConfirmed && (
              <Button
                className="btn btn-lg place-order-btn"
                handleClick={() => dispatch({ type: CHANGE_PENDING_STATUS })}
              >
                Place Order
              </Button>
            )}

            {pending && !isConfirmed && (
              <Button
                className="btn btn-lg place-order-btn"
                disabled={loading}
                handleClick={createOrderHandler}
              >
                <div className="row center">
                  <span>
                    {loading && (
                      <LoadingBox classname="loader loader-sm mr-1" />
                    )}
                  </span>
                  <span>Confirm Order</span>
                </div>
              </Button>
            )}
            {pending && isConfirmed && (
              <Button
                className="btn btn-lg place-order-btn"
                handleClick={resetOrderHandler}
              >
                Done
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaction;
