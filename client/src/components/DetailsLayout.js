import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import Button from "./Button";

const DetailsLayout = ({ children, title, handleRedirect, className }) => {
  return (
    <div className="wrapper">
      <div className=" container ">
        <div className="details-container">
          <div className="mb-2">
            <h2 className="page-title">{title}</h2>
          </div>
          <div className={className}>{children}</div>
          <div className="row start mt-3">
            <Button
              handleClick={handleRedirect}
              className="btn row center back-btn"
            >
              <FaArrowLeft className="back-icon" />
              <p className="p-1">Back</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsLayout;
