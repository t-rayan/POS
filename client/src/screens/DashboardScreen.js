import React, { useEffect } from "react";
import { FaStore, FaShoppingBag } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../actions/authActions";
import { listOrders } from "../actions/orderActions";
import { listProducts } from "../actions/productActions";
import Layout from "../components/Layout";
import LineChart from "../components/LineChart";

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authState);
  const { userInfo, loading } = authState;
  const productState = useSelector((state) => state.productState);
  const { products } = productState;
  const orderState = useSelector((state) => state.orderState);
  const { orders } = orderState;
  // useeffect hook
  useEffect(() => {
    dispatch(loadUser());
    dispatch(listProducts());
    dispatch(listOrders());
  }, [dispatch]);
  return (
    <Layout loading={loading}>
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
    </Layout>
  );
};

export default DashboardScreen;
