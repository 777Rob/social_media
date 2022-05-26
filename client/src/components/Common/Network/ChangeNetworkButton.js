import { useMoralis } from "react-moralis";
import { Button, Text } from "@mantine/core";

// @Description: Button for changing network
// @param switchToNetworkChainId: Chain id of the network to switch to default is 137 (Polygon Mainnet)
const ChangeNetworkButton = (switchToNetworkChainId = 137) => {
	const { Moralis, chainId } = useMoralis();

	// Network switch function
	const switchNetwork = async () => {
		// Check if the user is already on the desired network
		if (chainId !== switchToNetworkChainId) {
			// Switch to the desired network
			await Moralis.switchNetwork(switchToNetworkChainId);
		}
	};

	return <Button onClick={() => switchNetwork()}>Switch Network</Button>;
};
export default ChangeNetworkButton;
