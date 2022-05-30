import { useMoralis } from "react-moralis";
import {
	Box,
	Text,
	Button,
	Image,
	LoadingOverlay,
	Center,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CopyButton } from "web3uikit";
import Avatar from "components/Common/Avatar";
import { useEffect, useState } from "react";
import NoBannerImage from "data/Images/nobanner.jpg";
import { getDefaultProfile } from "lens/profile/getDefaultProfile";
import _ from "lodash";

//@Description: Profile page is used to display the user's profile
const ProfileLoaded = () => {
	const { Moralis, account } = useMoralis();
	const profileAddress = useParams();
	// Get current user
	const user = Moralis.User.current();
	const [loading, setLoading] = useState(true);
	const [profile, setProfile] = useState([]);
	// Get navigate function from react-router-dom to navigate to other pages
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			const result = await getDefaultProfile(profileAddress);
			console.log(result);
			setProfile(result.data.defaultProfile);
			setLoading(false);
		})();
	}, [profileAddress]);

	if (loading) {
		return <LoadingOverlay visible={true} />;
	}

	const formatedStats = _.toPairs(profile?.stats).map(item => {
		return [
			item[0]
				.split(/(?=[A-Z])/)
				.map(word => word.charAt(0).toUpperCase() + word.slice(1))
				.join(" "),
			item[1],
		];
	});

	console.log(formatedStats);
	return (
		<Box>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				{/* Banner */}
				<Image
					radius="sm"
					src={
						profile?.coverPicture
							? profile?.coverPicture.original.url
							: NoBannerImage
					}
					sx={{ marginTop: 10, marginBottom: 20 }}
					width={1200}
					align="center"
					height={400}
					alt={account}
				/>

				{/* Avatar */}
				<Avatar src={profile?.picture.original.url || ""} />

				{/* Username */}
				<Text>{profile?.name}</Text>

				{/* Wallet with copy button */}
				<Text>
					{account}
					<CopyButton text={account} revertIn={6500} />
				</Text>
				<Text>{profile?.bio}</Text>

				<Box sx={{display: "flex", alignItems: "flex-start", gap: "10px",
      }}>
					{/* Attributes */}
					{profile?.attributes.map(attribute => (
						<Text>
							{attribute.traitType || ""}: {attribute.value || ""}
						</Text>
					))}
				</Box>
				{/* Stats */}
				<Box sx={{ display: "flex", gap: "15px" }}>
					{formatedStats.slice(0, formatedStats.length - 1).map(stat => (
						<Text sx={{ fontSize: "12px" }}>
							<b>{stat[0]}</b>:{stat[1]}
						</Text>
					))}
				</Box>
				{/* Navigate to profile edit page */}
			</Box>
		</Box>
	);
};

export default ProfileLoaded;
