import { MockCategories } from "data/MockCategories";
import React, { useEffect, useState } from "react";

export const withCommunityCategories = (Component, params) => {
	// HOC That takes in  a compontent and address of an community nft collection and returns component with loaded Categories
	// @TODO: Use params and perform actual query to database
	return props => {
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
