import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { listCategory } from "../actions/categoryActions";
import { createProduct, editProduct } from "../actions/productActions";
import {
  CLEAR_PRODUCT_ERRORS,
  PRODUCT_EDIT_RESET,
} from "../constants/productConstants";
import Button from "./Button";
import MessageBox from "./MessageBox";
import FormLayout from "./FormLayout";
import { FaTimes } from "react-icons/fa";

const AddProductForm = () => {
  const history = useHistory();

  const [pid, setPId] = useState("");
  const [pname, setPName] = useState("");
  const [pprice, setPPrice] = useState(0);
  const [pcategory, setPCategory] = useState("");
  const [pstock, setPStock] = useState(0);
  const [pdesc, setPDesc] = useState("");

  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.categoryState);
  const productState = useSelector((state) => state.productState);
  const { editable, loading, error } = productState;
  const { categories } = categoryState;

  useEffect(() => {
    dispatch(listCategory());
    setTimeout(() => {
      dispatch({ type: CLEAR_PRODUCT_ERRORS });
    }, 5000);
    if (editable !== null) {
      setPId(editable._id);
      setPName(editable.name);
      setPPrice(editable.price);
      setPCategory(editable.category);
      setPStock(editable.stock);
      setPDesc(editable.desc);
    } else {
      setPId("");
      setPName("");
      setPPrice("");
      setPCategory("");
      setPStock("");
      setPDesc("");
    }
  }, [dispatch, editable]);

  const clearState = () => {
    setPId("");
    setPName("");
    setPPrice("");
    setPCategory("");
    setPStock("");
    setPDesc("");
  };

  // cancel form or close form
  const closeFormHandler = (e) => {
    e.preventDefault();
    dispatch({ type: PRODUCT_EDIT_RESET });
    dispatch({ type: CLEAR_PRODUCT_ERRORS });
    history.push("/products");
  };

  // dispatching createProduct function
  const handleSubmit = (e) => {
    e.preventDefault();
    const new_product = {
      _id: pid,
      name: pname,
      price: pprice,
      stock: pstock,
      category: pcategory,
      desc: pdesc,
    };

    if (editable !== null) {
      dispatch(editProduct(new_product));
      clearState();
    } else {
      dispatch(createProduct(new_product));
      clearState();
    }
  };

  return (
    <FormLayout>
      <form className="form product-form">
        <div className="row mb-2">
          <h3>{editable !== null ? "Edit Product" : "Add Product"}</h3>
        </div>
        <div className="row column sub-column input-groups">
          <input
            type="text"
            name="pname"
            placeholder="Product Name"
            value={pname}
            onChange={(e) => {
              setPName(e.target.value);
              dispatch({ type: CLEAR_PRODUCT_ERRORS });
            }}
          />
        </div>
        <div className="grid-layout input-groups">
          <div>
            <input
              type="number"
              name="pstock"
              placeholder="0"
              value={pstock}
              className="stock-input"
              onChange={(e) => setPStock(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              name="pprice"
              placeholder="Rs.100"
              value={pprice}
              onChange={(e) => setPPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="input-groups">
          <select
            id="category"
            name="pcategory"
            value={pcategory}
            className="category-input"
            onChange={(e) => setPCategory(e.target.value)}
          >
            <option>Select Category</option>
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="row column sub-column input-groups">
          <textarea
            name="pdesc"
            placeholder="Product Description"
            value={pdesc}
            onChange={(e) => setPDesc(e.target.value)}
          ></textarea>
        </div>
        {error ? (
          <MessageBox variant="danger">
            <div className="row">
              <p>{error}</p>
              <FaTimes
                className="icon"
                onClick={() => dispatch({ type: CLEAR_PRODUCT_ERRORS })}
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
            {editable !== null ? "Update " : "Add "}
          </Button>
          <Button className="btn btn-sm cancel" handleClick={closeFormHandler}>
            Cancel
          </Button>
        </div>
      </form>
    </FormLayout>
  );
};

export default AddProductForm;
