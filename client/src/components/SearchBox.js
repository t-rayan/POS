import React from "react";
import { FaSearch } from "react-icons/fa";
const SearchBox = ({ type, placeholder, searchText, onChange }) => {
  return (
    <div className="search-box">
      <span className="search-icon">
        <FaSearch />
      </span>
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
