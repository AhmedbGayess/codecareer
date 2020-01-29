import React from "react";
import { Provider } from "react-redux";

import AppRouter from "./router/AppRouter";
import configureStore from "./store/configureStore";

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
