import {
	Badge,
	Button,
	Card,
	Group,
	Image,
	Text,
	useMantineTheme,
} from "@mantine/core";
import React from "react";

// @Description: Card component to display card data takes in metadata of an NFT and collection name
// @param metadata: Metadata of the NFT to display
// @param collectionName: Name of the collection the NFT belongs to
const NftCard = ({ metadata, collectionName }) => {
	const theme = useMantineTheme();

	const secondaryColor =
		theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

	return (
		<div style={{ margin: "auto" }}>
			<Card shadow="sm" p="lg">
				<Card.Section>
					<Image src={metadata.image} height={320} alt={collectionName} />
				</Card.Section>

				<Group
					position="apart"
					style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
				>
					<Text weight={500}>
						{!metadata.name ? collectionName : metadata.name}
					</Text>
					<Badge color="green" variant="light">
						420 Members active
					</Badge>
				</Group>

				<Text
					size="sm"
					style={{ color: secondaryColor, lineHeight: 1.5 }}
				></Text>

				<Button
					variant="light"
					color="blue"
					fullWidth
					style={{ marginTop: 14 }}
				>
					Enter the community
				</Button>
			</Card>
		</div>
	);
};

export default NftCard;
