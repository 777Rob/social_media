import { MockTopics } from "data/MockTopics";
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

export const withCommunityTopics = (Component, params) => {
  // HOC That takes in  a compontent and address of an community nft collection and returns component with loaded topics
// Take in params and perform actual query to database
  return (props) => {
    const { Moralis } = useMoralis();
    const Topics = Moralis.Object.extend("Topics");

    const [topics, setTopics] = useState([]);
    
    // When component mounts perform:
    useEffect(() => {
      // Function to fetch topics
      (async () => {
        // Setting up query
        const query = new Moralis.Query(Topics);

        // Querying and getting the results
        const results = await query.equal_to("community", "mock");

        setTopics(MockTopics);
        // = results, bet ne nes:
        // kokius "users" irasyt? reiks updatint "Topics" lentele kas kart kai papostina kazkas?
        // ar apsimoka avatarus saugot? nes jeigu pasikeistu kazkas avatara
        // reply count kas kart updatint ar geriau fetchint count is "Posts" pagal id?
      })();
    });
    // Return a component
    return <Component {...props} topics={topics} />;
  };
};
