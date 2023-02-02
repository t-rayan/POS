import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ProductList from "../components/ProductList";
import Transaction from "../components/Transaction";
import EmptyPage from "../components/EmptyPage";
import Button from "../components/Button";
import { FaShoppingBasket } from "react-icons/fa";

const ShopScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const productState = useSelector((state) => state.productState);
  const { loading, error, products } = productState;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingBox classname="loader" />
      ) : error ? (
        <MessageBox variant="danger"> {error} </MessageBox>
      ) : (
        <>
          {products.length === 0 ? (
            <EmptyPage>
              <FaShoppingBasket className="empty-icon" />
              <h3>No Products</h3>
              <p>Please add products to start selling.</p>
              <Button
                className="btn btn-sm primary"
                handleClick={() => {
                  history.push("/products");
                }}
              >
                Add Products
              </Button>
            </EmptyPage>
          ) : (
            <div className="home-grid">
              <div className="item-selection-screen">
                <ProductList />
              </div>
              <div className="order-screen p-2 p-y">
                <Transaction />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShopScreen;
