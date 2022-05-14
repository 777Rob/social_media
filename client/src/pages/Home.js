import { Box, TextInput, Text, Button, Space } from "@mantine/core";
import { useState, useEffect } from "react";
import { TextField, Stack } from "@mui/material";
import { useMoralis } from "react-moralis";
import { Blockie, TextArea } from "web3uikit";
import { clampUseMovePosition } from "@mantine/hooks";
import { defaultImages } from "data/defaultProfileImages";
import Post from "../components/Post";
import WritePost from "../components/WritePost";

const Home = () => {
  const { Moralis, user } = useMoralis();
  const Publications = Moralis.Object.extend("Publications");

  const [post, setPost] = useState({ text: "" });
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Todo make proper loading
    async function getPosts() {
      try {
        const query = new Moralis.Query(Publications);
        const results = await query.find();

        setPosts(results);
        setLoaded(true);
      } catch (error) {
        console.error(error);
      }
    }
    if (!loaded) {
      getPosts();
    }
  }, [posts, setPosts, Publications, Moralis, user]);

  // Render a section to write a post followed by a list of posts
  return (
    <Box>
      <WritePost user={user} post={post}/>
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </Box>
  );
};
export default Home;
