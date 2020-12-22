import React, { useContext } from "react";
import { Products, ConfirmModal } from "../component";

import { Container, Button } from "reactstrap";
import UiContext from "../context/UiContext/UiContext";
import { CustomButton } from "../component/UI";

const ProductPage = () => {
  const { setProductAddForm } = useContext(UiContext);
  const handleClick = (e) => {
    e.preventDefault();
    setProductAddForm();
  };
  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between mb-4  flex-wrap">
        <input type="text" placeholder="Search products" className="px-2" />

        <CustomButton
          className="btn btn-primary"
          text="Add new"
          handleClick={handleClick}
        />
      </div>
      <Products />
      <ConfirmModal formTitle="Add new product" />
    </Container>
  );
};

export default ProductPage;
