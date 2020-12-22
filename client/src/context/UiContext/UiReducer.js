import {
  SET_STATUS,
  SET_PRODUCTADDFORM,
  SET_TRANSACTIONFORM,
  SET_CATEGORYFORM,
} from "../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, { type, payload }) => {
  switch (type) {
    case SET_STATUS:
      return {
        ...state,
        status: !state.status,
      };
    case SET_PRODUCTADDFORM:
      return {
        ...state,
        status: true,
        openProductAddForm: true,
        openTransactionForm: false,
        openCategoryForm: false,
      };
    case SET_TRANSACTIONFORM:
      return {
        ...state,
        status: true,
        openProductAddForm: false,
        openTransactionForm: true,
        openCategoryForm: false,
      };
    case SET_CATEGORYFORM:
      return {
        ...state,
        status: true,
        openProductAddForm: false,
        openTransactionForm: false,
        openCategoryForm: true,
      };
    default:
      return state;
  }
};
