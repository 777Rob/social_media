import { MockTopics } from "data/MockTopics";
import React, { useEffect, useState } from "react";

export const withCommunityTopics = (Component, params) => {
  // HOC That takes in  a compontent and address of an community nft collection and returns component with loaded topics
// Take in params and perform actual query to database
  return (props) => {
    const [topics, setTopics] = useState([]);

    // When component mounts perform:
    useEffect(() => {
      // Function to fetch topics
      (async () => {
        // TODO Get topics from database
        setTopics(MockTopics);
      })();
    });
    // Return a component
    return <Component {...props} topics={topics} />;
  };
};
