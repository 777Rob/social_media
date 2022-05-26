// eslint-disable-next-line no-unused-vars
import { Text, Grid, ActionIcon, Group, Divider, Menu } from "@mantine/core";
import Avatar from "components/Common/Avatar";
import "../../styling/post-styling.css";
import { MessageCircle, Share, Star, Dots, Report } from "tabler-icons-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostButton from "./PostButton";
import { timeSince } from "helpers/time-calculator";

const Post = ({ post }) => {
	const navigate = useNavigate();

	// The default state is retrieved from the database which denotes whether the post is liked by the user or not
	// For now it is false
	const [isLiked, setLiked] = useState(false);
	const likes = 400;
	const shares = 0;
	const comments = 17;

	function toggle() {
		setLiked(prevState => !prevState);
	}

	return (
		<Grid className="post">
			{/* First row is of size 12 (the maximum is 12) and consists of the user's avatar and username */}
			<Grid.Col className="post--first--row">
				{/* <Avatar userId={post.profile.original.url} /> */}
				<Text size="md" className="post--author">
					Anonymous
				</Text>
				{/* Date when the post was created */}
				<Text size="sm" color="Gray">
					{timeSince(post.createdAt)} ago
				</Text>
			</Grid.Col>

			{/* Second row contains post text */}
			<Grid.Col span={12} className="post--content">
				<Text size="md">{post.metadata?.name || ""}</Text>
				<Text size="md">{post.metadata?.content || ""}</Text>
			</Grid.Col>

			{/* Footer with various buttons */}
			<Grid.Col span={12} className="post--footer">
				{/* Buttons for commenting, sharing and liking */}
				<Group spacing="sm">
					<PostButton
						color={"blue"}
						amount={comments}
						icon={<MessageCircle size={16} />}
					/>
					<PostButton
						color={"green"}
						amount={shares}
						icon={<Share size={16} />}
					/>
					<PostButton
						color={"yellow"}
						amount={likes}
						icon={
							<Star
								size={16}
								fill={isLiked ? "#FAB006" : "none"}
								onClick={toggle}
							/>
						}
					/>
				</Group>

				{/* Menu denoted by three dots */}
				<Menu
					className="post--footer--menu"
					control={
						<ActionIcon variant="light" color={"gray"} radius={10}>
							<Dots size={16} />
						</ActionIcon>
					}
				>
					<Menu.Item radius={10} color="red" icon={<Report size={14} />}>
						Report
					</Menu.Item>
				</Menu>
			</Grid.Col>
		</Grid>
	);
};

export default Post;
