import {
  Image,
  Box,
  Button,
  Container,
  Space,
  useMantineTheme,
  Textarea,
} from "@mantine/core";
import { defaultImages } from "data/defaultProfileImages";
import { useMoralis } from "react-moralis";
import { useState } from "react";
import Avatar from "components/Avatar";

export default function WritePost() {
  const { Moralis, user, account } = useMoralis();
  const theme = useMantineTheme();

  const [post, setPost] = useState({ text: "", image: "" });

  // Create new Publications object class
  const Publications = Moralis.Object.extend("Publications");

  const handlePost = async () => {
    const publication = new Publications()
      .set("Text", post.text)
      .set("User", user.id);
    await publication.save();
  };

  return (
    <Container sx={{display: "flex", flexDirection: "column"}}>
      {/* Text area to write some text that will be present in a post */}
      <Textarea
        style={{ width: "100%", marginTop: "10px" }}
        placeholder="What's on your mind today?"
        variant="filled"
        icon={<Avatar />}
        radius="md"
        minRows={4}
        maxRows={8}
        size="xl"
        autosize
        width="100%"
        value={post.text}
        onChange={(e) => {
          setPost({ ...post, text: e.target.value });
        }}
      />
       {/* Button to create a new post */}
      <Button
        radius="md"
        variant="gradient"
        gradient={{ from: "indigo", to: "cyan" }}
        sx={{width: "200px", marginLeft: "auto", marginRight: "0px", marginTop: "10px"}}
        onClick={() => {
          handlePost();
        }}
      >
        Post to the feed.
      </Button>
    </Container>
  );
}
