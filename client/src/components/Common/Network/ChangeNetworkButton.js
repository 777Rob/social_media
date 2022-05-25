import { useMoralis } from "react-moralis";
import { Button, Text } from "@mantine/core";

// Button for changing network
const ChangeNetworkButton = () => {
    const { Moralis, chainId } = useMoralis();

    // Switch to polygon
    const switchNetwork = async () => {
        const chainId = 137; //Polygon Mainnet
        await Moralis.switchNetwork(chainId);
    };

    return (
        <Text>
            <Button onClick={() => switchNetwork()}>Switch Network</Button>
        </Text>
    );
};
export default ChangeNetworkButton;
