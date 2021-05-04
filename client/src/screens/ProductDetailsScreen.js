import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { productDetails } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import DetailsLayout from "../components/DetailsLayout";

const ProductDetailsScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  const productState = useSelector((state) => state.productState);
  const { loading, product } = productState;

  useEffect(() => {
    dispatch(productDetails(id));
  }, [dispatch]);

  const handleRedirect = (e) => {
    e.preventDefault();
    history.push("/products");
  };

  if (loading) {
    return <LoadingBox classname="loader" />;
  }
  return (
    <DetailsLayout title="Product Details" handleRedirect={handleRedirect}>
      <div>
        <p className="text-id text-muted">ID#:</p>
        <p className="id-value">{id}</p>
      </div>
      <div className="mt-3">
        <p className="text-id text-muted ">Name#:</p>
        <p className="id-value">{product?.name}</p>
      </div>
      <div className="mt-3">
        <p className="text-id text-muted ">Price#:</p>
        <p className="id-value">{product?.price}</p>
      </div>
      <div className="mt-3">
        <p className="text-id text-muted ">Stock#:</p>
        <p className="id-value">{product?.stock}</p>
      </div>
      <div className="mt-3">
        <p className="text-id text-muted ">Desc#:</p>
        <p className="id-value">{product?.desc}</p>
      </div>
    </DetailsLayout>
  );
};

export default ProductDetailsScreen;
