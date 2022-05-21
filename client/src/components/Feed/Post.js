import { Box,Card, Text, Image, useMantineTheme, Grid, Container } from "@mantine/core";
import { defaultImages } from "data/defaultProfileImages";
import Avatar from "components/Common/Avatar";

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
        margin: "20px",
        marginRight: "40px",
        marginLeft: "40px"
      }}
    >
      {/* Post structure */}
      <Grid>

        {/* First row is of size 12 (the maximum is 12) and consists of the user's avatar and username */}
        <Grid.Col span={12} sx={{display: "flex", alignItems: "center"}}>

            <Avatar userId={post.attributes.User} />
            <Text size="md" weight={500} style={{ marginLeft: "5px" }}>
              User id: {post.attributes.userId}
            </Text>

        </Grid.Col>

        {/* Second row contains post text */}
        <Grid.Col span={12}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            flexDirection: "column",
            gap: "15px",
            width: "85%",
          }}
        >
          <Text size="md">
            {post.attributes.Text}
          </Text>
        </Box>
        </Grid.Col>

        {/* Third row contains post date */}
        <Grid.Col span={12}>
          <Text size="sm" color="Gray">
            {post.attributes.createdAt.toLocaleString("en-GB", {
              dateStyle: "medium",
              timeStyle: "medium",
              hour12: false,
            })}
          </Text>
        </Grid.Col>
      </Grid>
    </Card>
  );
}
