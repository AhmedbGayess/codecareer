import {
  SET_JOB,
  SET_JOBS,
  SET_JOB_LOADING,
  CLEAR_JOBS,
  APPLY_TO_JOB
} from "../types";

const initialState = {
  job: null,
  jobs: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JOB_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_JOB:
      return {
        ...state,
        job: action.payload,
        loading: false
      };
    case SET_JOBS:
      return {
        ...state,
        jobs: [...state.jobs, ...action.payload],
        loading: false
      };
    case CLEAR_JOBS:
      return {
        ...state,
        jobs: []
      };
    case APPLY_TO_JOB:
      return {
        ...state,
        job: {
          ...state.job,
          applicants: action.payload
        }
      };
    default:
      return state;
  }
};
