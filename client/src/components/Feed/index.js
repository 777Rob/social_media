import Post from "components/Feed/Post";

const Feed = ({ posts = [] }) => {
    return (
        <>
            {posts.map((post) => (
                <Post post={post} />
            ))}
        </>
    );
};

export default Feed;