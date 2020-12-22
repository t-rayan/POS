import React, { useContext } from "react";
import { Category, ConfirmModal } from "../component";
import { Container } from "reactstrap";
import { CustomButton } from "../component/UI";
import UiContext from "../context/UiContext/UiContext";

const CategoryPage = () => {
  const { setCategoryForm } = useContext(UiContext);
  const handleClick = (e) => {
    e.preventDefault();
    setCategoryForm();
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-end mb-4 flex-wrap">
        <CustomButton
          text="Add new"
          className="btn btn-primary"
          handleClick={handleClick}
        />
      </div>
      <Category />
      <ConfirmModal formTitle="Add new category" />
    </Container>
  );
};

export default CategoryPage;
