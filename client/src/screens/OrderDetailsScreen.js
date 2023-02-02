import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { orderDetails } from "../actions/orderActions";
import DetailsLayout from "../components/DetailsLayout";
import LoadingBox from "../components/LoadingBox";

const OrderDetailsScreen = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();

  const orderState = useSelector((state) => state.orderState);
  const { loading, order } = orderState;

  useEffect(() => {
    dispatch(orderDetails(id));
  }, [dispatch]);

  const handleRedirect = (e) => {
    e.preventDefault();
    history.push("/orders");
  };

  if (loading) {
    return <LoadingBox classname="loader" />;
  }
  return (
    <DetailsLayout
      title="Order Details"
      handleRedirect={handleRedirect}
      className="grid-layout"
    >
      <div className="left-section">
        <div>
          <p className="text-id text-muted">ID#:</p>
          <p className="id-value">{id}</p>
        </div>
        <div className="mt-3">
          <p className="text-id text-muted ">Created At#:</p>
          <p className="id-value">{order?.created_at}</p>
        </div>
        <div className="mt-3">
          <p className="text-id text-muted ">Total Price#:</p>
          <p className="id-value">Rs. {order?.totalPrice}</p>
        </div>
        <div className="mt-3">
          <p className="text-id text-muted ">Total Products#:</p>
          <p className="id-value">{order?.totalProducts}</p>
        </div>
        <div className="mt-3">
          <p className="text-id text-muted ">Discount#:</p>
          <p className="id-value">{order?.discount ? order.discount : "0"} %</p>
        </div>
      </div>

      <div className="right-section">
        <p className="text-id text-muted">All Items#</p>
        {order?.orderItems &&
          order?.orderItems.map((item) => (
            <div className="order-items mt-1" key={item.name}>
              <p className="id-value">{item.name}</p>
              <p className="id-value">{item.qty}</p>
              <p className="id-value">Rs. {item.finalPrice}</p>
            </div>
          ))}
      </div>
    </DetailsLayout>
  );
};

export default OrderDetailsScreen;
