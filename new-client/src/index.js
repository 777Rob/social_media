import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MoralisProvider } from "react-moralis";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { NotificationProvider } from "web3uikit";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider
      // serverUrl={process.env.REACT_APP_SERVER_URL}
      // appId={process.env.REACT_APP_MORALIS_APP_ID}
      serverUrl="https://gt8clfmexhhx.usemoralis.com:2053/server"
      appId="LA7Ekr7CCjfrhiCh7RILn1pY5F86U64lwUijjJ38"
    >
      <NotificationProvider>
        <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MantineProvider>
      </NotificationProvider>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
