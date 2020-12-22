import React from "react";
import { Table } from "reactstrap";

const Cart = () => {
  const style = {
    backgroundColor: "#ccc",
    maxHeight: "300px",
    height: "300px",
    overflowY: "scroll",
    borderRadius: "5px",
  };
  return (
    <div style={style} className="mt-2 mb-5">
      <Table borderless>
        <thead>
          <tr>
            <th>SN</th>
            <th>PRODUCT</th>
            <th>QUANTITY</th>
            <th>PRICE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Sausages</td>
            <td>5</td>
            <td>Rs.1500</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Cart;
