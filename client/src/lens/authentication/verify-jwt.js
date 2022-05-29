import client from 'client';
import { gql } from '@apollo/client'

// Following functions use client to make graphql queries and mutations to the server


const VERIFY = `
  query($request: VerifyRequest!) {
    verify(request: $request)
  }
`
// Verify function to verify the users token
// @Param address: address of the user to verify
export const verify = (accessToken) => {
  return client.query({
    query: gql(VERIFY),
    variables: {
      request: {
        accessToken,
      },
    },
  })
}