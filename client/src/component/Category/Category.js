import React from "react";
import { Table } from "reactstrap";
import { FaTrash, FaEdit } from "react-icons/fa";
const Category = () => {
  return (
    <Table bordered>
      <thead>
        <tr>
          <th>Id</th>
          <th> Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Noodles</td>

          <td className="text-center">
            <FaEdit /> <FaTrash />{" "}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default Category;
