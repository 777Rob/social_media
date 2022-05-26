import { withCommunityTopics } from "components/Communities/Topic/withCommunityTopics";
import DisplayTopics from "components/Communities/Topic/DisplayTopics";
import { useParams } from "react-router-dom";

const Latest = () => {
	// Get the community from the URL
	const { address } = useParams();

	// Pass DisplayTopics component to the withCommunityTopics HOC with GET_LATEST_TOPICS as the query and the community address
	const CommunitiesLatestLoaded = withCommunityTopics(DisplayTopics, {
		query: "GET_LATEST_TOPICS",
		community: address,
	});

	// Render the loaded component
	return <CommunitiesLatestLoaded />;
};

export default Latest;
