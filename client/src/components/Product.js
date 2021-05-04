import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { motion } from "framer-motion";
import { decreaseProduct } from "../actions/productActions";

const Product = ({ product, qty, finalPrice, setFinalPrice }) => {
  const dispatch = useDispatch();

  // add to cart handler function
  const addToCartHandler = () => {
    dispatch(addToCart(product?._id, qty, finalPrice));
  };

  return (
    <motion.div
      className="product-card"
      onClick={addToCartHandler}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.1 }}
    >
      <div>
        <p className="pstock">{product.category?.name}</p>
        <h3 className="pname">{product.name}</h3>
      </div>

      <div>
        <p className="pprice"> Rs.{product.price}</p>
      </div>
    </motion.div>
  );
};

export default Product;
