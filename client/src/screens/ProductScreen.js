import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  listProducts,
  onEditProduct,
} from "../actions/productActions";
import AddProductForm from "../components/AddProductForm";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  FaTrash,
  FaEdit,
  FaShippingFast,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import {
  CHECK_FOR_EMPTY,
  CLEAR_PRODUCT_MESSAGE,
  PRODUCT_EDIT_RESET,
} from "../constants/productConstants";
import Toolbar from "../components/Toolbar";
import EmptyPage from "../components/EmptyPage";
import Button from "../components/Button";
import { listCategory } from "../actions/categoryActions";
import Pagination from "../components/Pagination";
import { getCurrentValues } from "../utils/getCurrentValues";
import Layout from "../components/Layout";
import { useHistory } from "react-router-dom";

const ProductScreen = () => {
  const history = useHistory();
  const [toggleForm, setToggleForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();
  const productState = useSelector((state) => state.productState);
  const { loading, error, products, message } = productState;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const { currentValues, indexOfLastValue } = getCurrentValues(
    currentPage,
    productsPerPage,
    products
  );
  const increaseValue = () => setCurrentPage(currentPage + 1);
  const decreaseValue = () => setCurrentPage(currentPage - 1);

  const displayFormHandler = (e) => {
    e.preventDefault();
    setToggleForm(true);
  };
  const handleRedirect = (id) => {
    history.push(`/products/${id}`);
  };

  const clearMessage = () => {
    dispatch({ type: CLEAR_PRODUCT_MESSAGE });
  };

  // filtering products
  const filteredProduct = () => {
    if (searchText === "") {
      return currentValues;
    } else {
      const searched = products?.filter((val) =>
        val.name.toLowerCase().includes(searchText.toLowerCase())
      );
      return searched;
    }
  };
  const processedProducts = filteredProduct();

  const productUI = (
    <div className="product-table table">
      <div className="product-table-header table-header">
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p>Stock</p>
      </div>
      <div className="scroll-vertical">
        {processedProducts.map((p) => (
          <div className="product-table-body table-body" key={p._id}>
            <p className="page-link" onClick={() => handleRedirect(p._id)}>
              {p.name}
            </p>
            <p>{p?.category?.name}</p>
            <p>{p.price}</p>
            <p>{p.stock}</p>
            <div className="row align-center">
              <FaTrash
                onClick={() => dispatch(deleteProduct(p._id))}
                className="trash-icon icon"
              />
              <FaEdit
                className="edit-icon icon"
                onClick={() => {
                  setToggleForm(true);
                  dispatch(onEditProduct(p));
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Layout message={message} loading={loading} clearMessage={clearMessage}>
      {toggleForm ? (
        <AddProductForm setToggleForm={setToggleForm} />
      ) : (
        <div className="container">
          <div className="table-container py-3">
            <Toolbar
              title="All Products"
              placeholder="Search products..."
              searchText={searchText}
              setSearchText={setSearchText}
              handleClick={displayFormHandler}
            />
            <div>{productUI}</div>
            <div className="table-footer">
              {searchText === "" && (
                <Pagination
                  itemsPerPage={productsPerPage}
                  totalItems={products?.length}
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

export default ProductScreen;
