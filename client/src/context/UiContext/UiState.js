import React, { useReducer } from "react";
import UiContext from "./UiContext";
import UiReducer from "./UiReducer";
import {
  SET_STATUS,
  SET_PRODUCTADDFORM,
  SET_TRANSACTIONFORM,
  SET_CATEGORYFORM,
} from "../types";

const UiState = (props) => {
  const initialState = {
    status: false,
    openTransactionForm: false,
    openProductAddForm: false,
    openCategoryForm: false,
  };

  const [state, dispatch] = useReducer(UiReducer, initialState);

  //SETTING MODAL STATE
  const setStatus = () => {
    dispatch({
      type: SET_STATUS,
    });
  };

  // open productAddForm
  const setProductAddForm = () => {
    dispatch({
      type: SET_PRODUCTADDFORM,
    });
  };

  // open productAddForm
  const setTransactionForm = () => {
    dispatch({
      type: SET_TRANSACTIONFORM,
    });
  };

  // open category form
  const setCategoryForm = () => {
    dispatch({
      type: SET_CATEGORYFORM,
    });
  };

  return (
    <div>
      <UiContext.Provider
        value={{
          status: state.status,
          openProductAddForm: state.openProductAddForm,
          openTransactionForm: state.openTransactionForm,
          openCategoryForm: state.openCategoryForm,
          setStatus,
          setProductAddForm,
          setTransactionForm,
          setCategoryForm,
        }}
      >
        {props.children}
      </UiContext.Provider>
    </div>
  );
};

export default UiState;
