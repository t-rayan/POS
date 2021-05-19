import React, { useEffect } from "react";
import { FaStore, FaShoppingBag } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadUser } from "../actions/authActions";
import { listOrders } from "../actions/orderActions";
import { listProducts } from "../actions/productActions";
import Button from "../components/Button";
import EmptyPage from "../components/EmptyPage";
import Layout from "../components/Layout";
import LineChart from "../components/LineChart";
import { FaChartPie } from "react-icons/fa";

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const authState = useSelector((state) => state.authState);
  const { userInfo, loading, isLoggedIn } = authState;
  const productState = useSelector((state) => state.productState);
  const { products } = productState;
  const orderState = useSelector((state) => state.orderState);
  const { orders } = orderState;
  // useeffect hook
  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/");
    }
    dispatch(loadUser());
    dispatch(listProducts());
    dispatch(listOrders());
  }, [dispatch]);

  return (
    <Layout loading={loading}>
      {products?.length === 0 ? (
        <EmptyPage>
          <FaChartPie className="empty-icon" />
          <h4>Hello, {userInfo?.name} </h4>
          <p>Welcome to your dashboard. Please add products to get started.</p>

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
        <div className="dashboard">
          <div className="welcome-card">
            <h3>
              Welcome <br /> <span>{userInfo?.name}</span>
            </h3>
          </div>
          <div className="products-card">
            <div>
              <FaStore size="30" className="dashboard-icon" />
            </div>
            <div className="mt-1">
              <p>Total Products</p>
              <p>{products?.length}</p>
            </div>
          </div>
          <div className="orders-card">
            <div>
              <FaShoppingBag size="30" className="dashboard-icon" />
            </div>
            <div className="mt-1">
              <p>Total Orders</p>
              <p>{orders?.length}</p>
            </div>
          </div>
          <div className="lineChart-card">
            <LineChart />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DashboardScreen;
