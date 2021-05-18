import React from "react";
import AddCategoryForm from "../components/AddCategoryForm";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { CLEAR_CATEGORY_MESSAGE } from "../constants/categoryConstants";

const AddCategoryScreen = () => {
  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.categoryState);
  const { message } = categoryState;
  return (
    <Layout
      message={message}
      clearMessage={() => dispatch({ type: CLEAR_CATEGORY_MESSAGE })}
    >
      <AddCategoryForm />
    </Layout>
  );
};

export default AddCategoryScreen;
