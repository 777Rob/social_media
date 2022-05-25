import { Box } from "@mantine/core";
import { withCommunityTopics } from "components/Communities/Topic/withCommunityTopics";
import { useParams } from "react-router-dom";
import DisplayTopics from "components/Communities/Topic/DisplayTopics";

const CommunityCategory = () => {
    const { address, category } = useParams();
    console.log(address, category)
    const LoadedCommunityCategory = withCommunityTopics(DisplayTopics, { query: "GET_CATEGORY_TOPICS", category: category, community: address })
    return <Box>
        <LoadedCommunityCategory />
    </Box>
}

export default CommunityCategory;