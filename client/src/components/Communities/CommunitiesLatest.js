import { withCommunityTopics } from "components/Loader/withCommunityTopics";
import DisplayTopics from "components/Communities/DisplayTopics";
import { useParams } from "react-router-dom";

const CommunitiesLatest = () => {
  const { address } = useParams();
  const CommunitiesLatestLoaded = withCommunityTopics(DisplayTopics, {
    query: "GET_LATEST_TOPICS",
    community: address,
  });
  return <CommunitiesLatestLoaded />;
};
export default CommunitiesLatest;
