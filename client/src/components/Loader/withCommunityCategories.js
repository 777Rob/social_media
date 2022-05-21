import React, { useState, useEffect } from "react";
import { MockCategories } from "data/MockCategories";

export const withCommunityCategories = (Component, address) => {
  // HOC That takes in  a compontent and address of an community nft collection and returns component with loaded Categories

  return (props) => {
    const [categories, setCategories] = useState([]);

    // When component mounts perform:
    useEffect(() => {
      // Function to fetch categories
      (async () => {
        // TODO Get topics from database
        setCategories(MockCategories);
      })();
    });
    // Return a component
    return <Component {...props} categories={categories} />;
  };
};
