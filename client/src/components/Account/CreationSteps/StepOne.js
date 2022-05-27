import { List, Box, Divider, Text } from "@mantine/core";
// import { BsStarFill } from "react-icons/bs";

// @Desct
const StepOne = () => {
	return (
		<>
			<Text sx={{ fontWeight: "bold", fontSize: "30px" }}>
				Advertising Profile
			</Text>
			<Divider />
			<List>
				<List.Item>
					Advertising profile is an NFT that let's you earn while browsing.It
					will keep track of your reward balances and will be used for showing
					ads after seeing the ad. Reward is automatically added to the balance.{" "}
				</List.Item>
				<List.Item>
					Some of the ads will contain tasks after completing them you can get
					an extra reward.
				</List.Item>
				<List.Item>
					ProfileNft has limited amount of ads that can be shown. The rate at
					which limit updates depends on the reputation of the profile nft.
				</List.Item>
				<List.Item>
					In the next steps you will configure advertiser profile and mint Ad
					profile NFT. The more information you provide the more relevant
					rewards you will see and higher reputation score will get.
				</List.Item>
			</List>
		</>
	);
};

export default StepOne;
