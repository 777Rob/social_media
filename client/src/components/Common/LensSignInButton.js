import { useState, useEffect } from "react";
import { Button, Text } from "@mantine/core";
import { authenticate, generateChallenge } from "graphql/auth";
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

  useEffect(() => {
    (async () => {
      const request = await generateChallenge(account);
      setChallange(request.data.challenge.text);
    })();
  }, [challange, account]);


  const handleSign = async (e) => {
    e.preventDefault();
    setError();
    
    const sig = await signMessage({
      setError,
      message: challange
    });
    const authTx = await authenticate( sig.address, sig.signature)
    console.log(authTx)
    localStorage.setItem("auth_token", authTx.data.authenticate.accessToken);
    setAuthenticationToken(authTx.data.authenticate.accessToken)
    localStorage.setItem("refresh_token", authTx.data.authenticate.refreshToken);
    if (sig) {
      setSignatures([...signatures, sig]);
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
