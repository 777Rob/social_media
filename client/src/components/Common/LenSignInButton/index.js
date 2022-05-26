import { useState, useEffect } from "react";
import { Button, Text } from "@mantine/core";
import { authenticate, generateChallenge } from "lens/authentication/auth";
import { useMoralis } from "react-moralis";
import { setAuthenticationToken } from "state";
import { signMessage } from "helpers/signMessage";

// @Description: Button to sign in using with Lens Profile
const LensSignInButton = () => {
	// Get the account of current user using useMoralis hook
	const { account, Moralis } = useMoralis();

	// Set the error message to null
	// This will be used to render the error message
	// In the event of an error
	const [error, setError] = useState(null);

	// Set the signatures to an empty array
	const [signatures, setSignatures] = useState([]);

	// Function to handle the message signing
	const handleSign = async e => {
		// Prevent the default action
		e.preventDefault();
		// Use generateChallenge function to query the lens graphql api and generate a challenge
		const request = await generateChallenge(account);
		const challange = request.data.challenge.text;

		// Sign the message using the signMessage function
		// Pass the message and the setter function for the error
		const { message, signature, address } = await signMessage({
			setError,
			message: challange,
		});

		// Add the signature to the signatures array
		if (signature) {
			setSignatures([...signatures, signature]);
		}

		// Use the authenticate function to verify the signature and receive access token and refresh token
		const authTx = await authenticate(address, signature);

		// Set the authentication token to the access token
		setAuthenticationToken(await authTx.data.authenticate.accessToken);

		// Save the authentication token and the refresh token in the local storage
		localStorage.setItem("auth_token", authTx.data.authenticate.accessToken);
		localStorage.setItem(
			"refresh_token",
			authTx.data.authenticate.refreshToken
		);
	};

	return (
		<>
			<Text>
				{/* Display error message */}
				{error && error.message}
			</Text>
			<Button onClick={handleSign}>Sign in with Lens</Button>
		</>
	);
};

export default LensSignInButton;
