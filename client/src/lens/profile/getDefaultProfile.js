import { gql } from "@apollo/client/core";
import { apolloClient } from "apolloClient";
import { prettyJSON } from "helpers/helpers";
import { GET_PROFILE } from "./profile";

const GET_DEFAULT_PROFILE = `
query DefaultProfile($address: EthereumAddress!) {
  defaultProfile(
    request: { ethereumAddress: $address }
  ) {
    id
    name
    bio
    isDefault
    attributes {
      displayType
      traitType
      key
      value
    }
    metadata
    handle
    picture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        chainId
        verified
      }
      ... on MediaSet {
        original {
          url
          mimeType
        }
      }
    }
    coverPicture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        chainId
        verified
      }
      ... on MediaSet {
        original {
          url
          mimeType
        }
      }
    }
    ownedBy
    dispatcher {
      address
      canUseRelay
    }
    stats {
      totalFollowers
      totalFollowing
      totalPosts
      totalComments
      totalMirrors
      totalPublications
      totalCollects
    }
    followModule {
      ... on FeeFollowModuleSettings {
        type
        contractAddress
        amount {
          asset {
            name
            symbol
            decimals
            address
          }
          value
        }
        recipient
      }
      ... on ProfileFollowModuleSettings {
        type
      }
      ... on RevertFollowModuleSettings {
        type
      }
    }
  }
}
`;
// Function for getting the default profile of a user
// @Param: address - Ethereum address to get default profile for
// returns a promise that resolves to the default profile
export const getDefaultProfile = (address) => {
  return apolloClient.query({
    query: gql(GET_PROFILE),
    variables: {
      address: address
    }
  });
};