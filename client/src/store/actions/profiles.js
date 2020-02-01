import axios from "axios";

import {
  SET_PROFILE,
  SET_PROFILES,
  SET_PROFILE_LOADING,
  CLEAR_PROFILES
} from "../types";

export const editProfile = (profileData, history) => async (dispatch) => {
  try {
    await axios.post("/api/profiles", profileData);
    history.push("/me");
  } catch (err) {
    console.log(err);
  }
};

export const getOwnProfile = () => async (dispatch) => {
  dispatch(setProfileLoading());
  try {
    const { data } = await axios.get("/api/profiles/my-profile");
    dispatch({
      type: SET_PROFILE,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: SET_PROFILE,
      payload: {}
    });
  }
};

export const getProfile = (id) => async (dispatch) => {
  dispatch(setProfileLoading());
  try {
    const { data } = await axios.get(`/api/profiles/user/${id}`);
    dispatch({
      type: SET_PROFILE,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: SET_PROFILE,
      payload: {}
    });
  }
};

export const getProfiles = (skip, search) => async (dispatch) => {
  dispatch(setProfileLoading());
  try {
    const { data } = await axios.get(
      `/api/profiles?skip=${skip}&search=${search}`
    );
    dispatch({
      type: SET_PROFILES,
      payload: data
    });
  } catch (err) {
    console.log(err);
  }
};

export const clearProfiles = () => ({
  type: CLEAR_PROFILES
});

const setProfileLoading = () => ({
  type: SET_PROFILE_LOADING
});
