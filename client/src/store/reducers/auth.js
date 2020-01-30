import { SET_CURRENT_USER } from "../types";

const initialState = {
  user: {},
  isAuthenticated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        user: action.payload,
        isAuthenticated: !!Object.keys(action.payload).length
      };
    default:
      return state;
  }
};
