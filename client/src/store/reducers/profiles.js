import {
  SET_PROFILE,
  SET_PROFILES,
  SET_PROFILE_LOADING,
  CLEAR_PROFILES
} from "../types";

const initialState = {
  profiles: [],
  profile: null,
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
        profiles: [...state.profiles, ...action.payload],
        loading: false
      };
    case CLEAR_PROFILES:
      return {
        ...state,
        profiles: []
      };
    default:
      return state;
  }
};
