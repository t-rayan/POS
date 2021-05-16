import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import {
  deleteCategory,
  listCategory,
  onEditCategory,
} from "../actions/categoryActions";
import Toolbar from "../components/Toolbar";
import { FaTrash, FaEdit, FaTimes, FaCheck, FaInfo } from "react-icons/fa";
import AddCategoryForm from "../components/AddCategoryForm";
import LoadingBox from "../components/LoadingBox";
import Pagination from "../components/Pagination";
import { getCurrentValues } from "../utils/getCurrentValues";
import MessageBox from "../components/MessageBox";
import { CLEAR_CATEGORY_MESSAGE } from "../constants/categoryConstants";
import { motion } from "framer-motion";
import Layout from "../components/Layout";

const CategoryScreen = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [toggleForm, setToggleForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");

  const categoryState = useSelector((state) => state.categoryState);
  const { loading, error, categories, message } = categoryState;

  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch]);

  const handleRedirect = (id) => {
    history.push(`/categories/${id}`);
  };

  const { currentValues, indexOfLastValue } = getCurrentValues(
    currentPage,
    categoriesPerPage,
    categories
  );

  // function to handle toggle form
  const displayFormHandler = (e) => {
    e.preventDefault();
    setToggleForm(true);
  };

  const clearMessage = () => {
    dispatch({ type: CLEAR_CATEGORY_MESSAGE });
  };

  const increaseValue = () => setCurrentPage(currentPage + 1);
  const decreaseValue = () => setCurrentPage(currentPage - 1);

  //filtering categories
  const filteredCategory = () => {
    if (searchText === "") {
      return currentValues;
    } else {
      const searched = categories?.filter((val) =>
        val.name.toLowerCase().includes(searchText.toLowerCase())
      );
      return searched;
    }
  };

  const processedCategory = filteredCategory();

  const categoryUI = (
    <>
      <div className="category-table table">
        <div className="category-table-header table-header">
          <p>Name</p>
        </div>
        <div className="scroll-vertical">
          {processedCategory?.map((category) => (
            <div className="category-table-body table-body" key={category._id}>
              <p
                className="page-link"
                onClick={() => handleRedirect(category._id)}
              >
                {category.name}
              </p>
              <div className="row align-center">
                <FaTrash
                  className="trash-icon icon"
                  onClick={() => dispatch(deleteCategory(category._id))}
                />
                <FaEdit
                  className="edit-icon icon"
                  onClick={() => {
                    setToggleForm(true);
                    dispatch(onEditCategory(category));
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <Layout message={message} loading={loading} clearMessage={clearMessage}>
      {toggleForm ? (
        <AddCategoryForm setToggleForm={setToggleForm} />
      ) : (
        <div className="container">
          <div className="table-container py-3">
            <Toolbar
              title="All Categories"
              placeholder="Search categories..."
              searchText={searchText}
              setSearchText={setSearchText}
              handleClick={displayFormHandler}
            />
            <div>{categoryUI}</div>
            <div className="table-footer">
              {searchText === "" && (
                <Pagination
                  itemsPerPage={categoriesPerPage}
                  totalItems={categories?.length}
                  increaseValue={increaseValue}
                  decreaseValue={decreaseValue}
                  currentPage={currentPage}
                  indexOfLastValue={indexOfLastValue}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CategoryScreen;
