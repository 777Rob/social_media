import { Stack, Text, Avatar, Grid } from "@mantine/core";
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai";
import { useMoralis } from "react-moralis";

// @Description: Post component used to display replies to a topic
// @param post: Post object
// @param: summary: Summary to display in the first post
export const Post = ({ post, summary }) => {
	return (
		<Grid
			sx={theme => ({
				minHeight: "200px",
				backgroundColor:
					theme.colorScheme === "dark"
						? theme.colors.dark[7]
						: theme.colors.gray[1],
				border: `1px solid ${
					theme.colorScheme === "dark"
						? theme.colors.dark[4]
						: theme.colors.gray[4]
				}`,
				borderRadius: "10px",
			})}
		>
			<Grid.Col
				span={1}
				sx={{ display: "flex", justifyContent: "center", paddingTop: "20px" }}
			>
				<Avatar radius="lg" size={50} src={post.user.avatar || ""} />
			</Grid.Col>
			<Grid.Col span={9}>
				<Stack sx={{ paddingBottom: "20px", paddingTop: "20px" }}>
					<Text sx={{ fontSize: "20px" }}>{post.user.userName}</Text>
					<Text sx={{ fontSize: "18px" }}>{post.text}</Text>
					{summary && summary}
				</Stack>
			</Grid.Col>
			<Grid.Col span={2}>
				<Stack spacing={20}>
					<Text>{post.date}</Text>
					<Text
						sx={{ display: "flex", alignItems: "center", fontSize: "28px" }}
					>
						{post.views && (
							<Text
								sx={{
									display: "flex",
									alignItems: "center",
									fontSize: "24px",
								}}
							>
								{post.views}
								<AiOutlineEye />
							</Text>
						)}
						{post.likes}
						<AiOutlineHeart />
					</Text>
				</Stack>
			</Grid.Col>
		</Grid>
	);
};
