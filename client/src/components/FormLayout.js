import React from "react";

const FormLayout = ({ children }) => {
  return (
    <div className="w">
      <div className="form-container">{children}</div>
    </div>
  );
};

export default FormLayout;
