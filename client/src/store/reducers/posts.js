import {
  ADD_POST,
  DELETE_POST,
  SET_POST,
  SET_POSTS,
  SET_POST_LOADING
} from "../types";

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
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload)
      };
    default:
      return state;
  }
};
