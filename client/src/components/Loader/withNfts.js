import React, { useState, useEffect } from "react";
import { useMoralisWeb3Api } from "react-moralis";

export const withNfts = (Component, address) => {
  // HOC That takes in  a compontent and address from where to fetch nfts and passes fetched nfts as a prop to that component
  return (props) => {
    // Web3 Api function
    const Web3Api = useMoralisWeb3Api();

    // Track state of nfts
    const [nfts, setNfts] = useState(null);

    // When component mounts perform:
    useEffect(() => {
      // Function to fetch NFTS
      (async () => {
        // Get NFTS using web3 api
        const polygonNFTs = await Web3Api.account.getNFTs({
          // Chain
          chain: "mumbai",
          // Address of an user whose nfts to fetch
          address: address,
        });
        // Set nfts to the result
        setNfts(polygonNFTs.result);
      })();
    });
    // Return a component
    return <Component {...props} nfts={nfts} />;
  };
};
