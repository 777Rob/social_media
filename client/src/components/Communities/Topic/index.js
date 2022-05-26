import { useMantineTheme, Box, Text, Divider } from "@mantine/core";
import { withCommunityTopic } from "components/Communities/Topic/withCommunityTopic";
import { useParams } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { RichTextEditorTopic } from "./ReplyForm";
import { TopicContent } from "./TopicContent";

// @Description: Topic page with topic, replies, and reply form
const Topic = () => {
	// Get topic from URL
	const { topic } = useParams();

	// Load page content with the withCommunityTopic function and pass
	// the TopicContent component as the component to load
	const LoadedTopicContent = withCommunityTopic(TopicContent, topic);

	return (
		<Box>
			<Text align="center" sx={{ fontSize: "34px", fontWeight: "bold" }}>
				{topic}
			</Text>
			<LoadedTopicContent />
			<RichTextEditorTopic />
		</Box>
	);
};

export default Topic;
