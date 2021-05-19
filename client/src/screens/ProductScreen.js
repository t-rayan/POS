import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  listProducts,
  onEditProduct,
} from "../actions/productActions";
import { FaTrash, FaEdit, FaShoppingBasket } from "react-icons/fa";
import Toolbar from "../components/Toolbar";
import EmptyPage from "../components/EmptyPage";
import Button from "../components/Button";
import Pagination from "../components/Pagination";
import { getCurrentValues } from "../utils/getCurrentValues";
import Layout from "../components/Layout";
import { useHistory } from "react-router-dom";

const ProductScreen = () => {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();
  const productState = useSelector((state) => state.productState);
  const { loading, products } = productState;

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
    history.push("/addProduct");
  };
  const handleRedirect = (id) => {
    history.push(`/products/${id}`);
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
                className="trash-icon icon"
                onClick={() => {
                  dispatch(deleteProduct(p._id));
                }}
              />
              <FaEdit
                className="edit-icon icon"
                onClick={() => {
                  history.push("/addProduct");
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
    <Layout loading={loading}>
      {products?.length === 0 ? (
        <EmptyPage>
          <FaShoppingBasket className="empty-icon" />
          <h3>No Products</h3>
          <p>Please add products to start selling.</p>
          <Button
            className="btn btn-sm primary"
            handleClick={() => {
              history.push("/addProduct");
            }}
          >
            Add Products
          </Button>
        </EmptyPage>
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
