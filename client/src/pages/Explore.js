import { LoadingOverlay, Box, Button } from "@mantine/core";
import { explorePublications } from "lens/explore/explore";
import { useState, useEffect } from "react";
import Post from "components/Feed/PostLens";

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  // When component mounts perform:
  useEffect(() => {
    (async () => {
      if (!loaded) {
        const result = await explorePublications({
          // switch for `TOP_COLLECTED` if you wanted collected!
          sortCriteria: "TOP_COLLECTED",
          limit: 50,
        });
        setPosts(result.data.explorePublications.items);
        setLoaded(true);
      }
    })();
  }, []);

  return (
    <Box>
      <LoadingOverlay visible={!loaded} />
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </Box>
  );
};

export default Explore;
