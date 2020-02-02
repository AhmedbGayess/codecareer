import axios from "axios";
import { SET_JOB, SET_JOBS, SET_JOB_LOADING, CLEAR_JOBS } from "../types";

export const addJob = (jobData, history) => async (dispatch) => {
  try {
    await axios.post("/api/jobs", jobData);
    history.push("/home");
  } catch (err) {
    console.log(err);
  }
};

export const getJob = (id) => async (dispatch) => {
  dispatch(setJobLoading());
  try {
    const {data} = await axios.get(`/api/jobs/${id}`);
    dispatch({
      type: SET_JOB,
      payload: data
    })
  } catch (err) {
    console.log(err)
  }
}

export const editJob = (id, jobData, history) => {
  try {
    await axios.patch(`/api/jobs/${id}`, jobData);
    history.push("/home");
  } catch (err) {
    console.log(err);
  }
}

const setJobLoading = () => ({
  type: SET_JOB_LOADING
});
