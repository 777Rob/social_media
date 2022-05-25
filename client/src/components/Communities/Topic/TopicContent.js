import { Summary } from "./Summary";
import { Post } from "./Post";

export const TopicContent = ({ topic = [] }) => {
    if (topic.length > 0) {
        return (
            <>
                <Post summary={<Summary topic={topic} />} post={topic[0]} />

                {topic.slice(1).map((post) => (
                    <>
                        <Post post={post} />
                    </>
                ))}
            </>
        );
    }
};
