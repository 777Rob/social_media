import { useMoralis } from "react-moralis";
import { Button, Text } from "@mantine/core";

const ChangeNetwork = () => {
  const { Moralis } = useMoralis();
  const addNetwork = async () => {
    const chainId = 137;
    const chainName = "Polygon Mainnet";
    const currencyName = "MATIC";
    const currencySymbol = "MATIC";
    const rpcUrl = "https://rpc-mainnet.matic.network";
    const blockExplorerUrl = "https://polygonscan.com/";
    await Moralis.addNetwork(
      chainId,
      chainName,
      currencyName,
      currencySymbol,
      rpcUrl,
      blockExplorerUrl
    );
  };

  const switchNetwork = async () => {
    const chainId = 137; //Polygon Mainnet
    const chainIdHex = await Moralis.switchNetwork(137);
  };

  return (
    <Text>
      Wrong network detected please switch network to polygon mainnet
      <Button onClick={() => switchNetwork()}>Switch Network</Button>
      <Button onClick={() => addNetwork()}>Add network to wallet</Button>
    </Text>
  );
};
