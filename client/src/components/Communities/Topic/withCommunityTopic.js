import { MockTopicPostsFull } from "data/MockTopics";
import React, { useEffect, useState } from "react";

// @Description: Function which returns the component with loaded topic details passed in as a prop
// @param: Component: Component to be rendered with topic data

export const withCommunityTopic = (Component, params) => {
	// HOC That takes in  a compontent and address of an community and returns component with loaded topic
	// Take in params and perform actual query to database
	return props => {
		const [topic, setTopic] = useState([]);

		// When component mounts perform:
		useEffect(() => {
			// Function to fetch topics
			(async () => {
				// TODO Get topics from database
				setTopic(MockTopicPostsFull);
			})();
		});
		// Return a component
		return <Component {...props} topic={topic} />;
	};
};
