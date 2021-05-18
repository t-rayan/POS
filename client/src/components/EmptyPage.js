import React from "react";

const EmptyPage = ({ children, title }) => {
  return (
    <div className=" empty-container">
      <div> {children}</div>
    </div>
  );
};

export default EmptyPage;
