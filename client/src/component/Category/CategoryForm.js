import React from "react";
import { Form } from "reactstrap";
import { CustomButton, InputField } from "../UI";
const CategoryForm = () => {
  const handleClick = (e) => {
    e.preventDefault();
    alert("category added");
  };
  return (
    <Form>
      <InputField type="text" placeholder="Category Name" label="Name" />
      <CustomButton
        text="Add"
        className="btn btn-primary"
        handleClick={handleClick}
      />
    </Form>
  );
};

export default CategoryForm;
