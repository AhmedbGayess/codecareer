import axios from "axios";

import { SET_PROFILE, SET_PROFILES, SET_PROFILE_LOADING } from "../types";

export const editProfile = (profileData, history) => async (dispatch) => {
  console.log(profileData);
  try {
    await axios.post("/api/profiles", profileData);
    history.push("/home");
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

const setProfileLoading = () => ({
  type: SET_PROFILE_LOADING
});
