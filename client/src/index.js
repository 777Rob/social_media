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
import {
	ApolloProvider,
  } from "@apollo/client";
import client from "client"

ReactDOM.render(
	<React.StrictMode>
		{/* Setup moralis provider for auth, database*/}
		<ApolloProvider client={client}>
		<MoralisProvider
			// serverUrl={process.env.REACT_APP_SERVER_URL}
			// appId={process.env.REACT_APP_MORALIS_APP_ID}
			serverUrl="https://7tli7aekqigz.usemoralis.com:2053/server"
			appId="nKo4SJER5LKDN00ShdiyNiY65agjnD1lg0b34yk8"
			>
			{/* Setup redux provider to keep track of global state and provide useselctor and dispatch functions for the components  */}
			<Provider store={store}>
				{/* Setup snackbar provider for notifications */}
				<SnackbarProvider maxSnack={3}>
					{/* For navigation */}
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</SnackbarProvider>
			</Provider>
		</MoralisProvider>
			</ApolloProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
