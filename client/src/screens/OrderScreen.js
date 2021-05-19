import React, { useEffect, useState } from "react";
import Toolbar from "../components/Toolbar";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, listOrders } from "../actions/orderActions";
import { FaTrash, FaFolderOpen } from "react-icons/fa";
import LoadingBox from "../components/LoadingBox";
import EmptyPage from "../components/EmptyPage";
import { getCurrentValues } from "../utils/getCurrentValues";
import Pagination from "../components/Pagination";
import Moment from "react-moment";
import { useHistory } from "react-router-dom";
import Layout from "../components/Layout";
import { CLEAR_ORDER_MESSAGE } from "../constants/orderConstants";
import Button from "../components/Button";

const OrderScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");

  const orderState = useSelector((state) => state.orderState);

  const { orders, loading } = orderState;
  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  const { currentValues, indexOfLastValue } = getCurrentValues(
    currentPage,
    ordersPerPage,
    orders
  );

  const increaseValue = () => setCurrentPage(currentPage + 1);
  const decreaseValue = () => setCurrentPage(currentPage - 1);

  const handleRedirect = (orderId) => {
    history.push(`orders/${orderId}`);
  };

  const redirectToHome = (e) => {
    e.preventDefault();
    history.push("/shop");
  };

  // filtering products
  const filteredOrders = () => {
    if (searchText === "") {
      return currentValues;
    } else {
      const searched = orders?.filter((val) =>
        val._id.toLowerCase().includes(searchText.toLowerCase())
      );
      return searched;
    }
  };
  const processedOrders = filteredOrders();

  const orderUI = (
    <div className="order-table table">
      <div className="order-table-header table-header">
        <p>Order Date</p>
        <p>Total Product</p>
        <p>Total Price</p>
      </div>
      <div className="scroll-vertical">
        {processedOrders?.map((order) => (
          <div className="order-table-body table-body" key={order._id}>
            <p className="page-link" onClick={() => handleRedirect(order._id)}>
              <Moment format="MMM Do YYYY, h:mm a">{order.orderDate}</Moment>
            </p>
            <p>{order.totalProducts}</p>
            <p>{order.totalPrice}</p>
            <div>
              <FaTrash
                onClick={() => dispatch(deleteOrder(order._id))}
                className="trash-icon icon"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return <LoadingBox classname="loader" />;
  } else if (orders?.length === 0) {
    return (
      <EmptyPage title="No Orders">
        <FaFolderOpen className="empty-icon" />
        <p>No orders</p>
        <Button
          className="btn btn-xs primary mt-1"
          handleClick={() => history.push("/shop")}
        >
          Add New
        </Button>
      </EmptyPage>
    );
  }
  return (
    <Layout loading={loading}>
      <div className="container">
        <div className="table-container py-3">
          <Toolbar
            title="All Orders"
            placeholder="Order ID"
            searchText={searchText}
            setSearchText={setSearchText}
            handleClick={redirectToHome}
          />
          <div>{orderUI}</div>
          <div className="table-footer">
            {searchText === "" && (
              <Pagination
                itemsPerPage={ordersPerPage}
                totalItems={orders?.length}
                increaseValue={increaseValue}
                decreaseValue={decreaseValue}
                currentPage={currentPage}
                indexOfLastValue={indexOfLastValue}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderScreen;
