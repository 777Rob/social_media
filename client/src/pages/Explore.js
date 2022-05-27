import { Text, LoadingOverlay, Box, Button, Divider } from "@mantine/core";
import { explorePublications } from "lens/explore/explore";
import { useState, useEffect } from "react";
import Post from "components/Feed/PostLens";

// @Description: This is the page that shows the list of posts in the Explore page
const Explore = () => {
	// Initialize posts state as an empty array
	// This will be used to render the list of posts
	const [posts, setPosts] = useState([]);

	// Initialize loading state as false
	// It will be used to render the loading overlay
	const [loaded, setLoaded] = useState(false);

	// Load posts and set loaded to true
	useEffect(() => {
		(async () => {
			if (!loaded) {
				// Load posts using explorePublications function passing the sorting criteria and limit as a params
				const result = await explorePublications({
					// switch for `TOP_COLLECTED` if you wanted collected!
					sortCriteria: "TOP_COLLECTED",
					limit: 50,
				});

				// Set the posts to the posts returned by the explorePublications function
				setPosts(result.data.explorePublications.items);

				// Set loaded to true
				setLoaded(true);
			}
		})();
	}, []);

	return (
		<Box>
			{/* Overlay to display while content is loading */}
			<Text sx={{ fontSize: "38px", fontWeight: "bold" }}>
				Explore publications
			</Text>
			<Text sx={{ fontSize: "23px", marginBottom: "25px" }}>
				Parsedia connects to Lens Protocol a user-owned, open social graph. The
				purpose of the Lens Protocol is to empower creators to own the links
				between themselves and their community, forming a fully composable,
				decentralized social graph.
			</Text>
			<Divider />
			<LoadingOverlay visible={!loaded} />
			{/* Map through posts */}
			{posts.map(post => (
				<Post post={post} />
			))}
		</Box>
	);
};

export default Explore;
