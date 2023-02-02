import React from "react";
import Button from "../components/Button";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const Pagination = ({
  itemsPerPage,
  totalItems,
  increaseValue,
  currentPage,
  decreaseValue,
  indexOfLastValue,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className=" row column-start">
      <ul className="row start column">
        {/* {pageNumbers.map((number) => (
          <li key={number} className="page-item ">
            <a onClick={() => paginate(number)} href="#" className="page-link">
              {number}
            </a>
          </li>
        ))} */}
        <div className="row">
          <Button
            className="btn btn-xs left-arrow "
            disabled={currentPage === 1}
            handleClick={decreaseValue}
          >
            <FaArrowLeft />
          </Button>

          <div className="p-1">
            <p className="pagination-text">{`${currentPage} of ${totalItems}`}</p>
          </div>

          <Button
            className="btn btn-xs right-arrow"
            handleClick={increaseValue}
            disabled={indexOfLastValue >= totalItems}
          >
            <FaArrowRight />
          </Button>
        </div>
      </ul>
    </div>
  );
};

export default Pagination;
