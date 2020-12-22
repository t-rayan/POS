import React, { useState, useContext } from "react";
import { Form } from "reactstrap";
import UiContext from "../../context/UiContext/UiContext";
import { InputField, CustomButton } from "../UI";

const TransactionForm = () => {
  const { setStatus } = useContext(UiContext);
  const [inputValue, setInputValue] = useState({
    totalAmt: "",
    receivedAmt: "",
    changeAmt: "",
  });

  const { totalAmt, receivedAmt, changeAmt } = inputValue;

  // handle changes in input box
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log(e);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setStatus();
  };
  return (
    <Form>
      <InputField
        type="number"
        value={totalAmt}
        placeholder="Total Amount"
        label="Total Amount"
        name="totalAmt"
        onChange={handleChange}
      />
      <InputField
        type="number"
        value={receivedAmt}
        placeholder="Total Amount"
        label="Received Amount"
        name="receivedAmt"
        onChange={handleChange}
      />
      <InputField
        type="number"
        value={changeAmt}
        placeholder="Change Amount"
        label="Total Change"
        name="changeAmt"
        onChange={handleChange}
      />
      <div>
        <CustomButton
          text="Confirm"
          className="btn btn-primary mr-2"
          handleClick={handleClick}
        />
        <CustomButton
          text="Cancel"
          className="btn btn-danger"
          handleClick={closeModal}
        />
      </div>
    </Form>
  );
};

export default TransactionForm;
