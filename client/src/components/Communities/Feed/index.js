import { Box, Button, Divider } from "@mantine/core";
import WritePost from "components/Feed/WritePost";
import Feed from "components/Feed";
import { withPosts } from "components/Loader/withPosts";

const CommunitiesFeed = () => {
  const PostsLoaded = withPosts(Feed);
  return (
    <Box>
      <WritePost />
      <PostsLoaded/>
    </Box>
  );
};

export default CommunitiesFeed;
