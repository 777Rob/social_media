import { useState, useEffect } from "react";
import { Button, Text } from "@mantine/core";
import { authenticate, generateChallenge } from "lens/authentication/auth";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";
import { setAuthenticationToken } from "state";
const signMessage = async ({ setError, message }) => {

  try {
    console.log({ message });
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    const address = await signer.getAddress();

    return {
      message,
      signature,
      address
    };
  } catch (err) {
    setError(err.message);
  }
};


const LensSignInButton = () => {
  const [challange, setChallange] = useState("");
  const { account, Moralis } = useMoralis();
  const [error, setError] = useState();
  const [signatures, setSignatures] = useState([]);


  const handleSign = async (e) => {
    e.preventDefault();
    setError();
    const request = await generateChallenge(account);
    const challange = request.data.challenge.text;
    const {message, signature, address} = await signMessage({
      setError,
      message: challange
    });
    
    const authTx = await authenticate( address, signature)

    setAuthenticationToken(await authTx.data.authenticate.accessToken)
    localStorage.setItem("auth_token", authTx.data.authenticate.accessToken);
    localStorage.setItem("refresh_token", authTx.data.authenticate.refreshToken);

    if (signature) {
      setSignatures([...signatures, signature]);
    }
  };

  return (
    <Button
      onClick={handleSign}
    >
      Test
    </Button>
  );
};

export default LensSignInButton;
