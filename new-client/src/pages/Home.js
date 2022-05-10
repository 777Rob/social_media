import { Box, TextInput, Text, Button } from "@mantine/core";
import { useState, useEffect } from "react";
import { TextField, Stack } from "@mui/material";
import { useMoralis } from "react-moralis";
import { Blockie, TextArea } from "web3uikit";
import { clampUseMovePosition } from "@mantine/hooks";
import { defaultImages } from "data/defaultProfileImages";

const Home = () => {
  const { Moralis, user } = useMoralis();
  const Publications = Moralis.Object.extend("Publications");

  const [post, setPost] = useState({ text: "" });
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const handlePost = async () => {
    const publication = new Publications()
      .set("Text", post.text)
      .set("User", user.id);
    await publication.save();
  };

  useEffect(() => {
    // Todo make proper loading
    async function getPosts() {
      try {
        const query = new Moralis.Query(Publications);
        const results = await query.find();

        setPosts(results.map((result) => result));
        console.log(results);
        setLoaded(true);
      } catch (error) {
        console.error(error);
      }
    }

    if (!loaded) {
      getPosts();
    }
  }, [posts, setPosts, Publications, Moralis, user]);

  return (
    <Box>
      <Text sx={{ fontWeight: "bold", fontSize: "24px" }}>Home</Text>
      <Box sx={{ display: "flex" }}>
        <img
          src={
            user.attributes.ProfilePicture
              ? user.attributes.ProfilePicture
              : defaultImages[0]
          }
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />

        <TextArea
          type="text"
          width="95%"
          value={post.text}
          onChange={(e) => {
            setPost({ ...post, text: e.target.value });
          }}
          sx={{ minHeight: "200px" }}
          label="What's on your mind?"
        />
      </Box>
      <Button
        onClick={() => {
          handlePost();
        }}
      >
        Post
      </Button>
      {posts.map((post) => (
        // TODO: MAKE POSTS LOOK GOOD
        <Box
          className="post"
          sx={{
            backgroundColor: "#dadada",
            maxWidth: "100%",
            borderBottom: "1px solid #dadada",
            padding: "25px",
            justifyContent: "space-between",
          }}
        >
          <img
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            src={
              post.attributes.userProfilePic
                ? post.attributes.userProfilePic
                : defaultImages[0]
            }
          ></img>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              flexDirection: "column",
              gap: "15px",
              width: "85%",
            }}
          >
            <Text sx={{ fontWeight: "bold", fontSize: "24px" }}>
              {post.attributes.User}
            </Text>
            <Text sx={{ fontWeight: "bold", fontSize: "24px" }}>
              {post.attributes.createdAt.toLocaleString("en-us", {
                month: "short",
              })}
              {post.attributes.createdAt.toLocaleString("en-us", {
                day: "numeric",
              })}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
export default Home;
