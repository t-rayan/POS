import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { categoryDetails } from "../actions/categoryActions";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";
import { FaArrowLeft } from "react-icons/fa";
import LoadingBox from "../components/LoadingBox";
import DetailsLayout from "../components/DetailsLayout";

const CategoryDetailsScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(categoryDetails(id));
  }, [dispatch]);

  const categoryState = useSelector((state) => state.categoryState);
  const { loading, category, error } = categoryState;

  const handleRedirect = (e) => {
    e.preventDefault();
    history.push("/categories");
  };

  if (loading) {
    return <LoadingBox classname="loader" />;
  }

  return (
    <DetailsLayout title="Category Details" handleRedirect={handleRedirect}>
      <div>
        <p className="text-id text-muted">ID#:</p>
        <p className="id-value">{id}</p>
      </div>
      <div className="mt-3">
        <p className="text-id text-muted ">Name#:</p>
        <p className="id-value">{category?.name}</p>
      </div>
    </DetailsLayout>
  );
};

export default CategoryDetailsScreen;
