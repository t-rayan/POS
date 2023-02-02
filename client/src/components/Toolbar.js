import React from "react";
import Button from "./Button";
import SearchBox from "./SearchBox";

const Toolbar = ({
  title,
  placeholder,
  handleClick,
  searchText,
  setSearchText,
}) => {
  return (
    <>
      <div className="row end">
        <h4 className="title">{title}</h4>
        <SearchBox
          type="text"
          placeholder={placeholder}
          className="search-input mr-3"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          className="btn btn-sm primary link-btn"
          handleClick={handleClick}
        >
          Add
        </Button>
      </div>
    </>
  );
};

export default Toolbar;
