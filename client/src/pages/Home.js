import { Box } from "@mantine/core";
import WritePost from "components/Feed/WritePost";
import { withPosts } from "components/Loader/withPosts";
import Feed from "../components/Feed/Feed";


const Home = () => {
  // Load feed
  const LoadedFeed = withPosts(Feed);

  // Render a section to write a post followed by a list of posts
  return (
    <Box>
      <WritePost />
      <LoadedFeed />
    </Box>
  );
};
export default Home;
