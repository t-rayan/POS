import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ProductList from "../components/ProductList";
import Transaction from "../components/Transaction";

const ShopScreen = () => {
  const dispatch = useDispatch();

  const productState = useSelector((state) => state.productState);
  const { loading, error } = productState;

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
          <div className="home-grid">
            <div className="item-selection-screen">
              <ProductList />
            </div>
            <div className="order-screen p-2 p-y">
              <Transaction />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShopScreen;
