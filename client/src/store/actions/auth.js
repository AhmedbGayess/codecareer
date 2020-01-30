import axios from "axios";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER, SET_AUTH_ERROR } from "../types";
import setAuthToken from "../../utils/setAuthToken";

export const login = (userInfo, history) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/users/login", userInfo);
    localStorage.setItem("authToken", data.token);
    const decoded = jwt_decode(data.token);
    setAuthToken(decoded);
    dispatch(setCurrentUser(decoded));
    dispatch(resetAuthError());
    history.push("/azerty");
  } catch (err) {
    dispatch({
      type: SET_AUTH_ERROR,
      payload: "Incorrect email or password"
    });
  }
};

export const registerUser = (userInfo, history) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/users", userInfo);
    localStorage.setItem("authToken", data.token);
    const decoded = jwt_decode(data.token);
    setAuthToken(decoded);
    dispatch(setCurrentUser(decoded));
    dispatch(resetAuthError());
    history.push("/azerty");
  } catch (err) {
    if (err.response.data.includes("duplicate key")) {
      dispatch({
        type: SET_AUTH_ERROR,
        payload: "Email already used"
      });
    }
  }
};

export const resetAuthError = () => ({
  type: SET_AUTH_ERROR,
  payload: ""
});

export const logout = () => (dispatch) => {
  localStorage.removeItem("authToken");
  setAuthToken(null);
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = (decoded) => ({
  type: SET_CURRENT_USER,
  payload: decoded
});
