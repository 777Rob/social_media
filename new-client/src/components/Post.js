import { Box, Text, Image } from "@mantine/core";
import { defaultImages } from "data/defaultProfileImages";

export default function Post({ post }) {
  return (
    <Box
      className="post"
      sx={{
        borderRadius: "10px",
        backgroundColor: "#eee",
        maxWidth: "100%",
        borderBottom: "1px solid #dadada",
        padding: "25px",
        justifyContent: "space-between",
        marginTop: "10px",
      }}
    >
      <Image
        width={50}
        height={50}
        radius="50%"
        src={
          post.attributes.userProfilePic
            ? post.attributes.userProfilePic
            : defaultImages[0]
        }
      />
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
  );
}
