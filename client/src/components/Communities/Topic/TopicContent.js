import { Summary } from "./Summary";
import { Post } from "./Post";

// @Description : Topic replies and first post with summary
// @param topic: Topic object
const TopicContent = ({ topic = [] }) => {
	if (topic.length > 0) {
		return (
			<>
				<Post summary={<Summary topic={topic} />} post={topic[0]} />

				{topic.slice(1).map(post => (
					<>
						<Post post={post} />
					</>
				))}
			</>
		);
	}
};

export default TopicContent;
;