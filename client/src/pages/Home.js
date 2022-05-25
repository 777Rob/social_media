import { Button, Box } from "@mantine/core";
import WritePost from "components/Feed/WritePost";
import { withPosts } from "components/Loader/withPosts";
import Feed from "../components/Feed/Feed";
import { queryExample } from "QueryExample";
import { authenticate } from "lens/authentication/auth";
import { generateChallenge } from "lens/authentication/auth";
import { useMoralis } from "react-moralis";
import { explore } from "lens/explore/explore";

import LensSignInButton from "components/Common/LensSignInButton";
const Home = () => {
  // Load feed
  const LoadedFeed = withPosts(Feed);
  // Render a section to write a post followed by a list of posts
  return (
    <Box>
<LensSignInButton/>

      <WritePost />
      <LoadedFeed />
    </Box>
  );
};
export default Home;
