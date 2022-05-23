import { Button, Box } from "@mantine/core";
import WritePost from "components/Feed/WritePost";
import { withPosts } from "components/Loader/withPosts";
import Feed from "../components/Feed/Feed";
import { queryExample } from "QueryExample";
import {authenticate} from "graphql/authentication"
const Home = () => {
  // Load feed
  const LoadedFeed = withPosts(Feed);

  // Render a section to write a post followed by a list of posts
  return (
    <Box>
      <Button onClick={() => authenticate()}>
Example
      </Button>
      <WritePost />
      <LoadedFeed />
    </Box>
  );
};
export default Home;
