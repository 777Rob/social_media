import {
  useMantineTheme,
  Box,
  Text,
  Divider,
} from "@mantine/core";
import { withCommunityTopic } from "components/Communities/Topic/withCommunityTopic";
import { useParams } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { RichTextEditorTopic } from "./RichTextEditorTopic";
import { TopicContent } from "./TopicContent";

const Topic = () => {
  const { topic } = useParams();
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
