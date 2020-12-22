import React, { useState, useContext } from "react";
import { Form } from "reactstrap";
import UiContext from "../../context/UiContext/UiContext";
import { InputField, CustomButton } from "../UI";

const AddProductForm = () => {
  const { setStatus } = useContext(UiContext);

  const [inputValue, setInputValue] = useState({
    name: "",
    category: "",
    wholesaleprice: "",
    quoteprice: "",
    stock: "",
    expdate: "",
  });
  const {
    name,
    category,
    wholesaleprice,
    quoteprice,
    stock,
    expdate,
  } = inputValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(inputValue);
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log(inputValue);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setStatus();
  };

  return (
    <Form>
      <InputField
        type="text"
        value={name}
        placeholder="Product Name"
        label="Name"
        name="name"
        onChange={handleChange}
      />
      <div className="d-flex justify-content-between">
        <InputField
          type="number"
          value={wholesaleprice}
          placeholder="Rs.100"
          label="Wholesale Price"
          name="wholesaleprice"
          onChange={handleChange}
        />
        <InputField
          type="number"
          value={quoteprice}
          placeholder="Rs.100"
          label="Quote Price"
          name="quoteprice"
          onChange={handleChange}
        />
      </div>

      <div className="d-flex justify-content-between">
        <InputField
          type="number"
          value={stock}
          placeholder="1"
          label="Stock"
          name="stock"
          onChange={handleChange}
        />
        <InputField
          type="text"
          value={category}
          placeholder="category"
          label="Category"
          name="category"
          onChange={handleChange}
        />
      </div>
      <InputField
        type="date"
        value={expdate}
        label="Exp date"
        name="expdate"
        onChange={handleChange}
      />
      <div className="mt-4">
        <CustomButton
          className="btn btn-primary mr-2 "
          text="Add"
          handleClick={handleClick}
        />
        <CustomButton
          className="btn btn-danger"
          text="Cancel"
          handleClick={closeModal}
        />
      </div>
    </Form>
  );
};

export default AddProductForm;
