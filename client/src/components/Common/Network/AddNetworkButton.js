import { useMoralis } from "react-moralis";
import { Button } from "@mantine/core";

// @Description: Button to change network into Desired network
const defaultNetwork = {
	chainId: 137, // Chain id
	chainName: "Polygon Mainnet", // Name of the network
	currencyName: "MATIC", // Name of the network native currency
	currencySymbol: "MATIC", // Symbol of the network native currency
	rpcUrl: "https://rpc-mainnet.matic.network", // RPC url for the network
	blockExplorerUrl: "https://polygonscan.com/", // Block explorer url for the network
};

const AddNetworkButton = (network = defaultNetwork) => {
	const { Moralis } = useMoralis();

	// Add polygon to metamask
	const addNetwork = async () => {
		// Specify parameters for the polygon network function

		// Add the network to the metamask using Moralis
		await Moralis.addNetwork(
			network.chainId,
			network.chainName,
			network.currencyName,
			network.currencySymbol,
			network.rpcUrl,
			network.blockExplorerUrl
		);
	};

	return () => {
		return (
			<Button radius="xl" onClick={() => addNetwork()}>
				Add network to wallet
			</Button>
		);
	};
};
