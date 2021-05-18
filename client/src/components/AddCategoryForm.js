import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, editCategory } from "../actions/categoryActions";
import {
  CATEGORY_EDIT_RESET,
  CLEAR_CATEGORY_ERRORS,
} from "../constants/categoryConstants";
import Button from "./Button";
import MessageBox from "./MessageBox";
import FormLayout from "./FormLayout";
import { useHistory } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AddCategoryForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [cname, setCname] = useState("");

  const categoryState = useSelector((state) => state.categoryState);
  const { editable, error, loading } = categoryState;

  useEffect(() => {
    if (editable !== null || undefined) {
      setCname(editable.name);
    } else {
      setCname("");
    }
  }, [dispatch]);

  // cancel form or close form
  const closeFormHandler = (e) => {
    e.preventDefault();
    dispatch({ type: CATEGORY_EDIT_RESET });
    dispatch({ type: CLEAR_CATEGORY_ERRORS });
    history.push("/categories");
  };

  // function to handle add and edit
  const handleSubmit = (e) => {
    e.preventDefault();
    const new_category = {
      name: cname,
    };

    if (editable !== null) {
      dispatch(editCategory(editable._id, new_category));
      setCname("");
    } else {
      dispatch(createCategory(new_category));
      setCname("");
    }
  };

  return (
    <FormLayout>
      <form className="category-form">
        <div className="row mb-2">
          <h3>{editable !== null ? "Edit Category" : "Add Category"}</h3>
        </div>
        <div className="row column sub-column input-groups">
          <input
            type="text"
            name="cname"
            placeholder="Category Name"
            value={cname}
            onChange={(e) => {
              setCname(e.target.value);
              dispatch({ type: CLEAR_CATEGORY_ERRORS });
            }}
          />
        </div>
        {error ? (
          <MessageBox variant="danger">
            <div className="row">
              <p>{error}</p>
              <FaTimes
                className="icon"
                onClick={() => dispatch({ type: CLEAR_CATEGORY_ERRORS })}
              />
            </div>
          </MessageBox>
        ) : null}

        <div className="btn-holder">
          <Button
            className="btn btn-sm primary"
            handleClick={handleSubmit}
            disabled={loading}
          >
            {editable !== null ? "Update Category" : "Add"}
          </Button>
          <Button className="btn btn-sm cancel" handleClick={closeFormHandler}>
            Cancel
          </Button>
        </div>
      </form>
    </FormLayout>
  );
};

export default AddCategoryForm;
