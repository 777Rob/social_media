import {
  useMantineTheme,
  Button,
  Stack,
  Group,
  Box,
  Text,
  Divider,
  Avatar,
  Grid,
} from "@mantine/core";
import { withCommunityTopic } from "components/Loader/withCommunityTopic";
import { useParams } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart, AiOutlineEye } from "react-icons/ai";
import { useMoralis } from "react-moralis";
import _ from "lodash";
import { useState } from "react";
import { RichTextEditor } from "@mantine/rte";

const Summary = ({ topic }) => {
  return (
    <Grid
      columns={7}
      sx={(theme) => ({
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[2],
        padding: "5px",
        width: "800px",
        borderRadius: "10px",
      })}
    >
      <Grid.Col span={2}>
        <Stack>
          <Text>Created</Text>
          <Group>
            <Avatar radius="lg" src={topic[0].user.avatar} />
            {topic[0].date}
          </Group>
        </Stack>
      </Grid.Col>
      <Grid.Col span={1}>
        <Stack>
          <Text>Last Reply</Text>
          {topic[1].date}
        </Stack>
      </Grid.Col>
      <Grid.Col span={1}>
        <Stack>
          <Text>Reply Count:</Text>
          <Text>{topic.length}</Text>
        </Stack>
      </Grid.Col>
      <Grid.Col span={1}>
        <Text>Views:</Text>
        <Text>{topic[0].views}</Text>
      </Grid.Col>
      <Grid.Col span={1}>
        <Text>Users:</Text>
        <Text>{_.uniqBy(topic, "user.Username").length}</Text>
      </Grid.Col>
      <Grid.Col span={1}>
        <Text>Likes</Text>
        <Text>
          {topic.reduce(
            (total, currentValue) => (total += currentValue.likes),
            0
          )}
        </Text>
      </Grid.Col>
    </Grid>
  );
};

const Post = ({ post, summary }) => {
  const { user } = useMoralis();

  return (
    <Grid
      sx={(theme) => ({
        minHeight: "200px",
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[1],
        border: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[4]
        }`,
        borderRadius: "10px",
      })}
    >
      <Grid.Col
        span={1}
        sx={{ display: "flex", justifyContent: "center", paddingTop: "20px" }}
      >
        <Avatar radius="lg" size={50} src={post.user.avatar || ""} />
      </Grid.Col>
      <Grid.Col span={9}>
        <Stack sx={{ paddingBottom: "20px", paddingTop: "20px" }}>
          <Text sx={{ fontSize: "20px" }}>{post.user.userName}</Text>
          <Text sx={{ fontSize: "18px" }}>{post.text}</Text>
          {summary && summary}
        </Stack>
      </Grid.Col>
      <Grid.Col span={2}>
        <Stack spacing={20}>
          <Text>{post.date}</Text>
          <Text
            sx={{ display: "flex", alignItems: "center", fontSize: "28px" }}
          >
            {post.views && (
              <Text
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "24px",
                }}
              >
                {post.views}
                <AiOutlineEye />
              </Text>
            )}
            {post.likes}
            <AiOutlineHeart />
          </Text>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

const TopicPageContent = ({ topic = [] }) => {
  if (topic.length > 0) {
    return (
      <>
        <Post summary={<Summary topic={topic} />} post={topic[0]} />

        {topic.slice(1).map((post) => (
          <>
            <Post post={post} />
          </>
        ))}
      </>
    );
  }
};
const RichTextEditorTopic = () => {
  const initialValue =
    "<p>Your initial <b>html value</b> or an empty string to init editor without value</p>";
  const [input, onInputChange] = useState(initialValue);
  const handleReply = () => {

  }
  
  return (
      <>
    <RichTextEditor
      sx={(theme) => ({
          marginTop: "30px",
          minHeight: "200px",
          backgroundColor:
          theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[1],
        border: `1px solid ${
          theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[4]
        }`,
        borderRadius: "10px",
      })}
      value={input}
      onChange={onInputChange}
      />
      <Button onClick={() => handleReply()}>
          Reply
      </Button>
      </>
  );
};

const CommunityTopic = () => {
  const { topic } = useParams();
  const LoadedTopicContent = withCommunityTopic(TopicPageContent, topic);

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

export default CommunityTopic;
