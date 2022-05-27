import { useState, useEffect } from "react";
import { Button, Text } from "@mantine/core";
import { authenticate, generateChallenge } from "lens/authentication/auth";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";
import { LENS_SIGN_IN } from "redux/User";

import { useSelector, useDispatch } from "react-redux";
// import { signMessage } from "helpers/signMessage";
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
			address,
		};
	} catch (err) {
		setError(err.message);
	}
};



// @Description: Button to sign in using with Lens Profile
const LensSignInButton = () => {
	// Get the account of current user using useMoralis hook
	const { account, Moralis } = useMoralis();
	const dispatch = useDispatch();
	// Set the error message to null
	// This will be used to render the error message
	const [challange, setChallange] = useState("");

	// In the event of an error
	const [error, setError] = useState(null);

	// Set the signatures to an empty array
	const [signatures, setSignatures] = useState([]);

	// Function to handle the message signing
	const handleSign = async () => {
		// Prevent the default action
		// Use generateChallenge function to query the lens graphql api and generate a challenge
		const request = await generateChallenge(account);
		const challange = request.data.challenge.text;

		// Sign the message using the signMessage function
		// Pass the message and the setter function for the error
		const { message, signature, address } = await signMessage({
			message: challange,
			setError,
		});

		// Add the signature to the signatures array

		// Use the authenticate function to verify the signature and receive access token and refresh token
		const authTx = await authenticate(address, signature);

		// Set the authentication token to the access token

		dispatch(LENS_SIGN_IN(await authTx.data.authenticate.accessToken));
		if (signature) {
			setSignatures([...signatures, signature]);
		}
	};

	useEffect(() => {
		handleSign();
	});
	return (
		<Button radius="md" onClick={() => handleSign()}>
			Sign in with Lens
		</Button>
	);
};

export default LensSignInButton;
