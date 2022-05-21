import React from "react";
import ReactDOM from "react-dom";
import "./styling/index.css";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import store from "redux/store";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider
      // serverUrl={process.env.REACT_APP_SERVER_URL}
      // appId={process.env.REACT_APP_MORALIS_APP_ID}
      serverUrl="https://7tli7aekqigz.usemoralis.com:2053/server"
      appId="nKo4SJER5LKDN00ShdiyNiY65agjnD1lg0b34yk8"
    >
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SnackbarProvider>
      </Provider>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
