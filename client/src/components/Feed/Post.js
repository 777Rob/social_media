import { Card, Text, Grid, Divider } from "@mantine/core";
import Avatar from "components/Common/Avatar";
import "../../styling/post-styling.css";

export default function Post({ post }) {
  return (
    <Card className="post">
      {/* Post structure */}
      <Grid>
        {/* First row is of size 12 (the maximum is 12) and consists of the user's avatar and username */}
        <Grid.Col className="post--first--row">
            <Avatar userId={post.attributes.User} />
            <Text size="md" className="post--author">
              Anonymous
            </Text>
            {/* Date when the post was created */}
            <Text size="sm" color="Gray">
              {post.attributes.createdAt.toLocaleString("en-GB", {
                dateStyle: "medium",
                timeStyle: "medium",
                hour12: false,
              })}
            </Text>
        </Grid.Col>

        {/* Second row contains post text */}
        <Grid.Col span={12} className="post--content">
          <Text size="md">
            {post.attributes.Text}
          </Text>
        </Grid.Col>

        {/* Divider */}
        <Grid.Col span={12}>
          <Divider className="divider"/>
        </Grid.Col>

      </Grid>
    </Card>
  );
}
