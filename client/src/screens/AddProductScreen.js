import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AddProductForm from "../components/AddProductForm";
import Layout from "../components/Layout";
import { CLEAR_PRODUCT_MESSAGE } from "../constants/productConstants";

const AddProductScreen = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.productState);
  const { message } = productState;
  return (
    <Layout
      message={message}
      clearMessage={() => dispatch({ type: CLEAR_PRODUCT_MESSAGE })}
    >
      <AddProductForm />
    </Layout>
  );
};

export default AddProductScreen;
