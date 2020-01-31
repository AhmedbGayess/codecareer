import { SET_POST, SET_POSTS, SET_POST_LOADING } from "../types";

const initialState = {
  post: null,
  posts: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POST_LOADING:
      return { ...state, loading: true };
    case SET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
