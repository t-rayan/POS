import React, { useContext } from "react";
import { Button } from "reactstrap";
import UiContext from "../../context/UiContext/UiContext";
import { ConfirmModal } from "../../component";

const Transaction = () => {
  const { setTransactionForm } = useContext(UiContext);

  const style = {
    display: "flex",
    justifyContent: "space-between",
  };

  return (
    <div>
      <div className="subtotal" style={style}>
        <p>SUB TOTAL</p>
        <p>Rs.1000</p>
      </div>
      <div className="tax" style={style}>
        <p>TAX</p>
        <p>13%</p>
      </div>
      <div className="discounts" style={style}>
        <p>DISCOUNTS</p>
        <p>10%</p>
      </div>
      <div className="TOTAL" style={style}>
        <h5> TOTAL</h5>
        <p>Rs.1100</p>
      </div>
      <Button
        color="primary"
        size="lg"
        block
        onClick={() => setTransactionForm()}
      >
        PAY NOW
      </Button>
      <ConfirmModal formTitle="Confirm Transaction" />
    </div>
  );
};

export default Transaction;
