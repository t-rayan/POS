import React from "react";
import { Table } from "reactstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

const Products = () => {
  return (
    <Table bordered>
      <thead>
        <tr>
          <th>Id</th>
          <th> Name</th>
          <th>Stock</th>
          <th>Wholesale Price</th>
          <th>Quote Price</th>
          <th>Category</th>
          <th>Exp date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Korean Ramen</td>
          <td>100</td>
          <td>Rs.100</td>
          <td>Rs.150</td>
          <td>Noodles</td>
          <td>09/02/2021</td>
          <td className="text-center">
            <FaEdit /> <FaTrash />{" "}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default Products;
