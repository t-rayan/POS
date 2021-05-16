import React from "react";

const SearchBox = ({ type, placeholder, searchText, onChange }) => {
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
