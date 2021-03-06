import axios from "axios";
import {
  SET_JOB,
  SET_JOBS,
  SET_JOB_LOADING,
  CLEAR_JOBS,
  APPLY_TO_JOB
} from "../types";

export const addJob = (jobData, history) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/jobs", jobData);
    history.push(`/job/${data._id}`);
  } catch (err) {
    console.log(err);
  }
};

export const getJob = (id) => async (dispatch) => {
  dispatch(setJobLoading());
  try {
    const { data } = await axios.get(`/api/jobs/${id}`);
    dispatch({
      type: SET_JOB,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: SET_JOB,
      payload: {}
    });
  }
};

export const getOwnJob = (id) => async (dispatch) => {
  dispatch(setJobLoading());
  try {
    const { data } = await axios.get(`/api/jobs/own-job/${id}`);
    dispatch({
      type: SET_JOB,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: SET_JOB,
      payload: {}
    });
  }
};

export const editJob = (id, jobData, history) => async () => {
  try {
    await axios.patch(`/api/jobs/${id}`, jobData);
    history.push(`/job/${id}`);
  } catch (err) {
    console.log(err);
  }
};

export const deleteJob = (id, history) => async () => {
  try {
    await axios.delete(`/api/jobs/${id}`);
    history.push("/my-jobs");
  } catch (err) {
    console.log(err);
  }
};

export const getJobs = (skip, search) => async (dispatch) => {
  dispatch(setJobLoading());
  try {
    const { data } = await axios.get(`/api/jobs?skip=${skip}&search=${search}`);
    dispatch({
      type: SET_JOBS,
      payload: data
    });
  } catch (err) {
    console.log(err);
  }
};

export const getOwnJobs = (skip) => async (dispatch) => {
  dispatch(setJobLoading());
  try {
    const { data } = await axios.get(`/api/jobs/own-jobs?skip=${skip}`);
    dispatch({
      type: SET_JOBS,
      payload: data
    });
  } catch (err) {
    console.log(err);
  }
};

export const applyToJob = (id) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/api/jobs/apply/${id}`);
    dispatch({
      type: APPLY_TO_JOB,
      payload: data
    });
  } catch (err) {
    console.log(err);
  }
};

export const clearJobs = () => ({
  type: CLEAR_JOBS
});

const setJobLoading = () => ({
  type: SET_JOB_LOADING
});
