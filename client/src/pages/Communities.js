import {
	Card,
Grid,
	Group,
	useMantineTheme,
	Box,
	Button,
	Divider,
	Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { withNfts } from "components/Common/Nfts/withNfts";
import { UserNfts } from "components/Communities/Landing/UserNfts";
import { useNavigate } from "react-router-dom";
import { HiViewGridAdd } from "react-icons/hi";
import { COMMUNITY_FACTORY_ABI, COMMUNITY_FACTORY_ADDRESS } from "contracts";

// @Description: Landing page for communities that is shown before selecting any specific category
const Communities = () => {
	// Get the current user wallet address
	const { account, Moralis } = useMoralis();

	// Pass UserNfts and the account component to withNfts function
	// which will return a UserNfts component with the nfts passed as an prop
	const UserNftsWithLoader = withNfts(UserNfts, account);
	const ethers = Moralis.web3Library;

	// Get navigate function from react-router-dom to navigate to other pages
	const navigate = useNavigate();

	const theme = useMantineTheme();
	const readOptions = {
		contractAddress: COMMUNITY_FACTORY_ADDRESS,
		functionName: "getAllCommunities",
		abi: COMMUNITY_FACTORY_ABI,
	};

	useEffect(() => {
		(async () => {
			const comms = await Moralis.executeFunction(readOptions);
			console.log("Communities:");
			console.log(comms);
		})();
	}, []);

	return (
		<Box>
			<Text sx={{ fontSize: "30px", fontWeight: "500" }} align="center">
				Enter the communities
			</Text>
			<Divider my="xs" />

			<Text sx={{ fontSize: "20px", marginBottom: "25px" }}>
				Communities enable communication and collaboration for owners of NFTs
				from the same collection. For the NFT's already deployed on chain
				communities are generated automatically by owning NFT from the
				collection you are automatically eligable to join. You can create your
				own community by simply minting NFT collection or through our website.
				When creating community through our website you can create
				fully-customisable subscription based communities where you can share
				content and earn revenue.
			</Text>
			<Text sx={{ fontSize: "30px", fontWeight: "500" }} align="center">
				Your Communities
			</Text>
			<Divider my="xs" />

			<Grid>
				<Grid.Col span={3}>
					<div style={{ margin: "auto" }}>
						<Card shadow="sm" p="lg">
							<Card.Section>
								{/* <Image src={CreateYourOwn} height={320} alt="rad" /> */}
								<HiViewGridAdd size={230} />
							</Card.Section>

							<Group
								position="apart"
								style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
							>
								<Text weight={500}>Test</Text>
							</Group>

							<Text
								size="sm"
								style={{
									color:
										theme.colorScheme === "dark"
											? theme.colors.dark[1]
											: theme.colors.gray[7],
									lineHeight: 1.5,
								}}
							></Text>

							<Button
								variant="light"
								color="blue"
								fullWidth
								style={{ marginTop: 14 }}
								onClick={() => navigate("/community/mock")}
								>
								Go to community
							</Button>
						</Card>
					</div>
				</Grid.Col>
			</Grid>
			{/* <Text
				sx={{
					height: 320,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				You haven't joined any communities ....
			</Text> */}

			{/* Temp mock community */}
	
			{/* Available communities */}
			<Text align="center" sx={{ fontSize: "30px", fontWeight: "500" }}>
				Available Communities
			</Text>
			<Divider my="xs" />
			<UserNftsWithLoader />

			{/* Explore section */}
			<Text align="center" sx={{ fontSize: "30px", fontWeight: "500" }}>
				Explore communities based on your interests
			</Text>
			<Divider my="xs" />
		</Box>
	);
};

export default Communities;
