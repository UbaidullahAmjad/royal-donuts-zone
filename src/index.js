import React from "react";
import ReactDOM from "react-dom";
// import { hydrate, render } from 'react-dom';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import App from "./App";
// import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import store, { persistor } from "./redux/redux_store/store";
import { PersistGate } from "redux-persist/integration/react";


ReactDOM.render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <App />
    {/* </PersistGate> */}
  </Provider>,
  document.getElementById("root")
);
// registerServiceWorker();


