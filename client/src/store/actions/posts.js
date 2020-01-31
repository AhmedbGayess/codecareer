import axios from "axios";
import {
  ADD_POST,
  DELETE_POST,
  SET_POST,
  SET_POSTS,
  SET_POST_LOADING
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
