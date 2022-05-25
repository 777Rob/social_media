import { Text, Box, Divider, Table, Tabs } from "@mantine/core";
import DisplayTopics from "./DisplayTopics";
import CategoriesPage from "./CategoriesPage";
import { withCommunityTopics } from "components/Loader/withCommunityTopics";
import CommunitiesFeed from "./CommunitiesFeed";

const CommunityLanding = () => {
  const LatestTopicsPageLoaded = withCommunityTopics(DisplayTopics, {query: "GET_LATEST_TOPICS"});

  return (
    <Text>
      <Tabs grow position="center" variant="outline">
        <Tabs.Tab label="Latest">
          <LatestTopicsPageLoaded />
        </Tabs.Tab>
        <Tabs.Tab label="Categories">
          <CategoriesPage />
        </Tabs.Tab>
        <Tabs.Tab label="Feed">
          <CommunitiesFeed />
        </Tabs.Tab>
      </Tabs>
    </Text>
  );
};

export default CommunityLanding;
