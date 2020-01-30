import { SET_PROFILE, SET_PROFILES, SET_PROFILE_LOADING } from "../types";

const initialState = {
  profiles: [],
  profile: {},
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE_LOADING:
      return { ...state, loading: true };
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case SET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
