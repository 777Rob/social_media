import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MoralisProvider } from "react-moralis";
// import "dotenv/config";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider
      serverUrl={process.env.SERVER_URL || ""}
      appId={process.env.MORALIS_APP_ID || ""}
    >
      <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
