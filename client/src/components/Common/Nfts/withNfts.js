import React, { useState, useEffect } from "react";
import { useMoralisWeb3Api } from "react-moralis";

// @Description: Function which returns the component with nfts of given address passed as props
// @prop nfts: Array of nfts
// @param: Component: Component to be rendered with nfts data
// @param: address: Address of the user

export const withNfts = (Component, address) => {
	// Function That takes in  a compontent and address from where to fetch nfts and passes fetched nfts as a prop to that component
	return props => {
		// Web3 Api function
		const Web3Api = useMoralisWeb3Api();

		// Track state of nfts
		const [nfts, setNfts] = useState([]);

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
