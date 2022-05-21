import { Text, Box, Divider, Table, Tabs } from "@mantine/core";
import LatestTopicsPage from "./LatestPage";
import CategoriesPage from "./CategoriesPage";
import { withCommunityTopics } from "./withCommunityTopics";

const CommunityLanding = () => {
  const LatestTopicsPageLoaded = withCommunityTopics(LatestTopicsPage, "xd");

  return (
    <Text>
      <Tabs grow position="center" variant="outline">
        <Tabs.Tab label="Latest">
          <LatestTopicsPageLoaded />
        </Tabs.Tab>
        <Tabs.Tab label="Categories">
          <CategoriesPage />
        </Tabs.Tab>
      </Tabs>
    </Text>
  );
};

export default CommunityLanding;
