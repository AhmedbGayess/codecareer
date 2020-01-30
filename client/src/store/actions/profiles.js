import axios from "axios";

import { SET_PROFILE, SET_PROFILES, SET_PROFILE_LOADING } from "../types";

export const editProfile = (profileData, history) => async (dispatch) => {
  try {
    await axios.post("/api/profiles", profileData);
    history.push("/home");
  } catch (err) {
    console.log(err);
  }
};
