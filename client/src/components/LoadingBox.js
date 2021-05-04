import React from "react";

const LoadingBox = ({ classname }) => {
  return (
    <div className="loading-box">
      <div className={classname}></div>
    </div>
  );
};

export default LoadingBox;
