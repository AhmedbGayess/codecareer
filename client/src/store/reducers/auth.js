import { SET_CURRENT_USER, SET_AUTH_ERROR } from "../types";

const initialState = {
  user: {},
  isAuthenticated: false,
  authError: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!Object.keys(action.payload).length
      };
    case SET_AUTH_ERROR:
      return {
        ...state,
        authError: action.payload
      };
    default:
      return state;
  }
};
