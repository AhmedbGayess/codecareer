import {
  ADD_POST,
  DELETE_POST,
  SET_POST,
  SET_POSTS,
  SET_POST_LOADING,
  LIKE_POST,
  ADD_COMMENT,
  DELETE_COMMENT
} from "../types";

const initialState = {
  post: null,
  posts: [],
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
        posts: [...state.posts, ...action.payload],
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
    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id
            ? { ...post, likes: action.payload.likes }
            : post
        )
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments]
        }
      };
    case DELETE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== action.payload
          )
        }
      };
    default:
      return state;
  }
};
