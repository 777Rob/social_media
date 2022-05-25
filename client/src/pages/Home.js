import { Box } from "@mantine/core";
import WritePost from "components/Feed/WritePost";
import { withPosts } from "components/Feed/withPosts";
import Feed from 'components/Feed';

// @Description: Home page of the app that displays the feed to the user
const Home = () => {

  // Load feed with posts by passing Feed to withPosts function 
  // Which will query for the posts and return a component with
  // the posts passed as props
  const LoadedFeed = withPosts(Feed);

  return (
    <Box>
      {/* Write posts */}
      <WritePost />

      {/* Loaded feed */}
      <LoadedFeed />
    </Box>
  );
};
export default Home;
