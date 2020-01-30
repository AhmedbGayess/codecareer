import axios from "axios";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "../types";
import setAuthToken from "../../utils/setAuthToken";

export const login = (userInfo, history) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/users/login", userInfo);
    localStorage.setItem("authToken", data.token);
    const decoded = jwt_decode(data.token);
    setAuthToken(decoded);
    dispatch(setCurrrentUser(decoded));
    history.push("/azerty");
  } catch (err) {
    console.log(err);
  }
};

export const registerUser = (userInfo, history) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/users", userInfo);
    localStorage.setItem("authToken", data.token);
    const decoded = jwt_decode(data.token);
    setAuthToken(decoded);
    dispatch(setCurrrentUser(decoded));
    history.push("/azerty");
  } catch (err) {
    console.log(err);
  }
};

export const logout = (history) => (dispatch) => {
  localStorage.removeItem("token");
  setAuthToken(null);
  dispatch(setCurrrentUser({}));
  history.push("/");
};

const setCurrrentUser = (decoded) => ({
  type: SET_CURRENT_USER,
  payload: decoded
});
