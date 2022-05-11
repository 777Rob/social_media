import { Container } from "@mantine/core";
import { Image, Box, Button, Space } from "@mantine/core";
import { TextArea } from "web3uikit";
import { defaultImages } from "data/defaultProfileImages";
import { useMoralis } from "react-moralis";
import { useState } from "react";

export default function WritePost() {
  const { Moralis, user, account } = useMoralis();

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
    <Container>
      <Box sx={{ display: "flex" }}>
        <Image
          alt={account}
          src={
            user.attributes.ProfilePicture
              ? user.attributes.ProfilePicture
              : defaultImages[0]
          }
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
        <Space w="md" />
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
        radius="md"
        onClick={() => {
          handlePost();
        }}
      >
        Post
      </Button>
    </Container>
  );
}
