import { Button, Box } from "@mantine/core";
import WritePost from "components/Feed/WritePost";
import { withPosts } from "components/Feed/withPosts";
import Feed from 'components/Feed';
import { queryExample } from "QueryExample";
import { authenticate } from "lens/authentication/auth";
import { generateChallenge } from "lens/authentication/auth";
import { useMoralis } from "react-moralis";
import { explore } from "lens/explore/explore";

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
