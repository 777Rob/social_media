import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { Divider, Box, Text, Button, Stepper, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AD_PROFILE_ABI } from "contracts";
import { useSnackbar } from "notistack";
import { AD_PROFILE_ADDRESS } from "contracts";
import { Navigate } from "react-router-dom";

import StepOne from "components/Account/CreationSteps/StepOne";
import StepTwo from "components/Account/CreationSteps/StepTwo";

// @Description: This page is the wizard used for creating an account
const AdvertismentProfileCreation = () => {
	const { Moralis } = useMoralis();

	// Get current user object
	const user = Moralis.User.current();

	// Set state of an active page to 0
	const [active, setActive] = useState(0);

	// Categories from step1
	const [selectedCategories, setSelectedCategories] = useState([]);

	// For making contract calls
	const contractProcessor = useWeb3ExecuteFunction();

	// get enqueSnackbar from notistack to show notifications
	const { enqueueSnackbar } = useSnackbar();

	// Get navigate function from react-router-dom to navigate to other pages
	const navigate = useNavigate();

	// Function for making contract call to create account
	const mintProfile = async () => {
		// Call options for contract call
		let options = {
			contractAddress: AD_PROFILE_ADDRESS,
			abi: AD_PROFILE_ABI,
			functionName: "createProfile",
			params: {
				_interestCategories: selectedCategories,
				_lensProfileID: 3,
			},
			msgValue: Moralis.Units.ETH(0),
		};

		// Call contract
		await contractProcessor.fetch({
			params: options,
			onSuccess: async () => {
				// On successfull call create user and navigate home
				console.log("SUCCESS");
				user.set("profileCompleted", true);
				await user.save();
				window.location.reload();
				navigate("/Welcome");
			},
			onError: error => {
				// On error display error
				enqueueSnackbar(
					`Error occured during minting please try again. Error data:${error.message}`,
					{ variant: "error" }
				);
				console.log(error.message);
			},
		});
	};

	// Function for going to the next step
	const nextStep = () => {
		// If it is the last step mint profile and navigate home
		setActive(active + 1);
	};

	// Function for going back to previous step
	const prevStep = () => setActive(active - 1);

	return (
		<div>
			<Text sx={{ fontSize: "24px", fontWeight: "bold" }}>
				Account Creation
			</Text>

			<Stepper active={active} onStepClick={setActive} breakpoint="sm">
				<Stepper.Step label="First step" description="Introduction">
					<StepOne />
				</Stepper.Step>
				{/* <Stepper.Step label="Second step" description="Configuration">
					<StepTwo />
				</Stepper.Step> */}
				<Stepper.Step label="Third step" description="Mint">
					<Box sx={{ display: "flex", justifyContent: "center" }}>
						<Button size="lg" radius="lg" onClick={() => mintProfile()}>
							Mint
						</Button>{" "}
					</Box>
				</Stepper.Step>
			</Stepper>

			{/* Buttons for navigating steps */}

			<Divider sx={{ margin: "20px" }} />

			<Group position="apart" mt="xl">
				<Button variant="default" onClick={prevStep}>
					Back
				</Button>
				<Button onClick={nextStep}>
					{active !== 4 ? (
						<Text>Next step</Text>
					) : (
						<Text>Complete and mint profile NFT</Text>
					)}
				</Button>
			</Group>
		</div>
	);
};

export default AdvertismentProfileCreation;
