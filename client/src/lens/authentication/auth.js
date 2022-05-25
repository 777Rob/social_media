import { apolloClient } from "apolloClient";
import { gql } from "@apollo/client";

// Following functions use apolloClient to make graphql queries and mutations to the server

const AUTHENTICATION = `
  mutation($request: SignedAuthChallenge!) { 
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`
// Authenticate function to authenticate the user
// @Param address: address of the user to authenticate
// @Param signature: by the user signed challange 
export const authenticate = (address, signature) => {
  return apolloClient.mutate({
    mutation: gql(AUTHENTICATION),
    variables: {
      request: {
        address,
        signature,
      },
    },
  })
}

const GET_CHALLENGE = `
  query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
  }
`;

// Generate challenge function to generate a challenge
// @Param address: address of the user to generate challenge for
export const generateChallenge = (address) => {
  const challange = apolloClient.query({
    query: gql(GET_CHALLENGE),
    variables: {
      request: {
        address,
      },
    },
  });

  return challange;
};
