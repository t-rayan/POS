import React from "react";

const Button = ({ handleClick, text, className }) => {
  return (
    <button className={className} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
