import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MoralisProvider } from "react-moralis";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <MoralisProvider
        serverUrl={process.env.REACT_APP_SERVER_URL}
        appId={process.env.REACT_APP_MORALIS_APP_ID}
      >
        <App />
      </MoralisProvider>
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
