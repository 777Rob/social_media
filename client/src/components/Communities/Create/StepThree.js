import {
	Divider,
	Text,
	Box,
	Button,
	Image,
	TextInput,
	Center,
} from "@mantine/core";
import UploadButton from "components/Common/UploadFileButton";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { COMMUNITY_FACTORY_ABI, COMMUNITY_FACTORY_ADDRESS } from "contracts";
import { useSnackbar } from "notistack";

export const StepThree = () => {
	const { Moralis } = useMoralis();

	// Use selector to get community type from redux state
	const communityType = useSelector(
		state => state.createCommunity.communityType
	);
	// Get instance of contract processor
	const contractProcessor = useWeb3ExecuteFunction();

	// Get community details from redux state
	const communityDetails = useSelector(
		state => state.createCommunity.communityDetails
	);

	// Get enqueueSnackbar function for pushing notifications in que for display
	const { enqueueSnackbar } = useSnackbar();

	// Function to create custom community by calling createCustomCommunity function on community factory contract
	// (Create a nft collection with specified params and use it to call create a community instance using newly
	//  created nft collection)

	const createCustomCommunity = async () => {
		// Specify call options
		// TODO: FINISH CONTRACT AND ADD ALL OPTIONS
		// @params
		// string memory _name,
		// string memory _ticker,
		// uint256 _memberLimit,
		// uint256 _price
		let options = {
			contractAddress: COMMUNITY_FACTORY_ADDRESS,
			abi: COMMUNITY_FACTORY_ABI,
			functionName: "createCustomCommunity",
			params: {
				_name: communityDetails.name,
				_ticker: communityDetails.ticker,
				_memberLimit: 69,
				_price: 420,
			},
			msgValue: Moralis.Units.ETH(0),
		};

		// Execute the call it will request user to sign the transaction
		await contractProcessor.fetch({
			params: options,
			// On success show success notification
			// Todo REDIRECT
			onSuccess: async () => {
				enqueueSnackbar(`Success`, { variant: "success" });
			},
			onError: error => {
				// On error display error notification
				enqueueSnackbar(
					`Error occured during minting please try again. Error data:${error.message}`,
					{ variant: "error" }
				);
			},
		});
	};

	// Function
	const handleMint = () => {
		// Get community type from redux state

		if (communityType == 1) {
			// TODO: HANDLE SUBSCRIBTION BASED COMMUNITIES
		} else {
			createCustomCommunity();
		}
	};

	// Format key/value pairs for display and filter out empty values
	const formatedValues = _.toPairs(communityDetails).map(item => {
		return [
			item[0]
				.split(/(?=[A-Z])/)
				.map(word => word.charAt(0).toUpperCase() + word.slice(1))
				.join(" "),
			item[1],
		];
	});

	return (
		<Box
			sx={{
				spacing: "20px",
				display: "flex",
				alignItems: "center",
				flexDirection: "column",
				spacing: 10,
			}}
		>
			{/* Title */}
			<Text sx={{ fontSize: "24px", fontWeight: "bold" }} align="center">
				Summary
			</Text>
			<Divider />

			{/* Map through all values */}
			{formatedValues.map(
				value =>
					value[1] !== "" && (
						<Center>
							<Text sx={{ fontSize: "20px", fontWeight: "bold" }}>
								{value[0]}:
							</Text>
							<Text>{value[1]}</Text>
						</Center>
					)
			)}

			{/* Image */}
			<Text sx={{ fontSize: "20px", fontWeight: "bold" }} align="center">
				Image
			</Text>
			<Image src={communityDetails.Image} />

			{/* Mint button */}
			<Button onClick={() => handleMint()}>Complete and mint NFT</Button>
		</Box>
	);
};
