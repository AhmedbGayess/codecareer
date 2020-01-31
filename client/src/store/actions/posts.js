import axios from "axios";
import {
  ADD_POST,
  DELETE_POST,
  SET_POST,
  SET_POSTS,
  SET_POST_LOADING,
  LIKE_POST,
  ADD_COMMENT
} from "../types";

export const addPost = (text) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/posts", { text });
    dispatch({
      type: ADD_POST,
      payload: data
    });
  } catch (err) {
    console.log(err);
  }
};

export const getPosts = (skip) => async (dispatch) => {
  dispatch(setPostLoading());
  try {
    const { data } = await axios.get(`/api/posts?skip=${skip}`);
    dispatch({
      type: SET_POSTS,
      payload: data
    });
  } catch (err) {
    console.log(err);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`/api/posts/like/${id}`);
    dispatch({
      type: LIKE_POST,
      payload: { id, likes: data }
    });
  } catch (err) {}
};

export const getPost = (id) => async (dispatch) => {
  dispatch(setPostLoading());
  try {
    const { data } = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: SET_POST,
      payload: data
    });
  } catch (err) {
    console.log(err);
  }
};

export const addComment = (id, text) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/api/posts/comment/${id}`, { text });
    dispatch({
      type: ADD_COMMENT,
      payload: data
    });
  } catch (err) {
    console.log(err);
  }
};

const setPostLoading = () => ({
  type: SET_POST_LOADING
});
