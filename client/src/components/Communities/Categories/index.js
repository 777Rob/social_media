import {
  Table,
  Stack,
  Center,
  Avatar,
  Grid,
  Text,
  Divider,
} from "@mantine/core";
import { SplitScreen } from "components/Common/SplitScreen";
import { withCommunityTopics } from "components/Communities/Topic/withCommunityTopics";
import { withCommunityCategories } from "components/Communities/Category/withCommunityCategories";
import { useNavigate } from "react-router-dom";

const LatestTopicList = ({ topics }) => {
  // @Param: List of topics
  // A component for displaying latest topics

  // Format rows
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

  // Return table with formated rows
  return (
    <>
      <Table verticalSpacing="md" fontSize="lg" striped highlightOnHover>
        {/* Head */}
        <thead>
          <tr>
            <th>Latest</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>{rows && rows} </tbody>
      </Table>
    </>
  );
};

const CategoryList = ({ categories }) => {
  // Given list categories display them

  // For navigation into category
  const navigate = useNavigate();

  //   Format table rows
  const rows = categories.map((category) => (
    <tr key={category.name}>
      {/* On click navigate into categories id */}
      <td
        onClick={() => navigate(`${category.id}`)}
        style={{
          cursor: "pointer",
          borderLeft: `3px solid ${category.color || "blue"}`,
        }}
      >
        <Text sx={{ fontSize: "24px", fontWeight: "bold" }}>
          {category.name}
        </Text>
      </td>
      <td>{category.topicCount}</td>
    </tr>
  ));

  //Return table
  return (
    <>
      <Table verticalSpacing="md" fontSize="lg" striped highlightOnHover>
        {/* Head */}
        <thead>
          <tr>
            <th>Category</th>
            <th>Topics</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>{rows && rows} </tbody>
      </Table>
    </>
  );
};

const CategoriesPage = () => {
  // Categories page of an community
  //   Load data into both sides
  const RightSideLoaded = withCommunityTopics(LatestTopicList, "xd");
  const LeftSideLoaded = withCommunityCategories(CategoryList, "xd");

  //   Return split screen component with both sides loaded
  return <SplitScreen left={LeftSideLoaded} right={RightSideLoaded} />;
};

export default CategoriesPage;
