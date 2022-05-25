import {
  ApolloClient,
  ApolloLink,
  DefaultOptions,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import fetch from 'cross-fetch';
import { LENS_API } from 'config';
import jwtDecode from 'jwt-decode'
import { refreshAuth } from "./lens/authentication/refresh-auth";


const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const httpLink = new HttpLink({
  uri: LENS_API,
  fetch,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const updateAuthToken = async () => {
  const authTx = await (localStorage.getItem("refresh_token"))
  localStorage.setItem("auth_token", authTx.data.authenticate.accessToken);
  localStorage.setItem("refresh_token", authTx.data.authenticate.refreshToken)
}

const authLink = new ApolloLink((operation, forward) => {
  const authToken = localStorage.getItem("auth_token");
  console.log('jwt token:', authToken);
  // const { exp } = jwtDecode(authToken)
  //
  // console.log(exp)
  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      'x-access-token': authToken ? `Bearer ${authToken}` : '',
    },
  });

  // if(Date.now() >= exp){
  //   updateAuthToken();
  // }
  // Call the next link in the middleware chain.
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});