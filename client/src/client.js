import {
	ApolloClient,
	ApolloLink,
	DefaultOptions,
	from,
	HttpLink,
	InMemoryCache,
} from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";
import fetch from "cross-fetch";
import { LENS_API } from "lens";

// Specify default options
// Options are passed to the ApolloClient constructor
const defaultOptions = {
	watchQuery: {
		fetchPolicy: "no-cache",
		errorPolicy: "ignore",
	},
	query: {
		fetchPolicy: "no-cache",
		errorPolicy: "all",
	},
};

// Create the http link for the apollo client
// This is the link that will be used to make requests to the apollo server
const httpLink = new HttpLink({
	uri: LENS_API,
	fetch,
});

// Create error link for the apollo client
// This is the link that will be used to handle errors
const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		);

	if (networkError) console.log(`[Network error]: ${networkError}`);
});

// Create the auth link for the apollo client
// This is the link that will be used to authenticate requests to the apollo server
const authLink = new ApolloLink((operation, forward) => {
	// Get the authentication token from the local storage
	const authToken = localStorage.getItem("auth_token");
	console.log("jwt token:", authToken);
	console.log(authToken);
	// Decode the token to get the experation date
	// const { exp } = jwtDecode(authToken)

	// Use the setContext method to set the HTTP headers.
	// See https://www.apollographql.com/docs/link/links/set-context.html
	operation.setContext({
		headers: {
			"x-access-token": authToken ? `Bearer ${authToken}` : "",
		},
	});

	// If token expired update the token
	// if(Date.now() >= exp){
	//   updateAuthToken();
	// }
	// Call the next link in the middleware chain.
	// Forward the operation to the next link in the middleware chain.
	return forward(operation);
});

// Create the apollo client instance
const client = new ApolloClient({
	link: from([errorLink, authLink, httpLink]),
	cache: new InMemoryCache(),
	defaultOptions: defaultOptions,
});

export default client;