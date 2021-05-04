import React, { useEffect } from "react";
import { FaStore, FaShoppingBag } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { listOrders } from "../actions/orderActions";
import { listProducts } from "../actions/productActions";
import LineChart from "../components/LineChart";

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authState);
  const { userInfo } = authState;
  const productState = useSelector((state) => state.productState);
  const { products } = productState;
  const orderState = useSelector((state) => state.orderState);
  const { orders } = orderState;
  // useeffect hook
  useEffect(() => {
    dispatch(listProducts());
    dispatch(listOrders());
  }, [dispatch]);
  return (
    <div className="dashboard p-5 flex">
      <div className="welcome-card">
        <h2>
          Welcome, <br /> <span>Mr.{userInfo?.name}</span>
        </h2>
      </div>
      <div className="products-card">
        <div>
          <FaStore size="30" className="dashboard-icon" />
        </div>
        <div>
          <p>Total Products</p>
          <p>{products?.length}</p>
        </div>
      </div>
      <div className="orders-card">
        <div>
          <FaShoppingBag size="30" className="dashboard-icon" />
        </div>
        <div>
          <p>Total Orders</p>
          <p>{orders?.length}</p>
        </div>
      </div>
      <div className="lineChart-card">
        <LineChart />
      </div>
    </div>
  );
};

export default DashboardScreen;
