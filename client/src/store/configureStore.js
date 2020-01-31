import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import auth from "./reducers/auth";
import profiles from "./reducers/profiles";
import posts from "./reducers/posts";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({ auth, profiles, posts }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
