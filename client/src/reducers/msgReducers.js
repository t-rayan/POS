import { SET_MESSAGE, CLEAR_MESSAGE } from "../constants/msgConstants";

const initState = {};

export const msgReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return {
        message: payload,
      };

    case CLEAR_MESSAGE:
      return { message: "" };

    default:
      return state;
  }
};
