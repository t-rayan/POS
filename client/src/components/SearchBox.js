import React from "react";
import { useDispatch } from "react-redux";
import { onProductSearch } from "../actions/productActions";
import Button from "./Button";

const SearchBox = ({ type, placeholder, searchText, onChange }) => {
  console.log(searchText);
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        className="search-input"
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBox;
