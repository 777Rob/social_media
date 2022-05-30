import { Box, Button, Divider } from "@mantine/core";
import WritePost from "components/Feed/WritePost";
import Feed from "components/Feed";
import { withPosts } from "components/Feed/withPosts";

const Index = () => {
	// Load feed using the withPosts HOC and pass the Feed component as the component to load

	return (
		<Box>
			<WritePost />
		</Box>
	);
};

export default Index;
