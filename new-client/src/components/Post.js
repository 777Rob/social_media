import { Box,Card, Text, Image, useMantineTheme } from "@mantine/core";
import { defaultImages } from "data/defaultProfileImages";
import Avatar from "components/Avatar";

export default function Post({ post }) {
  const theme = useMantineTheme();

  return (
    <Card
      className="post"
      sx={{
        borderRadius: "10px",
        borderBottom: "1px solid #dadada",
        padding: "25px",
        justifyContent: "space-between",
        marginTop: "10px",
      }}
    >
      <Avatar userId={post.attributes.User} />

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
          {post.attributes.User.userName}
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
    </Card>
  );
}
