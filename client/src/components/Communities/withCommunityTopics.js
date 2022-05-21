import React, { useState, useEffect } from "react";
import {MockTopics} from "data/MockTopics";

export const withCommunityTopics = (Component, address) => {
  // HOC That takes in  a compontent and address of an community nft collection and returns component with loaded topics

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
