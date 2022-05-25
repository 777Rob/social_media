import { useMoralis } from "react-moralis";
import { Button } from "@mantine/core";

const AddNetworkButton = () => {
  const { Moralis } = useMoralis();

  // Add polygon to metamask
  const addNetwork = async () => {
    // Specify parameters for the polygon network function
    const chainId = 137;
    const chainName = "Polygon Mainnet";
    const currencyName = "MATIC";
    const currencySymbol = "MATIC";
    const rpcUrl = "https://rpc-mainnet.matic.network";
    const blockExplorerUrl = "https://polygonscan.com/";

    // Add the network to the metamask using Moralis 
    await Moralis.addNetwork(
      chainId,
      chainName,
      currencyName,
      currencySymbol,
      rpcUrl,
      blockExplorerUrl
    );
  };

  return () => {
    return <Button onClick={() => addNetwork()}>Add network to wallet</Button>;
  };
}
