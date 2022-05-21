import {
  Table,
  Stack,
  Center,
  Avatar,
  Grid,
  Text,
  Divider,
} from "@mantine/core";
import { SplitScreen } from "components/SplitScreen";
import { withCommunityTopics } from "./withCommunityTopics";
import { withCommunityCategories } from "./withCommunityCategories";

const LatestTopicList = ({ topics }) => {
  console.log(`topics`, topics);
  const rows = topics.map((topic) => (
    <tr key={topic.topic}>
      <td>
        <Avatar size={40} radius="lg" src={topic.users[0].avatar} />
      </td>
      <td>{topic.topic}</td>
      <td>
        <Stack align="center" spacing="xs">
          <Text size="xs">{topic.replyCount}</Text>
          <Text size="xs">{topic.lastActivity}</Text>
        </Stack>
      </td>
    </tr>
  ));

  return (
    <>
      <Table verticalSpacing="md" fontSize="lg" striped highlightOnHover>
      <thead>
          <tr>
            <th>Latest</th>
          </tr>
        </thead>
        <tbody>{rows && rows} </tbody>
      </Table>
    </>
  );
};

const CategoryList = ({ categories }) => {
  const rows = categories.map((category) => (
    <tr key={category.name}>
      <td style={{ borderLeft: `3px solid ${category.color || "blue"}` }}>
        <Text sx={{ fontSize: "24px", fontWeight: "bold" }}>
          {category.name}
        </Text>
      </td>
      <td>{category.topicCount}</td>
    </tr>
  ));

  return (
    <>
      <Table verticalSpacing="md" fontSize="lg" striped highlightOnHover>
        <thead>
          <tr>
            <th>Category</th>
            <th>Topics</th>
          </tr>
        </thead>
        <tbody>{rows && rows} </tbody>
      </Table>
    </>
  );
};

const CategoriesPage = ({ categories }) => {
  const RightSideLoaded = withCommunityTopics(LatestTopicList, "xd");
  const LeftSideLoaded = withCommunityCategories(CategoryList, "xd");
  return (
    <SplitScreen left={LeftSideLoaded} right={RightSideLoaded} />
  );
};

export default CategoriesPage;
