import { Text, Grid, Button } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { ConnectButton } from "web3uikit";
import { useViewportSize } from "@mantine/hooks";
import { generateChallenge } from "lens/authentication/auth";
import { useMoralis } from "react-moralis";
import { useSelector, useDispatch } from "react-redux";
import LensSignInButton from "components/Common/LenSignInButton/LensSignInButton";
/* 
    Page shown to the user if the user is not authenticated.
    Provides with an ability to be authenticated using various web3 service providers.
	
	*/
const SignInButton = () => {
	const { account, isAuthenticated, user } = useMoralis();
	const state = useSelector(state => state.user);
	const dispatch = useDispatch();

	// Return a grid consisting of three maximum size rows
	if (!isAuthenticated) {
		return (
			<ConnectButton signingMessage="Welcome to parsedia" moralisAuth={true} />
		);
	}
	if (state.signedInWithLens) {
		return <Text>Current user:{account}</Text>;
	}
	return <LensSignInButton />;
};

export default SignInButton;
