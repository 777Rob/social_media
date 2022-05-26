import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";

export const withPosts = (Component, params = {}) => {
	// HOC That takes in a compontent and params, fetches the posts and returns component with fetched postst
	return props => {
		// Web3 Api function
		const { Moralis } = useMoralis();
		const Publications = Moralis.Object.extend("Publications");

		// Track state of posts
		const [posts, setPosts] = useState([]);

		//When component mounts perform:
		useEffect(() => {
			// Function to fetch posts
			(async () => {
				// Setting up query
				const query = new Moralis.Query(Publications);

				// Querying and getting the results
				const results = await query.find();

				// Setting posts to received results
				setPosts(results);
			})();
		});
		// Return a component
		return <Component {...props} posts={posts} />;
	};
};
