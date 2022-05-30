import { Text, Box, Divider, Table, Tabs } from "@mantine/core";
import DisplayTopics from "../DisplayTopics";
import Categories from "../Categories";
import { withCommunityTopics } from "components/Communities/Topic/withCommunityTopics";
import CommunitiesFeed from "../CommunitiesFeed";

const CommunityLanding = () => {
	// Pass the display topics component to the withCommunityTopics HOC with GET_LATEST_TOPICS as the query

	return (
		<Text>
			<Tabs grow position="center" variant="outline">
				<Tabs.Tab label="Latest">
					<DisplayTopics />
				</Tabs.Tab>
				<Tabs.Tab label="Categories">
					<Categories />
				</Tabs.Tab>
				<Tabs.Tab label="Feed">
					<CommunitiesFeed />
				</Tabs.Tab>
			</Tabs>
		</Text>
	);
};

export default CommunityLanding;
